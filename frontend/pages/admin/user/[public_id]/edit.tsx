import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { emailRegex } from 'constants/emailRegex'
import { passwordRegex } from 'constants/passwordRegex'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch } from 'react-redux'

const Edit: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const dispatch = useDispatch()
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastNameKana, setLastNameKana] = useState('')
  const [firstNameKana, setFirstNameKana] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEnabledEmailLogin, setIsEnabledEmailLogin] = useState(false)

  useEffect(() => {
    const fetchMerchantUser = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/merchant_users/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        setLastName(response.data.merchant_user.last_name)
        setFirstName(response.data.merchant_user.first_name)
        setLastNameKana(response.data.merchant_user.last_name_kana)
        setFirstNameKana(response.data.merchant_user.first_name_kana)
        setEmail(response.data.merchant_user.email)
        setIsEnabledEmailLogin(response.data.merchant_user.is_enabled_email_login)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchMerchantUser()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/merchant_users/${router.query.public_id}/update`,
    {
      merchant_user: {
        last_name: lastName,
        first_name: firstName,
        last_name_kana: lastNameKana,
        first_name_kana: firstNameKana,
        email: email,
        password: password
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      router.push('/admin/user')
      dispatch(alertChanged({message: '更新しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  const validateOnSubmit = () => {
    if (!email) {
      return true
    }
    if (!email.match(emailRegex)) {
      return true
    }
    if (password) {
      if (!password.match(passwordRegex)) {
        return true
      }
      return false
    }
    return false
  }

  return (
    <MerchantUserAdminLayout>
      <Container className='mt30'>
        <Row>
          <Col md={2} lg={3}></Col>
          <Col md={8} lg={6}>
            <Form.Label>名前（性）</Form.Label>
            <Form.Control
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}></Form.Control>
            <Form.Label className='mt10'>名前（名）</Form.Label>
            <Form.Control
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}></Form.Control>
            <Form.Label className='mt10'>名前カナ（性）</Form.Label>
            <Form.Control
              onChange={(e) => setLastNameKana(e.target.value)}
              value={lastNameKana}></Form.Control>
            <Form.Label className='mt10'>名前カナ（名）</Form.Label>
            <Form.Control
              onChange={(e) => setFirstNameKana(e.target.value)}
              value={firstNameKana}></Form.Control>
              <Form.Label className='mt10'>メールアドレス(変更した場合本人確認メールが送られます)</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}></Form.Control>
              <Form.Label className='mt10'>パスワード(変更する場合は入力してください)</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}></Form.Control>
            <div className='mt30 text-center'>
              <Button
                disabled={validateOnSubmit()}
                onClick={onSubmit}>更新する</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Edit
