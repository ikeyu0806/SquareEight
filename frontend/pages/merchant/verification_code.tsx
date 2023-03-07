import type { NextPage } from 'next'
import React, { useState } from 'react'
import axios from 'axios'
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { alertChanged } from 'redux/alertSlice'
import BrandColorButton from 'components/atoms/BrandColorButton'
import AuthStyles from 'styles/Auth.module.css'

const VerificationCode: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies(['_square_eight_merchant_session'])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    axios.post(
      `${process.env.BACKEND_URL}/api/internal/merchant_users/confirm_verification_code`,
      {
        merchant_user: {
          email: router.query.email,
          verification_code: verificationCode
        }
      }
    )
    .then(response => {
      console.log(response.data)
      setCookie('_square_eight_merchant_session', response.data.session_id.public_id, { path: '/'})
      router.push('/merchant/signup_complete')
    })
    .catch(error => {
      console.log(error)
      dispatch(alertChanged({message: '検証失敗しました', show: true, type: 'danger'}))
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
                    <div className={AuthStyles.auth_screen_header_text}>検証コードを入力してください</div>
                  </div>
                  <Card className='mt30 mb30'>
                    <Card.Body>
                      <Form onSubmit={onSubmit}>
                        <Form.Group className='mb-3' controlId='formEmail'>
                          <Form.Label>検証コード</Form.Label>
                          <Form.Control onChange={(e) => setVerificationCode(e.target.value)} />
                          <Form.Text className='text-muted'></Form.Text>
                        </Form.Group>
                        <div className='text-center'>
                          <BrandColorButton
                            buttonText='送信'
                            disabled={!verificationCode}
                            buttonType='submit'
                            onClick={onSubmit}
                          />
                        </div>
                      </Form>
                      <div className='text-center mt20'>
                    <a href='/merchant/resend_verification_code'>検証コードの再送</a>
                  </div>
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

export default VerificationCode
