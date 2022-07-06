import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import EndUserReserveCalendarTemplate from '../../../components/templates/EndUserReserveCalendarTemplate'
import IntroductionNavbar from '../../../components/templates/IntroductionNavbar'
import RegularFooter from '../../../components/organisms/RegularFooter'
import axios from 'axios'
import { reserveEventsChanged } from 'redux/reserveFrameSlice'
import { useDispatch } from 'react-redux'

const Calendar: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchEvents = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames/reserve_events?account_id=${router.query.account_id}`
      )
      .then(function (response) {
        dispatch(reserveEventsChanged(response.data.events))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchEvents()
  }, [router.query.account_id, dispatch])
  return (
    <>
      <IntroductionNavbar />
      <EndUserReserveCalendarTemplate/>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Calendar
