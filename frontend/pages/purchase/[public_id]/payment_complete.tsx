import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { OrderParam } from 'interfaces/OrderParam'
import { OrderItemParam } from 'interfaces/OrderItemParam'
import { useRouter } from 'next/router'
import axios from 'axios'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import { useCookies } from 'react-cookie'

const PaymentComplete: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const dispatch = useDispatch()
  const router = useRouter()
  const [order, setOrder] = useState<OrderParam>()
  const [orderItems, setOrderItems] = useState<OrderItemParam[]>([])
  const [totalPrice, setTotalPrice] = useState()

  useEffect(() => {
    const fetchOrderItems = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/orders/${router.query.public_id}/order_items`,
        {
          headers: {
            'Session-Id': cookies._square_eight_end_user_session
          }
        }
      )
      .then(function (response) {
        setOrder(response.data.order)
        setOrderItems(response.data.order_items)
        setTotalPrice(response.data.total_price)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchOrderItems()
  }, [router.query.public_id, router.query.public_id, dispatch, cookies._square_eight_end_user_session])

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
                        {item.item_type === 'Product'
                         ? <div>{item.product_name}{item.product_type_name && <>&emsp;{item.product_type_name}</>}&emsp;¥{item.price * item.quantity}<br/></div>
                         : <div>{item.product_name}{item.product_type_name && <>&emsp;{item.product_type_name}</>}&emsp;¥{item.price}<br/></div>}
                        {order && order?.delivery_charge > 0 && <div>配送料: ¥{order?.delivery_charge}</div>}
                        {item.delivery_date_text && <div>配送日時: {item.delivery_date_text}</div>}
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
