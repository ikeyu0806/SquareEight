import React, { useState } from 'react'
import type { NextPage } from 'next'
import SystemAdminLayoutTemplate from 'components/templates/SystemAdminLayoutTemplate'
import { Container, Form, FormControl, Button } from 'react-bootstrap'
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
  const [cookies] = useCookies(['_gybuilder_system_admin_user_session'])

  const createNotification = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/ticket_masters`,
    {
      notification: {
        title: title,
        content: content
      }
    },
    {
      headers: {
        'Session-Id': cookies._gybuilder_system_admin_user_session
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
        <h3>ビジネスユーザ向けお知らせ作成</h3>
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
          <Button onClick={() => createNotification()}></Button>
        </div>
      </Container>
    </SystemAdminLayoutTemplate>
  )
}

export default New
