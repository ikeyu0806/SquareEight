import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useRouter } from 'next/router'
import RequireBadge from 'components/atoms/RequireBadge'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const InquiryTemplate = (): JSX.Element => {
  const [organization, setOrganization] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [content, setContent] = useState('')
  const [inquiryType, setInquiryType] = useState('機能について')
  const router = useRouter()

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/inquiry`, {
      inquiry: {
        email: email,
        content: content
      }
    }).then(response => {
      router.push('/inquiry/confirm')
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '送信失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <>
      <div className='bg-gray'>
        <br />
        <div className='text-center mb50'>
          <h2>お気軽にお問い合わせください</h2>
        </div>
        <Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              <Form>
                <Form.Label>所属会社・組織名<RequireBadge /></Form.Label>
                <Form.Control
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)} />
                <Form.Label className='mt20'>返信先メールアドレス<RequireBadge /></Form.Label>
                <Form.Control
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='name@example.com' />
                <Form.Label className='mt20'>電話番号<RequireBadge /></Form.Label>
                <Form.Control
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder='日中繋がりやすいお電話番号' />
                <Form.Label className='mt20'>お問い合わせ種別<RequireBadge /></Form.Label>
                <Form.Select onChange={(e) => setInquiryType(e.target.value)}>
                  <option>機能について</option>
                  <option>ご要望</option>
                  <option>エンタープライズプランの見積もり依頼</option>
                  <option>その他のお問い合わせ</option>
                </Form.Select>
                <Form.Label className='mt20'>お問い合わせ内容<RequireBadge /></Form.Label>
                <Form.Control
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  as='textarea'
                  rows={20} />
              </Form>
              <div className='text-center mt10'>
                <Button size='lg' onClick={onSubmit} disabled={!email || !content}>送信する</Button>
              </div>
              <br />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default InquiryTemplate
