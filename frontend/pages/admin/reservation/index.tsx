import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import { ReservationParam } from 'interfaces/ReservationParam'
import { paymentMethodText } from 'functions/paymentMethodText'
import axios from 'axios'
import { receptionTypeText } from 'functions/receptionTypeText'
import CheckIcon from 'components/atoms/CheckIcon'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [reservations, setReservatons] = useState<ReservationParam[]>([])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/account/reservations`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setReservatons(response.data.reservations)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session])

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <Card>
                <Card.Header>予約一覧</Card.Header>
                {reservations && reservations.map((reservation, i) => {
                  return (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col>
                          <div className='mb10'>{reservation.reserve_frame_title}</div>
                          <span>{reservation.display_reservation_datetime}</span>
                          <br/>
                          <span>{reservation.customer_name}</span>
                          <br />
                          <span>人数: {reservation.number_of_people}</span>
                          <br />
                          <span>支払い方法: {paymentMethodText(reservation.payment_method, reservation.price, reservation.ticket_consume_number, reservation.number_of_people)}</span>
                          <br />
                        </Col>
                        <Col>
                          <span>
                            受付設定: {receptionTypeText(reservation.reception_type)}
                          </span>
                          <br/>
                          <span>ステータス: {reservation.status === 'confirm' ? <><CheckIcon width={20} height={20} fill={'#00ff00'}/>予約確定</> : '確定待ち'}</span>
                        </Col>
                      </Row>                    
                    </ListGroup.Item>
                  )
                })}
              </Card>
            </Col>
          </Row>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
