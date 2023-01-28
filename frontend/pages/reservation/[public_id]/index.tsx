import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import { MultiPaymentMethod } from 'interfaces/MultiPaymentMethod'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { hideShareButtonChanged } from 'redux/sharedComponentSlice'

export const Index = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [reserveFrameTitle, setReserveFrameTitle] = useState('')
  const [displayReservationDatetime, setDisplayReservationDatetime] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentMethodText, setPaymentMethodText] = useState('')
  const [price, setPrice] = useState(0)
  const [receptionType, setReceptionType] = useState('')
  const [ticketConsumeNumber, setTicketConsumeNumber] = useState(0)
  const [lotteryConfirmedDayBeforeText, setLotteryConfirmedDayBeforeText] = useState(0)
  const [multiLocalPaymentPrices, setMultiLocalPaymentPrices] = useState<MultiPaymentMethod[]>([])
  const [multiCreditCardPaymentPrices, setMultiCreditCardPaymentPrices] = useState<MultiPaymentMethod[]>([])

  useEffect(() => {
    const fetchReservation = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reservations/${router.query.public_id}`
      )
      .then(function (response) {
        console.log(response.data)
        setReserveFrameTitle(response.data.reservation.reserve_frame_title)
        setDisplayReservationDatetime(response.data.reservation.display_reservation_datetime)
        setNumberOfPeople(response.data.reservation.number_of_people)
        setPaymentMethod(response.data.reservation.payment_method)
        setPaymentMethodText(response.data.reservation.display_payment_method)
        setPrice(response.data.reservation.price)
        setTicketConsumeNumber(response.data.reservation.ticket_consume_number)
        setReceptionType(response.data.reservation.status)
        setMultiLocalPaymentPrices(response.data.reservation.reservation_local_payment_prices)
        setMultiCreditCardPaymentPrices(response.data.reservation.reservation_credit_card_payment_prices)
        setLotteryConfirmedDayBeforeText(response.data.reservation.lottery_confirmed_day_before_text)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchReservation()
    dispatch(hideShareButtonChanged(true))
  }, [router.query.public_id, router.query.key, dispatch])

  return (
    <>
      <MerchantCustomLayout>
        <div className='bg-lightgray'>
          <Container>
            <Row>
              <Col lg={3} md={3}></Col>
              <Col lg={6} md={6}>
                <Card className='mt30 mb30 '>
                  <Card.Body>
                    <p><span className='orange_highlighter font-size-25'>以下の内容で予約しました</span></p>
                    <div className='font-size-25'>{reserveFrameTitle}</div>
                    <hr/>
                    <div>予約時間: {displayReservationDatetime}</div>
                    <hr/>
                    {receptionType === 'waitingForLotteryConfirm' &&
                    <>
                      <div>抽選結果確定日: {lotteryConfirmedDayBeforeText}</div>
                      <hr />
                    </>}
                    {/* 複数料金払いなしの場合 */}
                    {multiLocalPaymentPrices.length === 0 &&
                    multiCreditCardPaymentPrices.length === 0 &&
                    <>
                        <div>予約人数: {numberOfPeople}人</div>
                        <hr/>
                        {['localPayment', 'creditCardPayment'].includes(paymentMethod) &&
                        <><div>料金: ￥{price}</div><hr/></>}
                        <div>
                          お支払い方法: {paymentMethodText} {paymentMethod === 'ticket' && <>消費枚数: {ticketConsumeNumber}枚</>}
                        </div>
                    </>
                    }
                    {paymentMethod === 'localPayment'
                      && multiLocalPaymentPrices.length !== 0
                      &&
                        <>
                          {multiLocalPaymentPrices.map((paymentPrice, i) => {
                            return (
                              <div key={i}>{paymentPrice.name} {paymentPrice.reserve_number_of_people}人 ￥{paymentPrice.price}</div>
                            )
                          })}
                          <div>
                              合計: {multiLocalPaymentPrices.reduce(function(sum, element){ return sum + element.price}, 0)}</div>
                        </>
                    }
                    {/* クレジットカード払い */}
                    {paymentMethod === 'creditCardPayment'
                      && multiCreditCardPaymentPrices.length !== 0
                      &&
                        <>
                          {multiCreditCardPaymentPrices.map((paymentPrice, i) => {
                            return (
                              <div key={i}>{paymentPrice.name} {paymentPrice.reserve_number_of_people}人 ￥{paymentPrice.price}</div>
                            )
                          })}
                          <div>
                              合計: {multiCreditCardPaymentPrices.reduce(function(sum, element){ return sum + element.price}, 0)}</div>
                        </>
                    }
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </MerchantCustomLayout>
    </>
  )
}

export default Index 
