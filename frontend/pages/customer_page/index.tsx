
import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import { Notification } from 'interfaces/Notification'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [systemNotifications, setSystemNotifications] = useState<Notification[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchCustomerPageContent = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/end_users/customer_toppage_info`, {
          headers: { 
            'Session-Id': cookies._square_eight_end_user_session
          }
        }
      )
      .then(function (response) {
        console.log(response)
        setSystemNotifications(response.data.system_notifications)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchCustomerPageContent()
  }, [cookies._square_eight_end_user_session])


  return (
    <EndUserLoginLayout>
      <Container>
        <Row>
          <Col>
            <ListGroup.Item as='li' active>
                通知一覧
              </ListGroup.Item>
          </Col>
          <Col>
            <ListGroup as='ul'>
              <ListGroup.Item as='li' active>
                運営からのお知らせ
              </ListGroup.Item>
              {systemNotifications.map((n, i) => {
                return (
                  <ListGroup.Item as='li' key={i} onClick={() => router.push(`/customer_page/notification/${n.id}/`)}>
                    {n.title}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </EndUserLoginLayout>
  )
}

export default Index
