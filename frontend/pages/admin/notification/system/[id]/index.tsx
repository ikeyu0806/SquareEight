import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Notification } from 'interfaces/Notification'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchNotification = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/system_account_notifications/${router.query.id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then( (response) => {
        setTitle(response.data.system_account_notification.title)
        setContent(response.data.system_account_notification.content)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchNotification()
  }, [router.query.id, cookies._square_eight_merchant_session, router.query.website_id])

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>{title}</Card.Header>
              <Card.Body>{content}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
