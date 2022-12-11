import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, ListGroup, Card, Button, Form, Alert } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch } from 'react-redux'

const New = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const dispatch = useDispatch()

  const [channelId, setChannelId] = useState('')
  const [channelSecret, setChannelSecret] = useState('')
  const [channelToken, setChannelToken] = useState('')

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/line_official_accounts/register_message_api_channel`,
    {
      line_official_account: {
        channel_id: channelId,
        channel_secret: channelSecret,
        channel_token: channelToken
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      router.push('/admin/line_official_account')
      dispatch(alertChanged({message: '登録しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
        <Col lg={3}></Col>
          <Col lg={6}>
            <div>LINE公式アカウントのChannel情報を登録してください</div>
            <div className='mt20'>Channel ID</div>
            <Form.Control onChange={(e) => setChannelId(e.target.value)}></Form.Control>
            <div>Channel secret</div>
            <Form.Control onChange={(e) => setChannelSecret(e.target.value)}></Form.Control>
            <div>Channel token</div>
            <Form.Control as='textarea' rows={4} onChange={(e) => setChannelToken(e.target.value)}></Form.Control>
            <Button className='mt20' onClick={onSubmit}>登録する</Button>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default New