import type { NextPage } from 'next'
import Router from 'next/router'
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
import { getZeroPaddingDatePlusWeek } from 'functions/getZeroPaddingDatetime'
import CreateReservationModal from 'components/templates/CreateReservationModal'
import { useDispatch, useSelector } from 'react-redux'
import { showRegisterReservationModalChanged } from 'redux/reservationSlice'
import ReservationLimitAlerts from 'components/molecules/ReservationLimitAlerts'
import { RootState } from 'redux/store'
import Unauauthorized from 'components/templates/Unauauthorized'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [reservations, setReservatons] = useState<ReservationParam[]>([])
  const date = new Date()
  const [targetStartDate, setTargetStartDate] = useState(getZeroPaddingDate())
  const [targetEndDate, setTargetEndDate] = useState(getZeroPaddingDatePlusWeek())

  const allowReadReservation = useSelector((state: RootState) => state.merchantUserPermission.allowReadReservation)
  const allowCreateReservation = useSelector((state: RootState) => state.merchantUserPermission.allowCreateReservation)
  const allowUpdateReservation = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateReservation)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/account/reservations?target_start_date=${targetStartDate}&target_end_date=${targetEndDate}`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      setReservatons(response.data.reservations)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, targetStartDate, targetEndDate])

  const updateReservationStatus = (reservationPublicId: string, reservationStatus: string) => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/reservations/${reservationPublicId}/update_status`,
    {
      reservations: {
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

  const cancelReservation = (reservationId: string) => {
    swalWithBootstrapButtons.fire({
      title: 'キャンセルします',
      html: '予約キャンセルします。<br />よろしいですか？',
      input: 'checkbox',
      inputPlaceholder: '予約者にキャンセルメールを送る',
      icon: 'question',
      confirmButtonText: 'キャンセルする',
      cancelButtonText: 'キャンセルしない',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/reservations/${reservationId}?send_mail=${result.value}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
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
      <MerchantUserAdminLayout>
        {allowReadReservation === 'Allow' && <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <ReservationLimitAlerts />
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
                          {/* 支払い方法と人数 */}
                          {/* 料金一律の場合 */}
                          {reservation.reservation_local_payment_prices.length === 0 &&
                           reservation.reservation_credit_card_payment_prices.length === 0 &&
                           <>
                              <div>人数: {reservation.number_of_people}</div>
                              <div>支払い方法: {paymentMethodText(reservation.payment_method, reservation.price, reservation.ticket_consume_number, reservation.number_of_people)}</div>
                           </>
                          }
                          {/* 現地払い複数料金 */}
                          {reservation.payment_method === 'localPayment' && reservation.reservation_local_payment_prices.length !== 0 &&
                            <div>
                              支払い方法: 現地払い
                              {reservation.reservation_local_payment_prices.map((paymentPrice, i) => {
                                return (
                                  <div key={i}>{paymentPrice.name} {paymentPrice.reserve_number_of_people}人 ￥{paymentPrice.price}</div>
                                )
                              })}
                            <div>
                              合計: {reservation.reservation_local_payment_prices.reduce(function(sum, element){ return sum + element.price}, 0)}</div>
                            </div>
                          }
                          {reservation.payment_method === 'creditCardPayment' && reservation.reservation_credit_card_payment_prices.length !== 0 &&
                            <div>
                              支払い方法: クレジットカード払い
                              {reservation.reservation_credit_card_payment_prices.map((paymentPrice, i) => {
                                return (
                                  <div key={i}>{paymentPrice.name} {paymentPrice.reserve_number_of_people}人 ￥{paymentPrice.price}</div>
                                )
                              })}
                            <div>
                              合計: {reservation.reservation_credit_card_payment_prices.reduce(function(sum, element){ return sum + element.price}, 0)}</div>
                            </div>
                          }
                          <div className='mt20'>
                            受付設定: {receptionTypeText(reservation.reception_type)}
                          </div>
                          <br/>
                          <span>ステータス:
                          {reservation.status === 'confirm' && <><CheckIcon width={20} height={20} fill={'#00ff00'}/>予約確定</>}</span>
                          {reservation.status === 'pendingVerifivation'
                            &&
                              <>
                                <span className='text-danger'>予約確定待ち</span><br/>
                                <a className='badge bg-primary' onClick={() => updateReservationStatus(reservation.public_id, 'confirm')}>予約を確定する</a>
                              </>
                          }
                          {reservation.status === 'cancel' && <span className='text-danger'>キャンセル</span>}
                        </Col>
                        <Col>
                          <div className='mb10'>顧客情報</div>
                          <div>{reservation.customer_name}</div>
                          <div>メールアドレス: {reservation.customer_email}</div>
                          <div>電話番号: {reservation.customer_phone_number}</div>
                          {reservation.status !== 'cancel' &&
                            <Button
                              className='mt30'
                              variant='danger'
                              onClick={() => cancelReservation(reservation.id)}
                              size='sm'>キャンセル</Button>}
                          {reservation.questionnaire_master_id &&
                            <>
                              <br/>
                              <Button
                                className='mt10'
                                variant='primary'
                                size='sm'
                                onClick={() => Router.push(`//admin/questionnaire/master/${reservation.questionnaire_master_id}/answer`)}>
                                アンケート回答</Button>
                            </>
                          }
                        </Col>
                      </Row>                    
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Col>
          </Row>
        </Container>}
        {allowReadReservation === 'Forbid' && <Unauauthorized></Unauauthorized>}
        <CreateReservationModal />
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
