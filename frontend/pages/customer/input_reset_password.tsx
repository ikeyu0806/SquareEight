import React, { useState } from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import { useRouter } from 'next/router'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { passwordRegex } from 'constants/passwordRegex'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

const InputResetPassword: NextPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/end_users/update_password`,
    {
      end_user: {
        email: email,
        password: password,
        key: router.query.key
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: 'パスワードを変更しました',
        icon: 'info'
      })
    }).catch(error => {
      console.log(error)
      swalWithBootstrapButtons.fire({
        title: '変更失敗しました',
        text: error.response.data.error,
        icon: 'error'
      })
    })
  }

  const validateOnSubmit = () => {
    if (password === null) {
      return true
    }
    if (password !== confirmPassword) {
      return true
    }
    if (!String(password).match(passwordRegex)) {
      return true
    }
    return false
  }

  return (
    <WithoutSessionLayout>
      <Container>
        <Row>
          <Col lg={4} md={3}></Col>
            <Col>
              <Card>
                <Card.Header>パスワードリセット</Card.Header>
                <Card.Body>
                <Form.Control
                    className='mt10'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='メールアドレスを入力してください'></Form.Control>
                  <Form.Control
                    className='mt20'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='パスワードを入力してください'></Form.Control>
                  <Form.Control
                    className='mt20'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='確認パスワードを入力してください'></Form.Control>
                  <div className='text-center'>
                    <Button
                      disabled={validateOnSubmit()}
                      className='mt20'
                      onClick={() => onSubmit()}>送信する</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={3}></Col>
        </Row>
      </Container>
    </WithoutSessionLayout>
  )
}

export default InputResetPassword
