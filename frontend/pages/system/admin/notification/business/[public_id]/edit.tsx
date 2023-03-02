import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import SystemAdminLayoutTemplate from 'components/templates/SystemAdminLayoutTemplate'
import { Container, Form, FormControl, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { alertChanged } from 'redux/alertSlice'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [cookies] = useCookies(['_square_eight_system_admin_user_session'])

  useEffect(() => {
    const fetchTicketNotification = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/system_account_notifications/${router.query.public_id}`, {
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
  }, [router.query.public_id, cookies._square_eight_system_admin_user_session, router.query.website_id])

  const createNotification = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/system_account_notifications/${router.query.public_id}`,
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

  const execDelete = () => {
    swalWithBootstrapButtons.fire({
      title: '削除します',
      html: `削除します。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/system_account_notifications/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_system_admin_user_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '削除しました',
            icon: 'info'
          })
          router.push('/system/admin/notification/business')
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '削除失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  return (
    <SystemAdminLayoutTemplate>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <h3 className='mt30'>ビジネスユーザ向けお知らせ編集</h3>
            <Row>
              <Col sm={8}>
              </Col>
              <Col>
                <Button variant='danger' size='sm' onClick={() => execDelete()}>お知らせを削除</Button>
              </Col>
            </Row>
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
