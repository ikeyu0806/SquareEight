import { NextPage } from 'next'
import React, { useEffect } from 'react'
import CreateMonthlyPayment from 'components/templates/CreateMonthlyPayment'
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
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'
import { priceChanged,
         nameChanged,
         reserveIsUnlimitedChanged,
         reserveIntervalNumberChanged,
         reserveIntervalUnitChanged,
         enableReserveCountChanged,
         descriptionChanged } from 'redux/monthlyPaymentPlanSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()

  const name = useSelector((state: RootState) => state.monthlyPaymentPlan.name)
  const price = useSelector((state: RootState) => state.monthlyPaymentPlan.price)
  const reserveIsUnlimited = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIsUnlimited)
  const reserveIntervalNumber = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIntervalNumber)
  const reserveIntervalUnit = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIntervalUnit)
  const enableReserveCount = useSelector((state: RootState) => state.monthlyPaymentPlan.enableReserveCount)
  const description = useSelector((state: RootState) => state.monthlyPaymentPlan.description)

  useEffect(() => {
    const fetchMonthlyPaymentPlan = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/monthly_payment_plans/${router.query.id}/edit`, {
          headers: { 
            'Session-Id': cookies._gybuilder_merchant_session
          },
        }
      )
      .then(function (response) {
        const monthlyPaymentPlanResponse: MonthlyPaymentPlanParam = response.data.monthly_payment_plan
        dispatch(nameChanged(monthlyPaymentPlanResponse.name))
        dispatch(priceChanged(monthlyPaymentPlanResponse.price))
        dispatch(reserveIsUnlimitedChanged(monthlyPaymentPlanResponse.reserve_is_unlimited))
        dispatch(reserveIntervalNumberChanged(monthlyPaymentPlanResponse.reserve_interval_number))
        dispatch(reserveIntervalUnitChanged(monthlyPaymentPlanResponse.reserve_interval_unit))
        dispatch(enableReserveCountChanged(monthlyPaymentPlanResponse.enable_reserve_count))
        dispatch(descriptionChanged(monthlyPaymentPlanResponse.description))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchMonthlyPaymentPlan()
  }, [router.query.id, cookies._gybuilder_merchant_session, dispatch])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/monthly_payment_plans/${router.query.id}/update`,
    {
      monthly_payment_plans: {
        name: name,
        price: price,
        reserve_is_unlimited: reserveIsUnlimited,
        reserve_interval_number: reserveIntervalNumber,
        reserve_interval_unit: reserveIntervalUnit,
        enable_reserve_count: enableReserveCount,
        description: description
      }
    },
    {
      headers: {
        'Session-Id': cookies._gybuilder_merchant_session
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
        <CreateMonthlyPayment></CreateMonthlyPayment>
      </Container>
      <div className='text-center'>
        <Button onClick={onSubmit} className='mt10'>更新する</Button>
      </div>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Edit
