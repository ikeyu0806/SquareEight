import React, { useState } from 'react'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { alertChanged } from 'redux/alertSlice'
import { useRouter } from 'next/router'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

const RegisterCardForm = () => {
  const [token, setToken] = useState<any>()
  const stripe = useStripe()
  const elements = useElements()
  const [cookies] = useCookies(['_smartlesson_session'])
  const dispatch = useDispatch()
  const router = useRouter()

  const registerCard = async () => {
    if (elements == null) {
      return
    }

    await stripe!.createToken(
      elements!.getElement(CardNumberElement)!
    ).then((result) => {
      setToken(result.token!.id)
      const cardNumberElement = elements?.getElement(CardNumberElement)
        stripe!.createPaymentMethod({
          type: 'card',
          card: cardNumberElement!
        })
        .then(function(result: any) {
          console.log("!!token", token)
          console.log("!!result", result.paymentMethod.id)
          axios.post(`${process.env.BACKEND_URL}/api/internal/accounts/register_credit_card`,
          {
            account: {
              token: token,
              card_id: result.paymentMethod.id
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
