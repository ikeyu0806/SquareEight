import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
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
        <div className='mt20'>
          <Container>
            <h4>予約一覧</h4>
            <Table bordered>
              <thead>
                <tr>
                  <th>予約メニュー</th>
                  <th>予約日時</th>
                  <th>人数</th>
                  <th>お支払い方法</th>
                  <th>キャンセル</th>
                </tr>
              </thead>
              <tbody>
              {reservations && reservations.map((reservation, i) => {
                return (
                  <tr key={i}>
                    <td>{reservation.reserve_frame_title}</td>
                    <td>{reservation.display_reservation_datetime}</td>
                    <td>{reservation.number_of_people}</td>
                    <td>{paymentMethodText(reservation.payment_method, reservation.price, reservation.ticket_consume_number, reservation.number_of_people)}</td>
                    <td>
                      {reservation.is_cancelable
                        ?
                          <>
                            <Button
                              onClick={() => execCancel(reservation.public_id)}
                              size='sm'
                              variant='danger'
                              className='ml10'>キャンセルする</Button>
                          </>
                        :
                          <div>キャンセル不可</div>}
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
          </Container>
        </div>
      </EndUserLoginLayout>
    </>
  )
}

export default Index
