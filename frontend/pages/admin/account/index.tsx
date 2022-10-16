import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [businessName, setBusinessName] = useState('')
  useEffect(() => {
    const fetchAccountInfo = () => {
      axios.get(`${process.env.BACKEND_URL}/api/internal/accounts/account_info`,
      {
        headers: {
          'Session-Id': cookies._square_eight_merchant_session
        }
      }).then((response) => {
        console.log(response.data)
        setBusinessName(response.data.account.business_name)
      }).catch((e) => {
        console.log(e)
      })
    }
    fetchAccountInfo()
  }, [cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6}>
          <Card>
            <Card.Header>アカウント情報</Card.Header>
            <Card.Body>
              <Row>
                <Col>ビジネス名称</Col>
                <Col>{businessName}</Col>
              </Row>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
