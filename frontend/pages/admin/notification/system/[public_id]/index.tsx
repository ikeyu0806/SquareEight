import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Notification } from 'interfaces/Notification'
import { useRouter } from 'next/router'
import { urlRegex } from 'constants/urlRegex'
import parse from 'html-react-parser'

const Index: NextPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchNotification = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/system_account_notifications/${router.query.public_id}`, {
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
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <br />
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>{title}</Card.Header>
              <Card.Body>
              <div className='apply_new_line'>
                {parse(
                    content.replace(urlRegex, '<a href="$1">$1</a>')
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
