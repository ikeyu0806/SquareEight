import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Card, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import { CustomerParam } from 'interfaces/CustomerParam'
import axios from 'axios'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [customers, setCustomers] = useState<CustomerParam[]>([])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/account/customers`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setCustomers(response.data.customers)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session])

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <Button className='mb20'>顧客新規登録</Button>
              <Card>
                <Card.Header>顧客一覧</Card.Header>
                {customers && customers.map((customer, i) => {
                  return (
                    <ListGroup.Item key={i}>
                      <div>お名前: {customer.last_name}{customer.first_name}</div>
                      <br></br>
                      <div>メールアドレス: {customer.email}</div>
                      <div>携帯電話番号: {customer.phone_number}</div>
                    </ListGroup.Item>
                  )
                })}
              </Card>
            </Col>
          </Row>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
