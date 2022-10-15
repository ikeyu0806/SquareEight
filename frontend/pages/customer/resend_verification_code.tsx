import type { NextPage } from 'next'
import React, { useState } from 'react'
import axios from 'axios'
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { alertChanged } from '../../redux/alertSlice'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const ResendVerificationCode: NextPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const resendVerificationCode = () => {
    axios.post(
      `${process.env.BACKEND_URL}/api/internal/end_users/resend_verification_code`,
      {
        end_user: {
          email: email,
        }
      }).then(response => {
        swalWithBootstrapButtons.fire({
          title: '検証コードを再送信しました',
          icon: 'info'
        })
      }).catch(error => {
        console.log(error)
        swalWithBootstrapButtons.fire({
          title: '送信失敗しました',
          text: error.response.data.error,
          icon: 'error'
        })
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
                  <Card.Header>検証コードの再送</Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group className='mb-3' controlId='formEmail'>
                        <Form.Label>メールアドレスを入力してください</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className='text-muted'></Form.Text>
                      </Form.Group>
                      <div className='text-center'>
                        <Button onClick={resendVerificationCode}>
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
      </WithoutSessionLayout>
    </>
  )
}

export default ResendVerificationCode
