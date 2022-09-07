import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { alertChanged } from 'redux/alertSlice'
import { loginStatusChanged } from 'redux/currentMerchantUserSlice'
import { RootState } from 'redux/store'
import { useCookies } from 'react-cookie'
import Router from 'next/router'
import GoogleAuthButton from 'components/atoms/GoogleAuthButton'
import { END_USER_GOOGLE_AUTH_URL } from 'constants/socialLogin'

const Signup: NextPage = () => {
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [cookies] = useCookies(['_square_eight_end_user_session'])

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
      <WithoutSessionLayout>
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
                    登録することで
                      <a target='_blank' rel='noreferrer' href='/terms'>利用規約</a>と
                      <a target='_blank' rel='noreferrer' href='/privacy_policy'>プライバシーポリシー</a>に同意するものとします
                    </Form.Group>
                    <div className='text-center'>
                      <Button variant='primary'
                              onClick={onSubmit}>
                        登録する
                      </Button>
                    </div>
                    <hr />
                    <GoogleAuthButton
                      buttonText='Googleでサインアップ'
                      buttonHref={END_USER_GOOGLE_AUTH_URL}></GoogleAuthButton>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={3}></Col>
          </Row>
        </Container>
      </WithoutSessionLayout>
    </>
  )
}

export default Signup
