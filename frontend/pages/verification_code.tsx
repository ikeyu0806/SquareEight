import type { NextPage } from 'next'
import React, { useState } from 'react'
import axios from 'axios'
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import IntroductionNavbar from '../components/atoms/IntroductionNavbar'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const VerificationCode: NextPage = () => {
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies(['_smartlesson_session'])

  const onSubmit = () => {
    axios.post(
      `${process.env.BACKEND_URL}/api/internal/users/confirm_verification_code`,
      {
        user: {
          email: router.query.email,
          verification_code: verificationCode
        }
      }
    )
    .then(response => {
      console.log(response.data.messsages)
      setCookie('_smartlesson_session', response.data.session_id.public_id, { path: '/'})
      router.push('/introduction/services?status=verify_code')
    })
    .catch(error => {
      console.log(error.response.data.error)
      setAlertMessage(error.response.data.error)
    })
  }

  return (
    <>
      {alertMessage != '' && <Alert variant="danger" onClose={() => setAlertMessage('')} dismissible>{alertMessage}</Alert>}
      <IntroductionNavbar></IntroductionNavbar>
      <Container>
        <Row>
          <Col></Col>
            <Col>
              <Card>
                <Card.Header>検証コードを入力してください</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className='mb-3' controlId='formEmail'>
                      <Form.Label>検証コード</Form.Label>
                      <Form.Control onChange={(e) => setVerificationCode(e.target.value)} />
                      <Form.Text className='text-muted'></Form.Text>
                    </Form.Group>
                    <div className='text-center'>
                      <Button variant='primary' onClick={onSubmit}>
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

export default VerificationCode
