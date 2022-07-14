import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { alertChanged } from 'redux/alertSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/inquiry`,
    {
      inquiry: {
        email: email,
        content: content
      }
    },
    {
      headers: {
        'Session-Id': cookies._gybuilder_merchant_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '登録しました', show: true}))
      router.push('/admin/dashboard')
    }).catch(error => {
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        <div className='text-center mt50 mb50'>
          <h2>お問い合わせ内容を入力してください</h2>
        </div>
        <Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              <Form>
                <Form.Group className='mb-3'>
                  <Form.Label>メールアドレス</Form.Label>
                  <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='name@example.com' />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>お問い合わせ内容</Form.Label>
                  <Form.Control
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    as='textarea'
                    rows={20} />
                </Form.Group>
              </Form>
              <div className='text-center'>
                <Button size='lg' onClick={onSubmit} disabled={!email || !content}>送信</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
