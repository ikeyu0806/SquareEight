import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Row, Col } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import ReserveFrameForm from 'components/molecules/ReserveFrameForm'
import {
  startDateChanged,
  titleChanged,
  descriptionChanged,
  capacityChanged,
  localPaymentPriceChanged,
  creditCardPaymentPriceChanged,
  publishStatusChanged,
  receptionTypeChanged,
  receptionStartDayBeforeChanged,
  cancelReceptionChanged,
  cancelReceptionHourBeforeChanged,
  cancelReceptionDayBeforeChanged,
  isLocalPaymentEnableChanged,
  isCreditCardPaymentEnableChanged,
  isTicketPaymentEnableChanged,
  isMonthlyPlanPaymentEnableChanged,
  reserveFrameReceptionTimesChanged,
  resourceIdsChanged,
  monthlyPaymentPlanIdsChanged,
  reservableFrameTicketMasterChanged,
  base64ImageChanged } from 'redux/reserveFrameSlice'

const Edit = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()

  useEffect(() => {
    const fetchReserveFrame = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames/${router.query.id}`, {
          headers: { 
            'Session-Id': cookies._gybuilder_merchant_session
          },
        }
      )
      .then(function (response) {
        dispatch((startDateChanged(response.data.start_date_input_value)))
        dispatch((titleChanged(response.data.reserve_frame.title)))
        dispatch((descriptionChanged(response.data.reserve_frame.description)))
        dispatch((capacityChanged(response.data.reserve_frame.capacity)))
        dispatch((localPaymentPriceChanged(response.data.reserve_frame.local_payment_price)))
        dispatch((creditCardPaymentPriceChanged(response.data.reserve_frame.credit_card_payment_price)))
        dispatch((publishStatusChanged(response.data.reserve_frame.publish_status)))
        dispatch((receptionTypeChanged(response.data.reserve_frame.reception_type)))
        dispatch((receptionStartDayBeforeChanged(response.data.reserve_frame.reception_start_day_before)))
        dispatch((cancelReceptionChanged(response.data.reserve_frame.cancel_reception)))
        dispatch((cancelReceptionHourBeforeChanged(response.data.reserve_frame.cancel_reseption_hour_before)))
        dispatch((cancelReceptionDayBeforeChanged(response.data.reserve_frame.cancel_reseption_day_before)))
        dispatch((isLocalPaymentEnableChanged(response.data.reserve_frame.is_local_payment_enable)))
        dispatch((isCreditCardPaymentEnableChanged(response.data.reserve_frame.is_credit_card_payment_enable)))
        dispatch((isTicketPaymentEnableChanged(response.data.reserve_frame.is_ticket_payment_enable)))
        dispatch((isMonthlyPlanPaymentEnableChanged(response.data.reserve_frame.is_monthly_plan_payment_enable)))
        dispatch((reserveFrameReceptionTimesChanged(response.data.reserve_frame.reserve_frame_reception_times_values)))
        dispatch((resourceIdsChanged(response.data.reserve_frame.resouce_ids)))
        dispatch((monthlyPaymentPlanIdsChanged(response.data.reserve_frame.monthly_payment_plan_ids)))
        dispatch((reservableFrameTicketMasterChanged(response.data.reserve_frame.reservable_frame_ticket_master)))
        dispatch((base64ImageChanged(response.data.reserve_frame.s3_object_public_url)))
      })
      .catch(error => {
        console.log(error)
      })  
    }
    fetchReserveFrame()
  }, [router.query.id, cookies._gybuilder_merchant_session, dispatch])

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <ReserveFrameForm />
            </Col>
          </Row>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Edit
