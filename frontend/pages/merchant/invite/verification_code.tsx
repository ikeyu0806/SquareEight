import type { NextPage } from 'next'
import React, { useState } from 'react'
import axios from 'axios'
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { alertChanged } from 'redux/alertSlice'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const VerificationCode: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies(['_square_eight_merchant_session'])

  const onSubmit = () => {
    axios.post(
      `${process.env.BACKEND_URL}/api/internal/merchant_users/confirm_additional_user_verification_code`,
      {
        merchant_user: {
          email: router.query.email,
          verification_code: verificationCode,
          password: password,
          confirm_password: confirmPassword
        }
      }
    )
    .then(response => {
      setCookie('_square_eight_merchant_session', response.data.session_id.public_id, { path: '/'})
      router.push('/admin/dashboard')
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
                  <Card.Header>検証コードとパスワードを入力してください</Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group className='mb-3' controlId='formEmail'>
                        <Form.Label>検証コード</Form.Label>
                        <Form.Control onChange={(e) => setVerificationCode(e.target.value)} />
                        <Form.Label>パスワード</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} />
                        <Form.Label>パスワード(確認)</Form.Label>
                        <Form.Control onChange={(e) => setConfirmPassword(e.target.value)} />
                        <Form.Text className='text-muted'></Form.Text>
                      </Form.Group>
                      <div className='text-center'>
                        <Button
                          disabled={!password || password !== confirmPassword || !verificationCode}
                          onClick={onSubmit}>
                          送信
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
                <div className='text-center mt20'>
                  <a href='/merchant/resend_verification_code'>検証コードの再送</a>
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
