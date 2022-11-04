import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Card, Button } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import { useCookies } from 'react-cookie'
import { ReservationParam } from 'interfaces/ReservationParam'
import { paymentMethodText } from 'functions/paymentMethodText'
import axios from 'axios'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [reservations, setReservatons] = useState<ReservationParam[]>([])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_user/reservations`,
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then((response) => {
      console.log(response.data)
      setReservatons(response.data.reservations)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_end_user_session])

  const execCancel = () => {

  }

  return (
    <>
      <EndUserLoginLayout>
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <Card>
                <Card.Header>予約一覧</Card.Header>
                <ListGroup>
                  {reservations && reservations.map((reservation, i) => {
                    return (
                      <ListGroup.Item key={i}>
                        <div className='mb10'>{reservation.reserve_frame_title}</div>
                        <span>{reservation.display_reservation_datetime}</span>
                        <hr />
                        <span>人数: {reservation.number_of_people}</span>
                        <hr />
                        <span>支払い方法: {paymentMethodText(reservation.payment_method, reservation.price, reservation.ticket_consume_number, reservation.number_of_people)}</span>
                        <hr />
                        <span>
                          キャンセル: {reservation.cancel_reception_text}{reservation.is_cancelable
                          &&
                            <>
                              <Button
                                onClick={() => execCancel()}
                                size='sm'
                                variant='danger'
                                className='ml10'>キャンセルする</Button>
                            </>}
                        </span>
                      </ListGroup.Item>
                    )
                  })}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      </EndUserLoginLayout>
    </>
  )
}

export default Index
