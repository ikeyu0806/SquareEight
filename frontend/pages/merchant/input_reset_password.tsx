import React, { useState } from 'react'
import { NextPage } from 'next'
import { passwordRegex } from 'constants/passwordRegex'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

const InputResetPassword: NextPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const onSubmit = () => {

  }

  const validateOnSubmit = () => {
    if (password !== null) {
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
                <Card.Header>パスワードリセットメールを送信</Card.Header>
                <Card.Body>
                  <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='パスワードを入力してください'></Form.Control>
                  <Form.Control
                    className='mt10'
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
