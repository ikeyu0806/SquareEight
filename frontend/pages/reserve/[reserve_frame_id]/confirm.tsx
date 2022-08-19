import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Container, Button, Row, Col, Card, Alert } from 'react-bootstrap'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { useRouter } from 'next/router'
import { paymentMethodText } from 'functions/paymentMethodText'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const PaymentMethod: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const [selectedDate] = useState(String(router.query.date).split('-'))

  const execReserve = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/reservations`,
    {
      reservations: {
        last_name: router.query.last_name,
        first_name: router.query.first_name,
        email: router.query.email,
        phone_number: router.query.phone_number,
        reserve_frame_id: router.query.reserve_frame_id,
        payment_method: router.query.payment_method,
        price: router.query.price,
        consume_number: router.query.consume_number,
        reserve_count: router.query.reserve_count,
        ticket_id: router.query.ticket_id,
        monthly_payment_plan_id: router.query.monthly_payment_plan_id
      }
    },
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '予約しました', show: true}))
    }).catch(error => {
    })
  }

  return (
    <>
      <WithoutSessionLayout>
        <Container className='mt30'>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              <Card>
                <Card.Header>予約内容の確認</Card.Header>
                <Card.Body>
                <h3 className='mb30'>{router.query.title}</h3>
                  <div>お名前: {router.query.last_name} {router.query.first_name}</div>
                  <hr />
                  <div>メールアドレス: {router.query.email}</div>
                  <hr />
                  <div>電話番号: {router.query.phone_number}</div>
                  <hr />
                  <div className='mt10 mb10'>予約時間: {selectedDate[0]}年{selectedDate[1]}月{selectedDate[2]}日 {router.query.time}</div>
                  <hr />
                  <div>お支払い方法: {paymentMethodText(String(router.query.payment_method), Number(router.query.price), Number(router.query.consume_number), Number(router.query.reserve_count))}</div>
                  <hr />
                  <div className='mt10 mb10'>{['localPayment', 'creditCardPayment'].includes(String(router.query.payment_method)) && <>予約人数: {router.query.reserve_count}</>}</div>
                  <div className='text-center'>
                    <Button className='mt30' onClick={execReserve}>予約を確定する</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </WithoutSessionLayout>
    </>
  )
}
  
export default PaymentMethod
