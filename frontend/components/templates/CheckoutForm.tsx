import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  CardElementComponent,
} from '@stripe/react-stripe-js'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const registerCard = async () => {
    if (elements == null) {
      return
    }

    await stripe!.createToken(
      elements!.getElement(CardNumberElement)!
    ).then((result) => {
      console.log(result)
    })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
  }

  return (
    <Container>
      <Row>
        <Col lg={4} md={3}></Col>
        <Col lg={4} md={5}>
        <Form onSubmit={handleSubmit}>
          <Card>
            <Card.Header>新規クレジットカード登録</Card.Header>
            <Card.Body>
              <Form.Label>カード番号</Form.Label>
              <CardNumberElement className="form-control" />
              <Form.Label className='mt10'>有効期限</Form.Label>
              <CardExpiryElement className="form-control" />
              <Form.Label className='mt10'>セキュリティコード</Form.Label>
              <CardCvcElement className="form-control" />
              <div className='text-center'>
                <button className='btn btn-primary mt30'
                        type='submit' disabled={!stripe || !elements}
                        onClick={() => registerCard()}>
                  登録する
                </button>
              </div>
            </Card.Body>
          </Card>
        </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CheckoutForm
