import type { NextPage } from 'next'
import React, { useState } from 'react'
import axios from 'axios'
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import IntroductionNavbar from '../../components/templates/IntroductionNavbar'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { alertChanged } from '../../redux/alertSlice'

const UpdateEmailVerificationCode: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies(['_gybuilder_merchant_session'])

  const onSubmit = () => {
    axios.post(
      `${process.env.BACKEND_URL}/api/internal/merchant_users/confirm_update_email_verification_code`,
      {
        merchant_user: {
          email: router.query.email,
          verification_code: verificationCode
        }
      }
    )
    .then(response => {
      console.log(response.data.messsages)
      setCookie('_gybuilder_merchant_session', response.data.session_id.public_id, { path: '/'})
      router.push('/admin/login_user_info')
    })
    .catch(error => {
      dispatch(alertChanged({message: error.response.data.error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <IntroductionNavbar></IntroductionNavbar>
      <Container>
        <Row>
          <Col lg={4} md={3}></Col>
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
          <Col lg={4} md={3}></Col>
        </Row>
      </Container>
    </>
  )
}

export default UpdateEmailVerificationCode
