import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  CardElementComponent,
} from '@stripe/react-stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_pzo8bTj4ggDEV52y7gnVsdWt')

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: CardElementComponent) => {
    if (elements == null) {
      return
    }

    await stripe!.createToken(
      elements!.getElement(CardNumberElement)!
    ).then((result) => {
      console.log(result)
    })
  }

  return (
    <Elements stripe={stripePromise}>
      <Container>
        <Row>
          <Col lg={4} md={3}></Col>
          <Col lg={4} md={5}>
          <Form onSubmit={() => handleSubmit}>
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
                  <button className='btn btn-primary mt30' type='submit' disabled={!stripe || !elements}>
                    登録する
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Form>
          </Col>
        </Row>
      </Container>
    </Elements>
  )
}

export default CheckoutForm
