import type { NextPage } from 'next'
import { Container, Table, Button, FormControl, Row, Col, Form } from 'react-bootstrap'

const PaymentMethod: NextPage = () => {
  return (
    <>
      <Container>
        <div className='text-center mt50 mb50'>
          <h2>お支払い方法を選択してください</h2>
        </div>
        <Row>
          <Col></Col>
          <Col>
            <Form.Check type='radio' label='現地払い 5000円'></Form.Check>
            <Form.Check type='radio' label='週1 レッスンサブスク'></Form.Check>
            <Form.Check type='radio' label='10000円 レッスン3回受講回数券 消費枚数1枚'></Form.Check>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Button variant='outline-primary'>
              戻る
            </Button>
          </Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button>
              次へ
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  )
}
  
export default PaymentMethod
