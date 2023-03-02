import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import SystemAdminLayoutTemplate from 'components/templates/SystemAdminLayoutTemplate'
import { Container, Table, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { AccountParam } from 'interfaces/AccountParam'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_system_admin_user_session'])
  const [account, setAccount] = useState<AccountParam>()
  const router = useRouter()

  useEffect(() => {
    const fetchAccounts = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/system/accounts/${router.query.public_id}`,
        { headers: {
            'Session-Id': cookies._square_eight_system_admin_user_session
          }
        }
      )
      .then(function (response) {
        console.log(response.data)
        setAccount(response.data.account)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchAccounts()
  }, [cookies._square_eight_system_admin_user_session, router])

  return (
    <SystemAdminLayoutTemplate>
      <br />
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <h4>アカウント詳細</h4>
            <hr />
            <Row>
              <Col>public_id</Col>
              <Col><div>{account?.public_id}</div></Col>
            </Row>
            <hr />
            <Row>
              <Col>business_name</Col>
              <Col><div>{account?.business_name}</div></Col>
            </Row>
            <hr />
            <Row>
              <Col>service_plan</Col>
              <Col><div>{account?.service_plan}</div></Col>
            </Row>
            <hr />
            <Row>
              <Col>stripe_account_id</Col>
              <Col><div>{account?.stripe_account_id}</div></Col>
            </Row>
            <hr />
            <Row>
              <Col>stripe_subscription_id</Col>
              <Col><div>{account?.stripe_subscription_id}</div></Col>
            </Row>
            <hr />
          </Col>
        </Row>
      </Container>
    </SystemAdminLayoutTemplate>
  )
}

export default Index
