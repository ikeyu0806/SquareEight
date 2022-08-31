import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Notification } from 'interfaces/Notification'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()

  useEffect(() => {
    const fetchDashboardContent = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/account_notifications`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        }
      )
      .then(function (response) {
        console.log(response)
        setNotifications(response.data.account_notifications)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchDashboardContent()
  }, [cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <ListGroup as='ul'>
              <ListGroup.Item as='li' active>
                お知らせ
              </ListGroup.Item>
              {notifications.map((n, i) => {
                return (
                  <ListGroup.Item as='li' key={i} onClick={() => router.push(`/admin/notification/account/${n.id}/`)}>
                    {n.title}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
