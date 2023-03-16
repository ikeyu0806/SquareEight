import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Alert } from 'react-bootstrap'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { loginStatusChanged } from 'redux/currentMerchantUserSlice'
import { RootState } from 'redux/store'
import { useCookies } from 'react-cookie'
import Router from 'next/router'
import GoogleAuthButton from 'components/atoms/GoogleAuthButton'
import { END_USER_GOOGLE_AUTH_URL } from 'constants/socialLogin'
import { emailRegex } from 'constants/emailRegex'
import { passwordRegex } from 'constants/passwordRegex'
import BrandColorButton from 'components/atoms/BrandColorButton'
import { brandGreenRgb } from 'constants/brandColors'
import AuthStyles from 'styles/Auth.module.css'

const Signup: NextPage = () => {
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const dispatch = useDispatch()
  const [alertText, setAlertText] = useState('')
  const [email, setEmail] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
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

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (email && email.match(emailRegex) === null) {
      setAlertText(`${email}に検証コードを送信しました。確認して登録を完了してください`)
      return
    }

    if (password && password.match(passwordRegex) === null) {
      setAlertText(`登録失敗しました。既に登録済みのメールアドレスは使用できません。`)
      return
    }
  
    axios.post(
      `${process.env.BACKEND_URL}/api/internal/end_users`,
      {
        end_user: {
          last_name: lastName,
          first_name: firstName,
          email: email,
          password: password,
          password_confirmation: confirmPassword
        }
      }
    )
    .then(response => {
      setAlertText(`${email}に検証コードを送信しました。確認して登録を完了してください`)
    })
    .catch(error => {
      setAlertText(`登録失敗しました。既に登録済みのメールアドレスは使用できません。`)
      console.log({error})
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
                  <div className={AuthStyles.auth_screen_header_text}>SquareEightID新規登録</div>
                </div>
                <Card className='mt30 mb30'>
                  <Card.Body>
                    <Form onSubmit={onSubmit}>
                      <Form.Group className='mb-3'>
                        <Form.Label>お名前（姓）</Form.Label>
                        <Form.Control type='text'
                                      placeholder='必須'
                                      onChange={(e) => setLastName(e.target.value)}/>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>お名前（名）</Form.Label>
                        <Form.Control type='text'
                                      placeholder='必須'
                                      onChange={(e) => setFirstName(e.target.value)}/>
                      </Form.Group>
                      <Form.Group className='mb-3'>
                        <Form.Label>メールアドレス</Form.Label>
                        <Form.Control type='email'
                                      placeholder='必須'
                                      onChange={(e) => setEmail(e.target.value)}/>
                        <Form.Text className='text-muted'></Form.Text>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='formPassword'>
                        <Form.Label>パスワード</Form.Label>
                        <div>半角英小文字大文字数字を1種類以上含めて8文字以上で設定してください</div>
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
                        <BrandColorButton
                          buttonText='登録する'
                          disabled={!lastName || !firstName || !email || !password || (password !== confirmPassword)}
                          onClick={onSubmit}/>
                      </div>
                      {alertText && <Alert className='mt10'>{alertText}</Alert>}
                    </Form>
                    <hr />
                    <GoogleAuthButton
                      buttonText='Googleでサインアップ'
                      buttonHref={END_USER_GOOGLE_AUTH_URL}
                      isEndUserSignUp={true}></GoogleAuthButton>
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

export default Signup
