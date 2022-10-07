import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { OrderParam } from 'interfaces/OrderParam'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const router = useRouter()
  const [orders, setOrders] = useState<OrderParam[]>([])

  useEffect(() => {
    const fetchOrders = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/orders`, {
          headers: { 
            'Session-Id': cookies._square_eight_end_user_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        setOrders(response.data.orders)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchOrders()
  }, [router.query.id, cookies._square_eight_end_user_session])

  return (
    <EndUserLoginLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>注文一覧</Card.Header>
              <ListGroup>
                {orders && orders.map((order, i) => {
                  return (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col>
                          {order.product_names.map((name, i) => {
                            return (
                              <>
                                <div>{name}</div>
                                <div>合計金額: ¥{order.total_price}</div>
                                <div>注文日: {order.order_date}</div>
                                <a className='btn btn-primary btn-sm mt10' href={`/customer_page/order/${order.id}`}>
                                  詳細
                                </a>
                              </>
                            )
                          })}
                        </Col>
                        <Col>
                          {order.include_product && <>
                          <div>お届け先</div>
                          <div>{order.name}</div>
                          <div>{order.postal_code}</div>
                          <div>{order.address}</div></>}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </EndUserLoginLayout>
  )
}

export default Index
