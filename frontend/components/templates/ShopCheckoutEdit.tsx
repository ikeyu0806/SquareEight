import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

const ShopCheckoutEdit = (): JSX.Element => {
  const stripe = useStripe()
  const elements = useElements()
  return (
    <>
      <Container className='mt50'>
        <Row>
          <Col lg={1}></Col>
          <Col lg={6}>
            <Card>
              <Card.Body>
              <div>ご購入にはユーザ登録が必要となります</div>
                <hr />
                <div>SmartLessonアカウントをお持ちの方</div>
                <Button className='mt10' variant='dark'>SmartLessonアカウントで支払う</Button>
                <hr />
                <div>SmartLessonアカウントをお持ちでない方</div>
                <Form.Label className='mt30'>メールアドレス</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>パスワード</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>パスワード(確認)</Form.Label>
                <Form.Control></Form.Control>
                <hr />
                <div>お支払いクレジットカードを登録してください</div>
                <Form.Label>カード番号</Form.Label>
                <CardNumberElement className="form-control" />
                <Form.Label className='mt10'>有効期限</Form.Label>
                <CardExpiryElement className="form-control" />
                <Form.Label className='mt10'>セキュリティコード</Form.Label>
                <CardCvcElement className="form-control" />
                <div className='text-center'>
                  <button className='btn btn-primary mt30'
                          type='submit' disabled={!stripe || !elements}
                          onClick={() => console.log("temp")}>
                    登録する
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={5}>
            <Card>
              <Card.Body>
                <span>カートに入っている商品</span>
                <hr />
                <span>レッスン10回受講回数券</span>
                <hr />
                <span>合計 ￥1000</span>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Container>
    </>
  )
}

export default ShopCheckoutEdit
