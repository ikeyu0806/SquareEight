import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'
import { loginStatusChanged } from 'redux/currentMerchantUserSlice'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import GoogleAuthButton from 'components/atoms/GoogleAuthButton'
import { MERCHANT_GOOGLE_AUTH_URL } from 'constants/socialLogin'
import { emailRegex } from 'constants/emailRegex'
import { passwordRegex } from 'constants/passwordRegex'

const Signup: NextPage = () => {
  const merchantUserLoginStatus = useSelector((state: RootState) => state.currentMerchantUser.loginStatus)
  const dispatch = useDispatch()
  const router = useRouter()
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [cookies] = useCookies(['_square_eight_merchant_session'])

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
    if (email && email.match(emailRegex) === null) {
      dispatch(alertChanged({message: 'メールアドレスの形式に誤りがあります', show: true, type: 'danger'}))
      return
    }

    if (password && password.match(passwordRegex) === null) {
      dispatch(alertChanged({message: 'パスワードの形式に誤りがあります', show: true, type: 'danger'}))
      return
    }

    axios.post(
      `${process.env.BACKEND_URL}/api/internal/merchant_users/invite_root_user`,
      {
        merchant_user: {
          email: email,
          password: password,
          password_confirmation: confirmPassword,
          business_name: businessName,
          is_create_account: true
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

  return (
    <>
      <WithoutSessionLayout>
        <Container>
          <Row>
            <Col lg={4} md={3}></Col>
            <Col>
              <Card>
                <Card.Header>ユーザ登録</Card.Header>
                <Card.Body>
                  <Form onSubmit={onSubmit}>
                    <Form.Group className='mb-3' controlId='formEmail'>
                        <Form.Label>ビジネス名称</Form.Label>
                        <Form.Control type='text'
                                      placeholder='必須。企業名、店舗名、教室名など' 
                                      onChange={(e) => setBusinessName(e.target.value)}/>
                        <Form.Text className='text-muted'></Form.Text>
                      </Form.Group>
                    <Form.Group className='mb-3' controlId='formEmail'>
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
                      <Button variant='primary'
                              type='submit'
                              disabled={!businessName || !email || !password || (password !== confirmPassword)}
                              onClick={onSubmit}>
                        登録する
                      </Button>
                    </div>
                  </Form>
                  <hr />
                  <GoogleAuthButton
                    buttonText='Googleでサインアップ'
                    buttonHref={MERCHANT_GOOGLE_AUTH_URL}></GoogleAuthButton>
                </Card.Body>
              </Card>
              <div className='text-center mt20'>
                <a href='/merchant/login'>ログインはこちら</a>
              </div>
            </Col>
            <Col lg={4} md={3}></Col>
          </Row>
        </Container>
      </WithoutSessionLayout>
    </>
  )
}

export default Signup
