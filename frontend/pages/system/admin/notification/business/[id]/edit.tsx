import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import SystemAdminLayoutTemplate from 'components/templates/SystemAdminLayoutTemplate'
import { Container, Form, FormControl, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { alertChanged } from 'redux/alertSlice'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [cookies] = useCookies(['_square_eight_system_admin_user_session'])

  useEffect(() => {
    const fetchTicketNotification = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/system_account_notifications/${router.query.id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_system_admin_user_session
          },
        }
      )
      .then( (response) => {
        console.log(response.data, "!!")
        setTitle(response.data.system_account_notification.title)
        setContent(response.data.system_account_notification.content)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchTicketNotification()
  }, [router.query.id, cookies._square_eight_system_admin_user_session, router.query.website_id])

  const createNotification = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/system_account_notifications/${router.query.id}`,
    {
      notification: {
        title: title,
        content: content
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_system_admin_user_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '登録しました', show: true}))
      router.push('/system/admin/notification/business/')
    }).catch(error => {
    })
  }

  return (
    <SystemAdminLayoutTemplate>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <h3 className='mt30'>ビジネスユーザ向けお知らせ編集</h3>
            <Form.Group className='mb-3'>
              <Form.Label>タイトル</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)}
                            value={title} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='mt10'>内容</Form.Label>
              <FormControl
                value={content}
                onChange={(e) => setContent(e.target.value)}
                as='textarea'
                rows={20} />
            </Form.Group>
            <div className='text-center'>
              <Button onClick={() => createNotification()}>送信</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </SystemAdminLayoutTemplate>
  )
}

export default New
