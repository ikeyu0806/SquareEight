import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { alertChanged } from 'redux/alertSlice'
import { useRouter } from 'next/router'

const RegisterCardForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [cookies, setCookie, removeCookie] = useCookies(['_smartlesson_session'])
  const dispatch = useDispatch()
  const router = useRouter()

  const registerCard = async () => {
    if (elements == null) {
      return
    }

    await stripe!.createToken(
      elements!.getElement(CardNumberElement)!
    ).then((result) => {
      console.log(result.token)
      axios.post(`${process.env.BACKEND_URL}/api/internal/accounts/register_credit_card`,
      {
        account: {
          token: result.token
        }
      },
      {
        headers: {
          'Session-Id': cookies._smartlesson_session
        }
      }).then(response => {
        dispatch(alertChanged({message: '登録しました', show: true}))
        router.push('/admin/payment_method')
      }).catch(error => {
        dispatch(alertChanged({message: "登録失敗しました", show: true, type: 'danger'}))
      })
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

export default RegisterCardForm
