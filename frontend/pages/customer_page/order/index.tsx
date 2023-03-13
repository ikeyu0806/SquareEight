import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { useRouter } from 'next/router'
import { OrderParam } from 'interfaces/OrderParam'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'

const Index: NextPage = () => {
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
  }, [router.query.public_id, cookies._square_eight_end_user_session])

  return (
    <EndUserLoginLayout>
      <Container className='mt20'>
        <h4>注文一覧</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>商品・サービス名</th>
              <th>合計金額</th>
              <th>注文日</th>
              <th>お届け先</th>
              <th>詳細</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 &&
            orders.map((order, i) => {
              return (
                <tr key={i}>
                  <td>
                    {order.product_names.map((p, i) => {
                      return(
                        <div key={i + '_product_name'}>{p}</div>
                      )
                    })}
                  </td>
                  <td>¥{order.total_price}</td>
                  <td>{order.order_date}</td>
                  <td>
                    <div>{order.name}</div>
                    <div>{order.postal_code}</div>
                    <div>{order.address}</div>
                  </td>
                  <td>
                    <a className='btn btn-primary btn-sm mt10' href={`/customer_page/order/${order.public_id}`}>
                      詳細
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {orders && orders.length === 0 &&
        <div className='text-center font-size-25'>注文履歴がありません</div>}
      </Container>
    </EndUserLoginLayout>
  )
}

export default Index
