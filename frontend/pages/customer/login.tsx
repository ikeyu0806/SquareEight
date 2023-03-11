import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useRouter } from 'next/router'
import { alertChanged } from 'redux/alertSlice'
import { loginStatusChanged } from 'redux/currentEndUserSlice'
import Router from 'next/router'
import GoogleAuthButton from 'components/atoms/GoogleAuthButton'
import { END_USER_GOOGLE_AUTH_URL } from 'constants/socialLogin'
import { endUserLoginRedirect } from 'functions/endUserLoginRedirect'
import { brandGreenRgb } from 'constants/brandColors'
import BrandColorButton from 'components/atoms/BrandColorButton'
import AuthStyles from 'styles/Auth.module.css'

const Login: NextPage = () => {
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cookies, setCookie] = useCookies(['_square_eight_end_user_session'])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_user/sessions`,
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then((res) => {
      dispatch(loginStatusChanged('Login'))
      Router.push('/customer_page')
    }).catch((e) => {
      dispatch(loginStatusChanged('Logout'))
      console.log(e)
    })
  }, [dispatch, cookies._square_eight_end_user_session, currentEndUserLogintStatus])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    axios.post(`${process.env.BACKEND_URL}/api/internal/end_user/sessions`,
    {
      end_user: {
        email: email,
        password: password
      }
    }).then(response => {
      setCookie('_square_eight_end_user_session', response.data.session_id.public_id, { path: '/'})
      dispatch(alertChanged({message: '', show: false}))
      endUserLoginRedirect()
    }).catch(error => {
      dispatch(alertChanged({message: error.response.data.error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <WithoutSessionLayout>
        <div className='bg-lightgray'>
          <Container>
            <Row>
              <Col lg={4} md={3}></Col>
                <Col>
                  <div className='text-center'>
                    <div className={AuthStyles.service_name}>SquareEight</div>
                    <div className={AuthStyles.auth_screen_header_text}>SquareEightIDログイン</div>
                  </div>
                  <Card className='mt30 mb30'>
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
                            onClick={onSubmit} />
                        </div>
                      </Form>
                      <hr />
                      <GoogleAuthButton
                        buttonText='Googleでログイン'
                        buttonHref={END_USER_GOOGLE_AUTH_URL}
                        isEndUserLogin={true}></GoogleAuthButton>
                      <div className='text-center mt30'>
                        <a href='/customer/signup'>新規登録はこちら</a>
                      </div>
                      <div className='text-center mt20'>
                        <a href='/customer/password_reset_mail'>ログインできない方はこちら</a>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              <Col lg={4} md={3}></Col>
            </Row>
          </Container>
        </div>
      </WithoutSessionLayout>
    </>
  )
}

export default Login
