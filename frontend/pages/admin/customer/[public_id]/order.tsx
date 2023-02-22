import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Row, Col, ListGroup, Table } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { OrderParam } from 'interfaces/OrderParam'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import { CustomerParam } from 'interfaces/CustomerParam'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [orders, setOrders] = useState<OrderParam[]>([])
  const [customer, setCustomer] = useState<CustomerParam>()
  const allowReadCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowReadCustomer)

  useEffect(() => {
    const fetchOrders = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/account/customers/${router.query.public_id}/orders`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        setOrders(response.data.orders)
        setCustomer(response.data.customer)
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
      {allowReadCustomer === 'Allow' &&
      <Container>
        <h4>{customer?.last_name}{customer?.first_name} 注文一覧</h4>
        <Table bordered>
        <thead>
          <tr>
            <th>商品名</th>
            <th>合計金額</th>
            <th>注文日</th>
            <th>お届け先</th>
            <th>詳細</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((order, i) => {
            return (
              <tr key={i}>
                <td>{order.product_names.map((p, i) => {
                  return (
                    <div key={i}>{p}</div>
                  )
                })}</td>
                <td>￥{order.total_price}</td>
                <td>{order.order_date}</td>
                <td>
                  {order.include_product && <>
                  <div>{order.name}</div>
                  <div>{order.postal_code}</div>
                  <div>{order.address}</div></>}
                </td>
                <td>
                  <a className='btn btn-primary btn-sm mt10' href={`/admin/order/${order.public_id}`}>
                    詳細
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
        </Table>
      </Container>}
      {allowReadCustomer === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Index
