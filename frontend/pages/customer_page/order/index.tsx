import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'
import { OrderParam } from 'interfaces/OrderParam'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const router = useRouter()
  const [orders, setOrders] = useState<OrderParam[]>([])

  useEffect(() => {
    const fetchOrders = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/orders`, {
          headers: { 
            'Session-Id': cookies._gybuilder_end_user_session
          },
        }
      )
      .then(function (response) {
        setOrders(response.data.orders)
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
              <Card.Header>注文一覧</Card.Header>
              {orders && orders.map((order, i) => {
                return (
                  <ListGroup.Item key={i}>
                    <Row>
                      <Col>
                        ¥{order.total_price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              })}
            </Card>
          </Col>
        </Row>
      </Container>
    </EndUserLoginLayout>
  )
}

export default Index
