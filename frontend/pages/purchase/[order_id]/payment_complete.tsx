import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { OrderItemParam } from 'interfaces/OrderItemParam'
import { useRouter } from 'next/router'
import axios from 'axios'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import { useCookies } from 'react-cookie'

const PaymentComplete: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const dispatch = useDispatch()
  const router = useRouter()
  const [orderItems, setOrderItems] = useState<OrderItemParam[]>([])
  const [totalPrice, setTotalPrice] = useState()

  useEffect(() => {
    const fetchOrderItems = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/orders/${router.query.order_id}/order_items`,
        {
          headers: {
            'Session-Id': cookies._square_eight_end_user_session
          }
        }
      )
      .then(function (response) {
        setOrderItems(response.data.order_items)
        setTotalPrice(response.data.total_price)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchOrderItems()
  }, [router.query.id, router.query.order_id, dispatch, cookies._square_eight_end_user_session])

  return (
    <>
      <EndUserLoginLayout>
        <Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              <Card>
                <Card.Header>購入完了しました</Card.Header>
                <Card.Body>
                  {orderItems.map((item, i) => {
                    return (
                      <span key={i}>
                        {item.type === 'Product'
                         ? <>{item.product_name}{item.type_name && <>&emsp;{item.type_name}</>}&emsp;¥{item.price * item.quantity}<br/></>
                         : <>{item.product_name}{item.type_name && <>&emsp;{item.type_name}</>}&emsp;¥{item.price}<br/></>}
                      </span>
                    )
                  })}
                  <div className='mt30'>合計金額: ¥{totalPrice}</div>

                  <a className='btn btn-primary mt20' href='/customer_page'>
                    マイページ
                  </a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </EndUserLoginLayout>
    </>
  )
}

export default PaymentComplete
