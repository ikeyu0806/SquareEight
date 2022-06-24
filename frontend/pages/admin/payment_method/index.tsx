import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { StripePaymentMethodsParam } from 'interfaces/StripePaymentMethodsParam'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()
  const [paymentMethods, setPaymentMethods] = useState<StripePaymentMethodsParam[]>()

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
        const paymentMethodsResponse: StripePaymentMethodsParam[] = response.data.payment_methods
        setPaymentMethods(paymentMethodsResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchCustomerId()
  }, [router.query.id, cookies._smartlesson_session])

  return (
    <>
    {console.log(paymentMethods, " {paymentMethods}")}
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
                  {
                   !paymentMethods?.length && <>カードが登録されていません</>
                  }
                  {paymentMethods?.length && paymentMethods?.map((pay, i) => {
                    return (
                      <span key={i}>
                        <div>{pay.card.brand}（************{pay.card.last4} / 有効期限 {pay.card.exp_month}/2{pay.card.exp_year}）</div>
                      </span>
                    )
                  })}
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
