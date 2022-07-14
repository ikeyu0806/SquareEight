import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import EndUserReserveCalendarTemplate from 'components/templates/EndUserReserveCalendarTemplate'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { reserveEventsChanged } from 'redux/reserveFrameSlice'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'

const CalendarPreview: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchEvents = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/accounts/reserve_events`, {
          headers: { 
            'Session-Id': cookies._gybuilder_merchant_session
          },
        }
      )
      .then(function (response) {
        dispatch(reserveEventsChanged(response.data.events))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchEvents()
  }, [router.query.account_id, dispatch, cookies])
  return (
    <>
      <MerchantUserAdminLayout>
        <EndUserReserveCalendarTemplate/>
      </MerchantUserAdminLayout>
    </>
  )
}

export default CalendarPreview
