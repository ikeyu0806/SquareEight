import React, { useState } from 'react'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { alertChanged } from 'redux/alertSlice'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useRouter } from 'next/router'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

const RegisterMerchantCardForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState<any>()
  const stripe = useStripe()
  const elements = useElements()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const router = useRouter()

  const registerCard = async () => {
    if (elements == null) {
      return
    }
    setIsLoading(true)
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
          axios.post(`${process.env.BACKEND_URL}/api/internal/accounts/register_credit_card`,
          {
            account: {
              token: token,
              payment_method_id: result.paymentMethod.id
            }
          },
          {
            headers: {
              'Session-Id': cookies._square_eight_merchant_session
            }
          }).then(response => {
            setIsLoading(false)
            dispatch(alertChanged({message: '登録しました', show: true}))
            router.push('/admin/payment_method')
          }).catch(error => {
            setIsLoading(false)
            swalWithBootstrapButtons.fire({
              title: '登録失敗しました',
              icon: 'error'
            })
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
              <CardNumberElement className='form-control' />
              <Form.Label className='mt10'>有効期限</Form.Label>
              <CardExpiryElement className='form-control' />
              <Form.Label className='mt10'>セキュリティコード</Form.Label>
              <CardCvcElement className='form-control' />
              <div className='text-center'>
                <button className='btn btn-primary mt30'
                        type='submit' disabled={!stripe || !elements}
                        onClick={() => registerCard()}>
                  {isLoading && <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>}
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

export default RegisterMerchantCardForm
