import { NextPage } from 'next'
import React, { useEffect } from 'react'
import CreateResource from 'components/templates/CreateResource'
import { Container } from 'react-bootstrap'
import AdminNavbarTemplate from 'components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../../components/organisms/RegularFooter'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'
import { ResourceParam } from 'interfaces/ResourceParam'
import { nameChanged, quantityChanged, receptionTimeSettingChanged } from 'redux/resourceSlice'
import {  monStartChanged,
          monEndChanged,
          tueStartChanged,
          tueEndChanged,
          wedStartChanged,
          wedEndChanged,
          thuStartChanged,
          thuEndChanged,
          friStartChanged,
          friEndChanged,
          satStartChanged,
          satEndChanged,
          sunStartChanged,
          sunEndChanged,
          holidayStartChanged,
          holidayEndChanged,
          monBreakStartChanged,
          monBreakEndChanged,
          tueBreakStartChanged,
          tueBreakEndChanged,
          wedBreakStartChanged,
          wedBreakEndChanged,
          thuBreakStartChanged,
          thuBreakEndChanged,
          friBreakStartChanged,
          friBreakEndChanged,
          satBreakStartChanged,
          satBreakEndChanged,
          sunBreakStartChanged,
          sunBreakEndChanged,
          holidayBreakStartChanged,
          holidayBreakEndChanged,  } from 'redux/businessHourSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_session'])
  const router = useRouter()

  const name = useSelector((state: RootState) => state.resource.name)
  const quantity = useSelector((state: RootState) => state.resource.quantity)
  const receptionTimeSetting = useSelector((state: RootState) => state.resource.receptionTimeSetting)
  const monStart = useSelector((state: RootState) => state.businessHour.monStart)
  const monEnd = useSelector((state: RootState) => state.businessHour.monEnd)
  const tueStart = useSelector((state: RootState) => state.businessHour.tueStart)
  const tueEnd = useSelector((state: RootState) => state.businessHour.tueEnd)
  const wedStart = useSelector((state: RootState) => state.businessHour.wedStart)
  const wedEnd = useSelector((state: RootState) => state.businessHour.wedEnd)
  const thuStart = useSelector((state: RootState) => state.businessHour.thuStart)
  const thuEnd = useSelector((state: RootState) => state.businessHour.thuEnd)
  const friStart = useSelector((state: RootState) => state.businessHour.friStart)
  const friEnd = useSelector((state: RootState) => state.businessHour.friEnd)
  const satStart = useSelector((state: RootState) => state.businessHour.satStart)
  const satEnd = useSelector((state: RootState) => state.businessHour.satEnd)
  const sunStart = useSelector((state: RootState) => state.businessHour.sunStart)
  const sunEnd = useSelector((state: RootState) => state.businessHour.sunEnd)
  const holidayStart = useSelector((state: RootState) => state.businessHour.holidayStart)
  const holidayEnd = useSelector((state: RootState) => state.businessHour.holidayEnd)
  const monBreakStart = useSelector((state: RootState) => state.businessHour.monBreakStart)
  const monBreakEnd = useSelector((state: RootState) => state.businessHour.monBreakEnd)
  const tueBreakStart = useSelector((state: RootState) => state.businessHour.tueBreakStart)
  const tueBreakEnd = useSelector((state: RootState) => state.businessHour.tueBreakEnd)
  const wedBreakStart = useSelector((state: RootState) => state.businessHour.wedBreakStart)
  const wedBreakEnd = useSelector((state: RootState) => state.businessHour.wedBreakEnd)
  const thuBreakStart = useSelector((state: RootState) => state.businessHour.thuBreakStart)
  const thuBreakEnd = useSelector((state: RootState) => state.businessHour.thuBreakEnd)
  const friBreakStart = useSelector((state: RootState) => state.businessHour.friBreakStart)
  const friBreakEnd = useSelector((state: RootState) => state.businessHour.friBreakEnd)
  const satBreakStart = useSelector((state: RootState) => state.businessHour.satBreakStart)
  const satBreakEnd = useSelector((state: RootState) => state.businessHour.satBreakEnd)
  const sunBreakStart = useSelector((state: RootState) => state.businessHour.sunBreakStart)
  const sunBreakEnd = useSelector((state: RootState) => state.businessHour.sunBreakEnd)
  const holidayBreakStart = useSelector((state: RootState) => state.businessHour.holidayBreakStart)
  const holidayBreakEnd = useSelector((state: RootState) => state.businessHour.holidayBreakEnd)

  useEffect(() => {
    const fetchMonthlyPaymentPlan = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/resources/${router.query.id}/edit`, {
          headers: { 
            'Session-Id': cookies._gybuilder_session
          },
        }
      )
      .then(function (response) {
        const resourceResponse: ResourceParam = response.data.resource
        dispatch(nameChanged(resourceResponse.name))
        dispatch(quantityChanged(resourceResponse.quentity))
        dispatch(receptionTimeSettingChanged(resourceResponse.reception_time_setting))
        dispatch(monStartChanged(resourceResponse.mon_start || ''))
        dispatch(monEndChanged(resourceResponse.mon_end || ''))
        dispatch(tueStartChanged(resourceResponse.tue_start || ''))
        dispatch(tueEndChanged(resourceResponse.tue_end || ''))
        dispatch(wedStartChanged(resourceResponse.wed_start || ''))
        dispatch(wedEndChanged(resourceResponse.wed_end || ''))
        dispatch(thuStartChanged(resourceResponse.thu_start || ''))
        dispatch(thuEndChanged(resourceResponse.thu_end || ''))
        dispatch(friStartChanged(resourceResponse.fri_start || ''))
        dispatch(friEndChanged(resourceResponse.fri_end || ''))
        dispatch(satStartChanged(resourceResponse.sat_start || ''))
        dispatch(satEndChanged(resourceResponse.sat_end || ''))
        dispatch(sunStartChanged(resourceResponse.sun_start || ''))
        dispatch(sunEndChanged(resourceResponse.sun_end || ''))
        dispatch(holidayStartChanged(resourceResponse.holiday_start || ''))
        dispatch(holidayEndChanged(resourceResponse.holiday_end || ''))
        dispatch(monBreakStartChanged(resourceResponse.mon_break_start || ''))
        dispatch(monBreakEndChanged(resourceResponse.mon_break_end || ''))
        dispatch(tueBreakStartChanged(resourceResponse.tue_break_start || ''))
        dispatch(tueBreakEndChanged(resourceResponse.tue_break_end || ''))
        dispatch(wedBreakStartChanged(resourceResponse.wed_break_start || ''))
        dispatch(wedBreakEndChanged(resourceResponse.wed_break_end || ''))
        dispatch(thuBreakStartChanged(resourceResponse.thu_break_start || ''))
        dispatch(thuBreakEndChanged(resourceResponse.thu_break_end || ''))
        dispatch(friBreakStartChanged(resourceResponse.fri_break_start || ''))
        dispatch(friBreakEndChanged(resourceResponse.fri_break_end || ''))
        dispatch(satBreakStartChanged(resourceResponse.sat_break_start || ''))
        dispatch(satBreakEndChanged(resourceResponse.sat_break_end || ''))
        dispatch(sunBreakStartChanged(resourceResponse.sun_break_start || ''))
        dispatch(sunBreakEndChanged(resourceResponse.sun_break_end || ''))
        dispatch(holidayBreakStartChanged(resourceResponse.holiday_break_start || ''))
        dispatch(holidayBreakEndChanged(resourceResponse.holiday_break_end || ''))

      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchMonthlyPaymentPlan()
  }, [router.query.id, cookies._gybuilder_session, dispatch])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/monthly_payment_plans/${router.query.id}/update`,
    {
      monthly_payment_plans: {
        name: name,
      }
    },
    {
      headers: {
        'Session-Id': cookies._gybuilder_session
      }
    }).then(response => {
      router.push('/admin/monthly_payment')
      dispatch(alertChanged({message: '月額課金プランを更新しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <AdminNavbarTemplate></AdminNavbarTemplate>
      <Container>
        <CreateResource></CreateResource>
      </Container>
      <div className='text-center'>
        <Button onClick={onSubmit} className='mt10'>更新する</Button>
      </div>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Edit
