import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { alertChanged } from 'redux/alertSlice'
import { RootState } from 'redux/store'
import { loginStatusChanged } from 'redux/currentMerchantUserSlice'
import GoogleAuthButton from 'components/atoms/GoogleAuthButton'
import { MERCHANT_GOOGLE_AUTH_URL } from 'constants/socialLogin'
import BrandColorButton from 'components/atoms/BrandColorButton'
import { brandGreenRgb } from 'constants/brandColors'

const Login: NextPage = () => {
  const merchantUserLoginStatus = useSelector((state: RootState) => state.currentMerchantUser.loginStatus)
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies(['_square_eight_merchant_session'])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/merchant/sessions`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((res) => {
      dispatch(loginStatusChanged('Login'))
      dispatch(alertChanged({message: 'ログインしています'}))
      router.push('/admin/dashboard')
    }).catch((e) => {
    })
  }, [dispatch, cookies._square_eight_merchant_session, merchantUserLoginStatus, router])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    axios.post(`${process.env.BACKEND_URL}/api/internal/merchant/sessions`,
    {
      merchant_user: {
        email: email,
        password: password
      }
    }).then(response => {
      setCookie('_square_eight_merchant_session', response.data.session_id.public_id, { path: '/'})
      dispatch(alertChanged({message: '', show: false}))
      router.push('/admin/dashboard')
    }).catch(error => {
      dispatch(alertChanged({message: 'ログイン失敗しました。メールアドレス、パスワードを再確認してください。', show: true, type: 'danger'}))
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
                  <Card.Header style={{backgroundColor: brandGreenRgb}} className='text-white'>
                    ログイン
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={onSubmit}>
                      <Form.Group className='mb-3' controlId='formEmail'>
                        <Form.Label>メールアドレス</Form.Label>
                        <Form.Control type='email' placeholder='メールアドレス' onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className='text-muted'></Form.Text>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='formPassword'>
                        <Form.Label>パスワード</Form.Label>
                        <Form.Control type='password' placeholder='パスワード' onChange={(e) => setPassword(e.target.value)} />
                      </Form.Group>
                      <div className='text-center'>
                        <BrandColorButton
                          buttonText='ログインする'
                          buttonType='submit'
                          onClick={onSubmit} />
                      </div>
                    </Form>
                    <hr />
                      <GoogleAuthButton
                        buttonText='Googleでログイン'
                        buttonHref={MERCHANT_GOOGLE_AUTH_URL}></GoogleAuthButton>
                  </Card.Body>
                </Card>
                <div className='text-center mt20'>
                  <a href='/merchant/signup'>新規登録はこちら</a>
                </div>
                <div className='text-center mt20'>
                  <a href='/merchant/password_reset_mail'>ログインできない方はこちら</a>
                </div>
              </Col>
            <Col lg={4} md={3}></Col>
          </Row>
        </Container>
      </WithoutSessionLayout>
    </>
  )
}

export default Login
