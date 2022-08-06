import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import SystemAdminLayoutTemplate from 'components/templates/SystemAdminLayoutTemplate'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Notification } from 'interfaces/Notification'

const Index: NextPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [cookies] = useCookies(['_gybuilder_system_admin_user_session'])

  useEffect(() => {
    const fetchNotifications = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/end_user_notifications`,
        { headers: {
            'Session-Id': cookies._gybuilder_system_admin_user_session
          }
        }
      )
      .then(function (response) {
        setNotifications(response.data.end_user_notifications)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchNotifications()
  }, [cookies._gybuilder_system_admin_user_session])

  return (
    <SystemAdminLayoutTemplate>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <h3 className='mt30 mb20'>カスタマーユーザ向けお知らせ一覧</h3>
            <ListGroup as="ul">
              {notifications && notifications.map((notification, i) => {
                return(
                  <ListGroup.Item key={i} as='li'>{notification.title}</ListGroup.Item>
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
