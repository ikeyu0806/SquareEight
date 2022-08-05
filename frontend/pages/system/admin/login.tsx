import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'
import IntroductionNavbar from 'components/templates/IntroductionNavbar'
import RegularFooter from 'components/organisms/RegularFooter'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useRouter } from 'next/router'
import { alertChanged } from 'redux/alertSlice'
import { loginStatusChanged } from 'redux/currentSystemAdminUserSlice'
import Router from 'next/router'

const Login: NextPage = () => {
  const currentSystemAdminUserLogintStatus = useSelector((state: RootState) => state.currentSystemAdminUser.loginStatus)
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cookies, setCookie] = useCookies(['_gybuilder_system_admin_user_session'])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/system_admin_user/sessions`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_system_admin_user_session
      }
    }).then((res) => {
      dispatch(loginStatusChanged('Login'))
      Router.push('/system/admin/dashboard')
    }).catch((e) => {
      dispatch(loginStatusChanged('Logout'))
      console.log(e)
    })
  }, [dispatch, cookies._gybuilder_system_admin_user_session, currentSystemAdminUserLogintStatus])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/system_admin_user/sessions`,
    {
      system_admin_user: {
        email: email,
        password: password
      }
    }).then(response => {
      setCookie('_gybuilder_system_admin_user_session', response.data.session_id.public_id, { path: '/'})
      dispatch(alertChanged({message: '', show: false}))
      const redirectPath = localStorage.getItem('endUserOnLoginRedirectPath')
      if (redirectPath) {
        router.push(redirectPath)
      } else {
        router.push('/system/admin/dashboard')
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
