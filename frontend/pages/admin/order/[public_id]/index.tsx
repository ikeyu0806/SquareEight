import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { OrderParam } from 'interfaces/OrderParam'
import { OrderItemParam } from 'interfaces/OrderItemParam'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [order, setOrder] = useState<OrderParam>()
  const [orderItems, setOrderItems] = useState<OrderItemParam[]>([])

  useEffect(() => {
    const fetchOrders = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/account/orders/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
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
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <br />
      <Container>
        <Table bordered>
          <thead>
            <tr>
              <th>商品名</th>
              <th>金額</th>
              <th>注文日</th>
              <th>購入先</th>
              <th>配送日時指定</th>
            </tr>
          </thead>
          <tbody>
            {orderItems && orderItems.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.product_name}</td>
                <td>¥{item.price}</td>
                <td>{order && order.order_date}</td>
                <td>{item.business_name}</td>
                <td>{item.delivery_date_text}</td>
              </tr>
            )
            })}
          </tbody>
        </Table>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
