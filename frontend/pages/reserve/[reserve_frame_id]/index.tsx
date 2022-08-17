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
                <h4>お支払い方法</h4>
                {reserveFramePaymentMethod.local_payment_price !== undefined && <div>現地払い: {reserveFramePaymentMethod.local_payment_price}円</div>}
                {reserveFramePaymentMethod.enable_monthly_payment_plans
                  && reserveFramePaymentMethod.enable_monthly_payment_plans.map((plan, i) => {
                  return (
                    <>
                      <div>{plan.monthly_payment_plan_name}</div>
                    </>
                  )
                })}
                {reserveFramePaymentMethod.enable_tickets
                  && reserveFramePaymentMethod.enable_tickets.map((ticket, i) => {
                  return (
                    <>
                      <div>{ticket.ticket_name} 消費枚数: {ticket.consume_number}枚</div>
                    </>
                  )
                })}
                <br />
                <div>時間を選択してください</div>
                <Form.Select>
                  {reserveFrame?.reserve_frame_reception_times_values?.map((time, i) => {
                    return (
                      <option key={i}>{time.reception_start_time}-{time.reception_end_time}</option>
                    )
                  })}
                </Form.Select>
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
