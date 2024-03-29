import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import { Container, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { urlRegex } from 'constants/urlRegex'
import parse from 'html-react-parser'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchNotification = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/system_end_user_notifications/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_end_user_session
          },
        }
      )
      .then( (response) => {
        setTitle(response.data.system_end_user_notification.title)
        setContent(response.data.system_end_user_notification.content)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchNotification()
  }, [router.query.public_id, cookies._square_eight_end_user_session])

  return (
    <EndUserLoginLayout>
      <Container className='mt20'>
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
    </EndUserLoginLayout>
  )
}

export default Index
