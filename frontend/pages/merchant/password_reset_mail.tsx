import React, { useState } from 'react'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { NextPage } from 'next'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import axios from 'axios'

const PasswordResetMail: NextPage = () => {
  const [email, setEmail] = useState('')

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/merchant/send_reset_password_email`,
    {
      merchant_user: {
        email: email
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '予約しました',
        icon: 'info'
      })
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '予約失敗しました',
        icon: 'error'
      })
    })
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
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='メールアドレスを入力してください'></Form.Control>
                <div className='text-center'>
                  <Button
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

export default PasswordResetMail
