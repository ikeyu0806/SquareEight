import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()

  useEffect(() => {
    const fetchCustomerId = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/accounts/payment_methods`, {
          headers: { 
            'Session-Id': cookies._smartlesson_session
          },
        }
      )
      .then(function (response) {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchCustomerId()
  }, [router.query.id, cookies._smartlesson_session])

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <br />
      <Container>
        <Row>
          <Col lg={2} md={3}></Col>
          <Col lg={9} md={8}>
            <h2>決済方法</h2>
            <Card>
              <Card.Header>登録クレジットカード</Card.Header>
              <Card.Body>
                <Card.Text>
                  カードが登録されていません
                </Card.Text>
                <Button variant='primary'
                        onClick={() => router.push('/admin/payment_method/register')}>
                  カードを登録する
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Index
