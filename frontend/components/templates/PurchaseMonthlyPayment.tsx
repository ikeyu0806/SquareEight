import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Container, Row, Col, Card } from 'react-bootstrap'

const PurchaseMonthlyPayment = (): JSX.Element => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.monthlyPaymentPlan.name)
  const price = useSelector((state: RootState) => state.monthlyPaymentPlan.price)
  const reserveIsUnlimited = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIsUnlimited)
  const reserveIntervalNumber = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIntervalNumber)
  const enableReserveCount = useSelector((state: RootState) => state.monthlyPaymentPlan.enableReserveCount)
  const description = useSelector((state: RootState) => state.monthlyPaymentPlan.description)

  return (
    <>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
          <Card>
            <Card.Header>月額課金プラン加入</Card.Header>
            <Card.Body>
              <div>{name}</div>
              <div>{description}</div>
              <div>￥{price}</div>
              <div>{reserveIntervalNumber}日に{enableReserveCount}回予約可能</div>
              <a className='btn btn-primary mt30'>購入に進む</a>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default PurchaseMonthlyPayment
