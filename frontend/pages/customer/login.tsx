import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'
import IntroductionNavbar from '../../components/templates/IntroductionNavbar'
import RegularFooter from '../../components/organisms/RegularFooter'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { alertChanged } from '../../redux/alertSlice'

const Login: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cookies, setCookie] = useCookies(['_gybuilder_end_user_session'])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/end_user/sessions`,
    {
      end_user: {
        email: email,
        password: password
      }
    }).then(response => {
      setCookie('_gybuilder_end_user_session', response.data.session_id.public_id, { path: '/'})
      dispatch(alertChanged({message: '', show: false}))
      const redirectPath = localStorage.getItem('endUserOnLoginRedirectPath')
      if (redirectPath) {
        router.push(redirectPath)
      } else {
        router.push('/customer_page/dashboard')
      }
    }).catch(error => {
      dispatch(alertChanged({message: error.response.data.error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <IntroductionNavbar />
      <Container>
        <Row>
          <Col lg={4} md={3}></Col>
            <Col>
              <Card>
                <Card.Header>カスタマーアカウントログイン</Card.Header>
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
                    <div className='text-center mt30'>
                      <a href='/customer/signup'>新規登録はこちら</a>
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
