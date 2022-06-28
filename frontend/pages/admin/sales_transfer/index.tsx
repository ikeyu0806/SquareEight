import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Card } from 'react-bootstrap'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()

  useEffect(() => {
    const fetchWebpage = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/accounts/stripe_connected_account`, {
          headers: { 
            'Session-Id': cookies._smartlesson_session
          },
        }
      )
      .then(function (response) {
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchWebpage()
  }, [router.query.id, cookies._smartlesson_session, router.query.webpage_id, dispatch])

  return (
    <>
      <AdminNavbar></AdminNavbar>
        <Container>
          <Row>
            <Col>
              <Card className='mt20'>
                <Card.Header>事業情報</Card.Header>
                <Card.Body>
                  <br/>
                  <br/>
                  <Button onClick={() => router.push('/admin/sales_transfer/register_business_info')}>事業情報登録</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className='mt20'>
                <Card.Header>振込先口座情報</Card.Header>
                <Card.Body>           
                  <br/>
                  <br/>
                  <Button onClick={() => router.push('/admin/sales_transfer/register_bank_account')}>振込先口座登録</Button>
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
