import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Card, Button } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import { useCookies } from 'react-cookie'
import { ReservationParam } from 'interfaces/ReservationParam'
import { paymentMethodText } from 'functions/paymentMethodText'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
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

  const execCancel = (publicId: string) => {
    swalWithBootstrapButtons.fire({
      title: 'キャンセルします',
      html: '予約キャンセルします。<br />よろしいですか？',
      icon: 'question',
      confirmButtonText: 'キャンセルする',
      cancelButtonText: 'キャンセルしない',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/end_user/reservations/${publicId}/cancel_reservation`, {
          headers: { 
            'Session-Id': cookies._square_eight_end_user_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: 'キャンセルしました',
            icon: 'info'
          })
          location.reload()
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: 'キャンセル失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  return (
    <>
      <EndUserLoginLayout>
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              {reservations && reservations.map((reservation, i) => {
                return (
                  <div key={i} className='mb30 border-solid padding-20'>
                    <div className='mb10'>{reservation.reserve_frame_title}</div>
                    <span>{reservation.display_reservation_datetime}</span>
                    <hr />
                    <span>人数: {reservation.number_of_people}</span>
                    <hr />
                    <span>支払い方法: {paymentMethodText(reservation.payment_method, reservation.price, reservation.ticket_consume_number, reservation.number_of_people)}</span>
                    <hr />
                    <span>
                      {reservation.status !== 'cancel' && <>キャンセル: {reservation.cancel_reception_text}</>}
                      {reservation.status === 'cancel' && <span className='badge bg-danger'>キャンセル済み</span>}
                      {reservation.is_cancelable
                      &&
                        <>
                          <Button
                            onClick={() => execCancel(reservation.public_id)}
                            size='sm'
                            variant='danger'
                            className='ml10'>キャンセルする</Button>
                        </>}
                    </span>
                  </div>
                )
              })}
            </Col>
          </Row>
        </Container>
      </EndUserLoginLayout>
    </>
  )
}

export default Index
