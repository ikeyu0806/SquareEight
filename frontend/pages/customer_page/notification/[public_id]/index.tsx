import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import { Container, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchNotification = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/end_user_notifications/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_end_user_session
          },
        }
      )
      .then( (response) => {
        setTitle(response.data.end_user_notification.title)
        setContent(response.data.end_user_notification.content)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchNotification()
  }, [router.query.public_id, cookies._square_eight_end_user_session, router.query.website_id])

  return (
    <EndUserLoginLayout>
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
    </EndUserLoginLayout>
  )
}

export default Index
