import { NextPage } from 'next'
import React, { useEffect } from 'react'
import PurchaseMonthlyPayment from 'components/templates/PurchaseMonthlyPayment'
import { Container } from 'react-bootstrap'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'
import { priceChanged,
         nameChanged,
         reserveIsUnlimitedChanged,
         reserveIntervalNumberChanged,
         reserveIntervalUnitChanged,
         enableReserveCountChanged,
         descriptionChanged,
         s3ObjectPublicUrlChanged } from 'redux/monthlyPaymentPlanSlice'

const Purchase: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()

  useEffect(() => {
    const fetchMonthlyPaymentPlan = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/monthly_payment_plans/${router.query.id}`, {
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
        dispatch(s3ObjectPublicUrlChanged(monthlyPaymentPlanResponse.s3_object_public_url))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchMonthlyPaymentPlan()
  }, [router.query.id, cookies._gybuilder_merchant_session, dispatch])

  return (
    <>
      <MerchantCustomLayout>
        <Container>
          <PurchaseMonthlyPayment></PurchaseMonthlyPayment>
        </Container>
      </MerchantCustomLayout>
    </>
  )
}

export default Purchase
