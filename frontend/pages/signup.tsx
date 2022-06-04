import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import IntroductionNavbar from '../components/atoms/IntroductionNavbar'
import axios from 'axios'

const Signup: NextPage = () => {
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  const onSubmit = () => {
    axios.post(
      `${process.env.BACKEND_URL}/api/internal/users`,
      {
        user: {
          email: email,
          password: password,
          password_confirmation: confirmPassword
        }
      }
    )
    .then(response => {
      setAlertMessage(`${email}に検証コードを送信しました。確認して登録を完了してください`)
    })
    .catch(error => {
      console.log({error})
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <>
      {alertMessage != '' && <Alert variant='success' onClose={() => setAlertMessage('')} dismissible>{alertMessage}</Alert>}
      <IntroductionNavbar />
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Card>
              <Card.Header>ユーザ登録</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='formEmail'>
                      <Form.Label>ビジネス名称</Form.Label>
                      <Form.Control type='text'
                                    placeholder='企業名、店舗名、教室名など' 
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
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  )
}

export default Signup
