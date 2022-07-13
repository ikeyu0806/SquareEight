import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col } from 'react-bootstrap'
import CommonNavbar from 'components/templates/CommonNavbar'
import axios from 'axios'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'
import { ReserveFramePaymentMethodParam } from 'interfaces/ReserveFramePaymentMethodParam'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [reserveFrame, setReserveFrame] = useState<ReserveFrameParam>({title: '', description: ''})
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
          <Col>
            <h3>{reserveFrame.title}</h3>
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
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Index
