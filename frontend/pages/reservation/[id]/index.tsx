import React, { useState, useEffect } from 'react'
import { receptionTypeText } from 'functions/receptionTypeText'
import axios from 'axios'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

export const Index = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [reserveFrameTitle, setReserveFrameTitle] = useState('')
  const [displayReservationDatetime, setDisplayReservationDatetime] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [price, setPrice] = useState(0)
  const [receptionType, setReceptionType] = useState('')

  useEffect(() => {
    const fetchReservation = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reservations/${router.query.id}?viewable_key=${router.query.key}`
      )
      .then(function (response) {
        setReserveFrameTitle(response.data.reservation.reserve_frame_title)
        setDisplayReservationDatetime(response.data.reservation.display_reservation_datetime)
        setNumberOfPeople(response.data.reservation.number_of_people)
        setPaymentMethod(response.data.reservation.display_payment_method)
        setPrice(response.data.reservation.price)
        setReceptionType(response.data.reservation.status)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchReservation()
    
  }, [router.query.id, dispatch])

  return (
    <>
      <MerchantCustomLayout>
        <Container className='mt30'>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              <Card>
                <Card.Header>以下の内容で予約しました</Card.Header>
                <Card.Body>
                  <h4>{reserveFrameTitle}</h4>
                  <hr/>
                  <div>予約時間: {displayReservationDatetime}</div>
                  <hr/>
                  <div>予約人数: {numberOfPeople}人</div>
                  <hr/>
                  <div>料金: ￥{price}</div>
                  <hr/>
                  <div>お支払い方法: {paymentMethod}</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </MerchantCustomLayout>
    </>
  )
}

export default Index 
