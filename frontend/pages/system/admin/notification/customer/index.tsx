import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import SystemAdminLayoutTemplate from 'components/templates/SystemAdminLayoutTemplate'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Notification } from 'interfaces/Notification'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [cookies] = useCookies(['_square_eight_system_admin_user_session'])
  const router = useRouter()

  useEffect(() => {
    const fetchNotifications = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/system_end_user_notifications`,
        { headers: {
            'Session-Id': cookies._square_eight_system_admin_user_session
          }
        }
      )
      .then(function (response) {
        setNotifications(response.data.system_end_user_notifications)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchNotifications()
  }, [cookies._square_eight_system_admin_user_session])

  return (
    <SystemAdminLayoutTemplate>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <h3 className='mt30 mb20'>カスタマーユーザ向けお知らせ一覧</h3>
            <ListGroup>
              {notifications && notifications.map((notification, i) => {
                return(
                  <ListGroup.Item key={i} as='li' onClick={() => router.push(`/system/admin/notification/customer/${notification.public_id}/edit`)}>
                    {notification.title}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </SystemAdminLayoutTemplate>
  )
}

export default Index
