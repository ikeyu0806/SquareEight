import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import ProductPurchaseLayout from 'components/templates/ProductPurchaseLayout'
import { useDispatch } from 'react-redux'
import { OrderItemParam } from 'interfaces/OrderItemParam'
import { useRouter } from 'next/router'
import axios from 'axios'

const PaymentComplete: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [orderItems, setOrderItems] = useState<OrderItemParam[]>([])
  const [totalPrice, setTotalPrice] = useState()
  const [totalCommission, setTotalCommission] = useState()

  useEffect(() => {
    const fetchOrderItems = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/orders/${router.query.order_id}/order_items`, {
        }
      )
      .then(function (response) {
        setOrderItems(response.data.order_items)
        setTotalPrice(response.data.total_price)
        setTotalCommission(response.data.total_commission)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchOrderItems()
  }, [router.query.id, router.query.order_id, dispatch])

  return (
    <>
      <ProductPurchaseLayout>
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
                        {item.product_name}&emsp;¥{item.price}
                      </span>
                    )
                  })}
                  <div className='mt30'>合計金額: ¥{totalPrice}</div>
                  <div>内システム手数料: ¥{totalCommission}</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </ProductPurchaseLayout>
    </>
  )
}

export default PaymentComplete
