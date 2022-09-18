import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Button, Form } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import { ReservationParam } from 'interfaces/ReservationParam'
import { paymentMethodText } from 'functions/paymentMethodText'
import axios from 'axios'
import { receptionTypeText } from 'functions/receptionTypeText'
import CheckIcon from 'components/atoms/CheckIcon'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { getZeroPaddingDate } from 'functions/getZeroPaddingDatetime'
import CreateReservationModal from 'components/templates/CreateReservationModal'
import { useDispatch } from 'react-redux'
import { showRegisterReservationModalChanged } from 'redux/reservationSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [reservations, setReservatons] = useState<ReservationParam[]>([])
  const date = new Date()
  const [targetStartDate, setTargetStartDate] = useState(getZeroPaddingDate())
  const [targetEndDate, setTargetEndDate] = useState(getZeroPaddingDate())

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/account/reservations?target_start_date=${targetStartDate}&target_end_date=${targetEndDate}`,
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
  }, [cookies._square_eight_merchant_session, targetStartDate, targetEndDate])

  const updateReservationStatus = (reservationId: string, reservationStatus: string) => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/reservations/${reservationId}/update_status`,
    {
      reservations: {
        id: reservationId,
        status: reservationStatus
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '更新しました',
        icon: 'info'
      })
      location.reload()
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '更新失敗しました',
        icon: 'error'
      })
    })
  }


  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <Row>
                <Col sm={9}>
                  <h4 className='mb20'>予約一覧</h4>
                </Col>
                <Col>
                  <Button onClick={() => dispatch(showRegisterReservationModalChanged(true))}>
                    予約登録
                  </Button>
                </Col>
              </Row>
              <Form.Label>対象日付</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    onChange={(e) => setTargetStartDate(e.target.value)}
                    type='date'
                    value={targetStartDate}></Form.Control>
                </Col>
                ~
                <Col>
                  <Form.Control
                    onChange={(e) => setTargetEndDate(e.target.value)}
                    type='date'
                    value={targetEndDate}></Form.Control>
                </Col>
              </Row>
              &emsp;
              <ListGroup>
                {reservations && reservations.map((reservation, i) => {
                  return (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col>
                          <h4 className='mb10'>{reservation.reserve_frame_title}</h4>
                          <div>{reservation.display_reservation_datetime}</div>
                          <div>人数: {reservation.number_of_people}</div>
                          <div>支払い方法: {paymentMethodText(reservation.payment_method, reservation.price, reservation.ticket_consume_number, reservation.number_of_people)}</div>
                          <div className='mt20'>
                            受付設定: {receptionTypeText(reservation.reception_type)}
                          </div>
                          <br/>
                          <span>ステータス:
                          {reservation.status === 'confirm' && <><CheckIcon width={20} height={20} fill={'#00ff00'}/>予約確定</>}</span>
                          {reservation.status === 'pendingVerifivation'
                            && <>
                                <span className='text-danger'>予約確定待ち</span><br/>
                                <a className='badge bg-primary' onClick={() => updateReservationStatus(reservation.id, 'confirm')}>予約を確定する</a>
                              </>}
                        </Col>
                        <Col>
                          <div className='mb10'>顧客情報</div>
                          <div>{reservation.customer_name}</div>
                          <div>メールアドレス: {reservation.customer_email}</div>
                          <div>電話番号: {reservation.customer_phone_number}</div>
                        </Col>
                      </Row>                    
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Col>
          </Row>
        </Container>
        <CreateReservationModal />
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
