import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'
import IntroductionNavbar from '../../components/templates/IntroductionNavbar'
import RegularFooter from '../../components/organisms/RegularFooter'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { alertChanged } from '../../redux/alertSlice'
import { loginStatusChanged } from 'redux/currentMerchantUserSlice'
import { RootState } from 'redux/store'
import { useCookies } from 'react-cookie'
import Router from 'next/router'

const Signup: NextPage = () => {
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [cookies] = useCookies(['_gybuilder_end_user_session'])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_user/sessions`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then((res) => {
      dispatch(loginStatusChanged('Login'))
      Router.push('/customer_page')
    }).catch((e) => {
      dispatch(loginStatusChanged('Logout'))
      console.log(e)
    })
  }, [dispatch, cookies._gybuilder_end_user_session, currentEndUserLogintStatus])

  const onSubmit = () => {
    axios.post(
      `${process.env.BACKEND_URL}/api/internal/end_users`,
      {
        end_user: {
          email: email,
          password: password,
          password_confirmation: confirmPassword
        }
      }
    )
    .then(response => {
      dispatch(alertChanged({message: `${email}に検証コードを送信しました。確認して登録を完了してください`, show: true}))
    })
    .catch(error => {
      dispatch(alertChanged({message: '登録失敗しました', show: true, type: 'danger'}))
      console.log({error})
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <>
      <IntroductionNavbar />
      <Container>
        <Row>
          <Col lg={4} md={3}></Col>
          <Col>
            <Card>
              <Card.Header>カスタマーアカウント登録</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='formEmail'>
                    <Form.Label>メールアドレス</Form.Label>
                    <Form.Control type='email'
                                  placeholder='必須'
                                  onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Text className='text-muted'></Form.Text>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formPassword'>
                    <Form.Label>パスワード</Form.Label>
                    <Form.Control type='password'
                                  placeholder='必須'
                                  onChange={(e) => setPassword(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formPassword'>
                    <Form.Label>パスワード(確認)</Form.Label>
                    <Form.Control type='password'
                                  onChange={(e) => setConfirmPassword(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                    <Form.Check type='checkbox' label='プライバシーポリシーに同意しました' />
                  </Form.Group>
                  <div className='text-center'>
                    <Button variant='primary'
                            onClick={onSubmit}>
                      送信
                    </Button>
                  </div>
                  <hr />
                  <div className='mt20 text-center'>
                    <a className='btn btn-primary'
                       href={`https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${process.env.GOOGLE_AUTH_END_USER_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_AUTH_END_USER_REDIRECT_URL}&scope=email&access_type=offline&approval_prompt=force`}>
                      Googleでサインアップ
                    </a>
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

export default Signup
