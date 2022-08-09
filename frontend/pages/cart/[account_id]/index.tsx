import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const Index: NextPage = () => {
  const router = useRouter()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])

  useEffect(() => {
    const fetchProduct = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/carts/${router.query.account_id}/account_index`, {
          headers: {
            'Session-Id': cookies._gybuilder_end_user_session
          }
        }
      )
      .then(function (response) {
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchProduct()
  }, [cookies._gybuilder_end_user_session, router.query.account_id])

  return (
    <MerchantCustomLayout>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <Card>
              <Card.Header>カート</Card.Header>
              <Card.Body>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MerchantCustomLayout>
  )
}

export default Index
