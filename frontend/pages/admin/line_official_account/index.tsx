import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, ListGroup, Card, Button, Form, Alert } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { LineOfficialAccountParam } from 'interfaces/LineOfficialAccountParam'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [lineOfficialAccounts, setLineOfficialAccounts] = useState<LineOfficialAccountParam[]>([])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/line_official_accounts`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setLineOfficialAccounts(response.data.line_official_accounts)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <a className='btn btn-primary' href='/admin/line_official_account/new'>LINE公式アカウントを登録する</a>
            <div>公式アカウント一覧</div>
            <ListGroup>
              {lineOfficialAccounts.map((account, i) => {
                return (
                  <ListGroup.Item key={i}>{account.messaging_api_webhook_url}</ListGroup.Item>
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
