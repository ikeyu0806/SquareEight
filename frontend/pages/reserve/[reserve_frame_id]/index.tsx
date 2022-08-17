import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import CommonNavbar from 'components/organisms/CommonNavbar'
import axios from 'axios'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'
import { ReserveFramePaymentMethodParam } from 'interfaces/ReserveFramePaymentMethodParam'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [reserveFrame, setReserveFrame] = useState<ReserveFrameParam>()
  const [reserveFramePaymentMethod, setReserveFramePaymentMethod] = useState<ReserveFramePaymentMethodParam>({local_payment_price: 0, enable_monthly_payment_plans: [], enable_tickets: []})

  useEffect(() => {
    const fetchReserveFrame = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames/${router.query.reserve_frame_id}`
      )
      .then(function (response) {
        console.log(response.data.reserve_frame)
        const reserveFrameResponse: ReserveFrameParam = response.data.reserve_frame
        setReserveFrame(reserveFrameResponse)
        setShowModal(true)
        setReserveFramePaymentMethod(response.data.reserve_frame.payment_methods)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchReserveFrame()
  }, [router.query.reserve_frame_id])

  return (
    <>
      <Container>
        <CommonNavbar></CommonNavbar>
        <Row className='mt20'>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <Card>
              <Card.Body>
                <h3>{reserveFrame?.title}</h3>
                <div>{reserveFrame?.description}</div>
                {reserveFrame?.s3_object_public_url
                && <img
                    className='d-block w-100 mt30 mb30'
                    src={reserveFrame?.s3_object_public_url}
                    alt='image' />}
                <hr />
                <div>予約時間を選択してください</div>
                <Form.Select>
                  {reserveFrame?.reserve_frame_reception_times_values?.map((time, i) => {
                    return (
                      <option key={i}>{time.reception_start_time}-{time.reception_end_time}</option>
                    )
                  })}
                </Form.Select>
                <hr />
                <div>お支払い方法を選択してください</div>
                {reserveFramePaymentMethod.local_payment_price !== undefined
                  && <Form.Check
                      type='radio'
                      id='local_payment_check'
                      label={`現地払い: ${reserveFramePaymentMethod.local_payment_price}円`}></Form.Check>}
                {reserveFramePaymentMethod.credit_card_payment_price !== undefined
                && <Form.Check
                    type='radio'
                    id='credit_card_payment_check'
                    label={`クレジットカード払い: ${reserveFramePaymentMethod.credit_card_payment_price}円`}></Form.Check>}
                {reserveFramePaymentMethod.enable_monthly_payment_plans
                  && reserveFramePaymentMethod.enable_monthly_payment_plans.map((plan, i) => {
                  return (
                    <>
                      <Form.Check
                        type='radio'
                        id={`monthly_plan_payment_${i}`}
                        label={`月額課金: ${plan.monthly_payment_plan_name}`}></Form.Check>
                    </>
                  )
                })}
                {reserveFramePaymentMethod.enable_tickets
                  && reserveFramePaymentMethod.enable_tickets.map((ticket, i) => {
                  return (
                    <>
                      <Form.Check
                        type='radio'
                        id={`ticket_payment_${i}`}
                        label={`${ticket.ticket_name} 消費枚数: ${ticket.consume_number}枚`}></Form.Check>
                    </>
                  )
                })}
                <a className='btn btn-primary mt20' href={`/reserve/${router.query.reserve_frame_id}/input_customer_info`}>予約を進める</a>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  )
}

export default Index
