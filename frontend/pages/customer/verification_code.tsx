import type { NextPage } from 'next'
import React, { useState } from 'react'
import axios from 'axios'
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { alertChanged } from 'redux/alertSlice'

const VerificationCode: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState('')
  const [cookies, setCookie] = useCookies(['_square_eight_end_user_session'])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    axios.post(
      `${process.env.BACKEND_URL}/api/internal/end_users/confirm_verification_code`,
      {
        end_user: {
          email: router.query.email,
          verification_code: verificationCode
        }
      }
    )
    .then(response => {
      console.log(response.data)
      setCookie('_square_eight_end_user_session', response.data.session_id.public_id, { path: '/'})
      router.push('/customer_page')
    })
    .catch(error => {
      dispatch(alertChanged({message: error.response.data.error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <WithoutSessionLayout>
        <Container>
          <Row>
            <Col lg={4} md={3}></Col>
              <Col>
                <Card>
                  <Card.Header>検証コードを入力してください</Card.Header>
                  <Card.Body>
                    <Form onSubmit={onSubmit}>
                      <Form.Group className='mb-3' controlId='formEmail'>
                        <Form.Label>検証コード</Form.Label>
                        <Form.Control onChange={(e) => setVerificationCode(e.target.value)} />
                        <Form.Text className='text-muted'></Form.Text>
                      </Form.Group>
                      <div className='text-center'>
                        <Button
                          variant='primary'
                          type='submit'
                          onClick={onSubmit}>
                          送信
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
                <div className='text-center mt20'>
                  <a href='/customer/resend_verification_code'>検証コードの再送</a>
                </div>
              </Col>
            <Col lg={4} md={3}></Col>
          </Row>
        </Container>
      </WithoutSessionLayout>
    </>
  )
}

export default VerificationCode
