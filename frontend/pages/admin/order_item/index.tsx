import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { OrderItemParam } from 'interfaces/OrderItemParam'
import axios from 'axios'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [orderItems, setOrderItems] = useState<OrderItemParam[]>([])

  useEffect(() => {
    const fetchOrderItems = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/order_items`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        setOrderItems(response.data.order_items)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchOrderItems()
  }, [router.query.id, cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>注文管理</Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    {orderItems && orderItems.map((item, i) => {
                      return (
                        <span key={i}>
                          購入者 {item.order_name}<br/>
                          {item.product_name} ￥{item.price}
                        </span>
                      )
                    })}
                  </Col>
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
