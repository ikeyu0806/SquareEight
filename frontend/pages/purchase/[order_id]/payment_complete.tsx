import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { OrderItemParam } from 'interfaces/OrderItemParam'
import { useRouter } from 'next/router'
import axios from 'axios'
import { loginStatusChanged, paymentMethodsChanged, defaultPaymentMethodIdChanged } from 'redux/currentEndUserSlice'
import { useCookies } from 'react-cookie'

const PaymentComplete: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const dispatch = useDispatch()
  const router = useRouter()
  const [orderItems, setOrderItems] = useState<OrderItemParam[]>([])
  const [totalPrice, setTotalPrice] = useState()
  const [totalCommission, setTotalCommission] = useState()
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_users/payment_methods`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then((res) => {
      dispatch(defaultPaymentMethodIdChanged(res.data.default_payment_method_id))
      dispatch(paymentMethodsChanged(res.data.payment_methods))
      dispatch(loginStatusChanged('Login'))

    }).catch((e) => {
      dispatch(loginStatusChanged('Logout'))
      console.log(e)
    })
  }, [dispatch, cookies._gybuilder_end_user_session, currentEndUserLogintStatus])

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
      <MerchantCustomLayout>
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

                  <a className='btn btn-primary mt20' href='/customer_page'>
                    マイページ
                  </a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </MerchantCustomLayout>
    </>
  )
}

export default PaymentComplete
