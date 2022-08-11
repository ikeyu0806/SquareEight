import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { OrderParam } from 'interfaces/OrderParam'
import { OrderItemParam } from 'interfaces/OrderItemParam'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const router = useRouter()
  const [order, setOrder] = useState<OrderParam>()
  const [orderItems, setOrderItems] = useState<OrderItemParam[]>([])

  useEffect(() => {
    const fetchOrders = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/orders/${router.query.id}`, {
          headers: { 
            'Session-Id': cookies._gybuilder_end_user_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        setOrder(response.data.order)
        setOrderItems(response.data.order_items)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchOrders()
  }, [router.query.id, cookies._gybuilder_end_user_session])

  return (
    <EndUserLoginLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>注文詳細</Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    合計金額: ¥{order && order.total_price}
                    <br />注文日: {order && order.order_date}
                  </Col>
                  <Col>
                  {orderItems && orderItems.map((item, i) => {
                    return (
                      <span key={i}>
                        購入先: {item.business_name}<br/>
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
    </EndUserLoginLayout>
  )
}

export default Index
