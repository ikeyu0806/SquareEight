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
              <h4>ご購入にはユーザ登録が必要となります</h4>
                <hr />
                <h5>SquareEightIDをお持ちの方</h5>
                <Button className='mt10' variant='dark'>SquareEightIDで支払う</Button>
                <hr />
                <h5>SquareEightIDをお持ちでない方</h5>
                <Form.Label className='mt30'>メールアドレス</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>パスワード</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>パスワード(確認)</Form.Label>
                <Form.Control></Form.Control>
                <hr />
                <h5>お支払いクレジットカードを登録してください</h5>
                <Form.Label className='mt20'>カード番号</Form.Label>
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
