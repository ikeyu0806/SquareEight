import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const Index: NextPage = () => {
  const router = useRouter()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const fetchProduct = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/cash_register/`, {
          headers: {
            'Session-Id': cookies._gybuilder_end_user_session
          }
        }
      )
      .then(function (response) {
        setTotalPrice(response.data.total_price)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchProduct()
  }, [cookies._gybuilder_end_user_session])

  return (
    <EndUserLoginLayout>
      <Container>
        <Row>
          <Col lg={2} md={1}></Col>
          <Col lg={5} md={6}>
            <Card>
              <Card.Header>レジ</Card.Header>
              </Card>
          </Col>
          <Col lg={2} md={5}>
            <Card>
              <Card.Body></Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </EndUserLoginLayout>
  )
}

export default Index
