import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProductPurchaseLayout from 'components/templates/ProductPurchaseLayout'
import { useDispatch } from 'react-redux'
import { OrderItemParam } from 'interfaces/OrderItemParam'
import { useRouter } from 'next/router'
import axios from 'axios'

const PaymentComplete: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [orderItems, setOrderItems] = useState<OrderItemParam[]>([])

  useEffect(() => {
    const fetchOrderItems = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/orders/${router.query.order_id}/order_items`, {
        }
      )
      .then(function (response) {
        setOrderItems(response.data.order_items)
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
              <>
              <div>購入完了しました</div>
              {orderItems.map((item, i) => {
                return (
                  <span key={i}>
                    {item.product_name}
                  </span>
                )
              })}
              </>
            </Col>
          </Row>
        </Container>
      </ProductPurchaseLayout>
    </>
  )
}

export default PaymentComplete
