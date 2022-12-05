import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { OrderParam } from 'interfaces/OrderParam'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [orders, setOrders] = useState<OrderParam[]>([])
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
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchOrders()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      {allowReadCustomer === 'Allow' && <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <h3>注文一覧</h3>
            <ListGroup>
              {orders && orders.map((order, i) => {
                return (
                  <ListGroup.Item key={i}>
                    <Row>
                      <Col>
                        {order.product_names.map((name, i) => {
                          return (
                            <>
                              <span>{name}</span>
                              <br />合計金額: ¥{order.total_price}
                              <br />注文日: {order.order_date}
                              <br />
                              <a className='btn btn-primary btn-sm mt10' href={`/admin/order/${order.id}`}>
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
          </Col>
        </Row>
      </Container>}
      {allowReadCustomer === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Index
