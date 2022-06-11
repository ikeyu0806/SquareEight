import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import IntroductionNavbar from '../components/atoms/IntroductionNavbar'
import RegularFooter from '../components/organisms/RegularFooter'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const Login: NextPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies(['_smartlesson_session'])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/sessions`,
    {
      merchant_user: {
        email: email,
        password: password
      }
    }).then(response => {
      setCookie('_smartlesson_session', response.data.session_id.public_id, { path: '/'})
      router.push('/admin/dashboard')
    }).catch(error => {
      setAlertMessage(error.response.data.error)
    })
  }

  return (
    <>
      <IntroductionNavbar />
      {alertMessage != '' && <Alert variant='danger' onClose={() => setAlertMessage('')} dismissible>{alertMessage}</Alert>}
      <Container>
        <Row>
          <Col lg={4} md={3}></Col>
            <Col>
              <Card>
                <Card.Header>ログイン</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className='mb-3' controlId='formEmail'>
                      <Form.Label>メールアドレス</Form.Label>
                      <Form.Control type='email' placeholder='メールアドレス' onChange={(e) => setEmail(e.target.value)} />
                      <Form.Text className='text-muted'></Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formPassword'>
                      <Form.Label>パスワード</Form.Label>
                      <Form.Control type='password' placeholder='パスワード' onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                      <Form.Check type='checkbox' label='プライバシーポリシーに同意しました' />
                    </Form.Group>
                    <div className='text-center'>
                      <Button variant='primary' onClick={onSubmit}>
                        送信
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          <Col lg={4} md={3}></Col>
        </Row>
      </Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Login
