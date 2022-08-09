import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { CartItemParam } from 'interfaces/CartItemsParam'

const Index: NextPage = () => {
  const router = useRouter()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const [cartItems, setCartItems] = useState<CartItemParam[]>()
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const fetchProduct = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/carts/account_index`, {
          headers: {
            'Session-Id': cookies._gybuilder_end_user_session
          }
        }
      )
      .then(function (response) {
        setCartItems(response.data.cart_items)
        setTotalPrice(response.data.total_price)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchProduct()
  }, [cookies._gybuilder_end_user_session])

  return (
    <EndUserLoginLayout>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <Card>
              <Card.Header>カート{totalPrice}</Card.Header>
              <Card.Body>
                <ListGroup variant='flush'>
                  {cartItems && cartItems?.map((item, i) => {
                    {
                      switch (item.product_type) {
                        case 'Product':
                          return(
                            <>
                              <ListGroup.Item key={i}>
                                <Row>
                                  {item.s3_object_public_url && <Col><img
                                      className='d-block w-100 mt30'
                                      src={item.s3_object_public_url}
                                      alt='image'/></Col>}
                                  <Col>
                                    {item.business_name}<br/>
                                    {item.product_name}<br />
                                    ￥{item.price} 税率{item.tax_rate}%
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            </>)
                        case 'TicketMaster':
                          return (
                            <>
                              <ListGroup.Item key={i}>
                                <Row>
                                  {item.s3_object_public_url && <Col><img
                                      className='d-block w-100'
                                      src={item.s3_object_public_url}
                                      alt='image'/></Col>}
                                  <Col>
                                    {item.business_name}<br/>
                                    {item.product_name} 有効期限: {item.is_expired === false ? `${item.effective_month}ヶ月` : '有効期限なし'} <br />
                                    ￥{item.price}
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            </>
                          )
                          case 'MonthlyPaymentPlan':
                            return (
                              <>
                                <ListGroup.Item key={i}>
                                  <Row>
                                    {item.s3_object_public_url && <Col><img
                                        className='d-block w-100'
                                        src={item.s3_object_public_url}
                                        alt='image'/></Col>}
                                    <Col>
                                      {item.business_name}<br/>
                                      {item.product_name}<br />
                                      ￥{item.price}
                                    </Col>
                                  </Row>
                                </ListGroup.Item>
                              </>
                            )
                        default:
                          return (<></>)
                      }
                    }
                  })}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </EndUserLoginLayout>
  )
}

export default Index
