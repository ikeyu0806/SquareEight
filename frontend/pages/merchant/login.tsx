import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import IntroductionNavbar from '../../components/templates/IntroductionNavbar'
import RegularFooter from '../../components/organisms/RegularFooter'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { alertChanged } from '../../redux/alertSlice'
import { RootState } from 'redux/store'
import { loginStatusChanged } from 'redux/currentMerchantUserSlice'
import GoogleAuthButton from 'components/atoms/GoogleAuthButton'
import { MERCHANT_GOOGLE_AUTH_URL } from 'constants/socialLogin'

const Login: NextPage = () => {
  const merchantUserLoginStatus = useSelector((state: RootState) => state.currentMerchantUser.loginStatus)
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies(['_gybuilder_merchant_session'])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/merchant/sessions`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_merchant_session
      }
    }).then((res) => {
      dispatch(loginStatusChanged('Login'))
      dispatch(alertChanged({message: 'ログインしています'}))
      router.push('/admin/dashboard')
    }).catch((e) => {
    })
  }, [dispatch, cookies._gybuilder_merchant_session, merchantUserLoginStatus, router])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/merchant/sessions`,
    {
      merchant_user: {
        email: email,
        password: password
      }
    }).then(response => {
      setCookie('_gybuilder_merchant_session', response.data.session_id.public_id, { path: '/'})
      dispatch(alertChanged({message: '', show: false}))
      router.push('/admin/dashboard')
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
                    <hr />
                    <GoogleAuthButton
                      buttonText='Googleでログイン'
                      buttonHref={MERCHANT_GOOGLE_AUTH_URL}></GoogleAuthButton>
                  </Form>
                </Card.Body>
              </Card>
              <div className='text-center mt20'>
                <a href='/merchant/signup'>新規登録はこちら</a>
              </div>
            </Col>
          <Col lg={4} md={3}></Col>
        </Row>
      </Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Login
