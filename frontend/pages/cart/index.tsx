import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { CartItemParam } from 'interfaces/CartItemsParam'
import PrefecturesChargeModal from 'components/templates/PrefecturesChargeModal'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const Index: NextPage = () => {
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [cartItems, setCartItems] = useState<CartItemParam[]>()
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const fetchProduct = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/carts/account_index`, {
          headers: {
            'Session-Id': cookies._square_eight_end_user_session
          }
        }
      )
      .then(function (response) {
        console.log(response.data)
        setCartItems(response.data.cart_items)
        setTotalPrice(response.data.total_price)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchProduct()
  }, [cookies._square_eight_end_user_session])

  const deleteCartItem = (publicId: string, itemType: string) => {
    axios.delete(`${process.env.BACKEND_URL}/api/internal/carts/delete_cart_item/${publicId}?item_type=${itemType}`,
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then(response => {
      location.reload()
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '削除失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <EndUserLoginLayout>
      <Container>
        <Row>
          <Col lg={2} md={1}></Col>
          <Col lg={5} md={6}>
            <Card>
              <Card.Header>カート</Card.Header>
              <Card.Body>
                <ListGroup variant='flush'>
                  {cartItems && cartItems?.map((item, i) => {
                    {
                      switch (item.item_type) {
                        case 'Product':
                          return(
                            <ListGroup.Item key={i}>
                              <Row>
                                {item.s3_object_public_url && <Col><img
                                    className='d-block w-100 mt30'
                                    src={item.s3_object_public_url}
                                    alt='image'/></Col>}
                                <Col>
                                  {item.business_name}<br/>
                                  {item.product_name} {item.product_type_name}<br />
                                  {item.show_type && <>{item.selected_type_name}<br/></>}
                                  数量: {item.quantity}<br />
                                  ￥{item.price} 税率{item.tax_rate}%
                                  {item.delivery_charge_type === 'noSetting'
                                  && <div className='mt10'>配送料無料</div>}
                                  {['flatRate', 'perPrefectures'].includes(item.delivery_charge_type)
                                  && <div className='mt10'>配送料: ￥{item.delivery_charge}</div>}
                                </Col>
                                <Col>
                                  <Button
                                    onClick={() => deleteCartItem(item.public_id, item.item_type)}
                                    size='sm'
                                    variant='danger'>
                                    カートから削除
                                  </Button>
                                </Col>
                              </Row>
                            </ListGroup.Item>)
                        case 'TicketMaster':
                          return (
                            <ListGroup.Item key={i}>
                              <Row>
                                {item.s3_object_public_url && <Col><img
                                    className='d-block w-100'
                                    src={item.s3_object_public_url}
                                    alt='image'/></Col>}
                                <Col>
                                  {item.business_name}<br/>
                                  {item.product_name} 有効期限: {item.is_expired === false ? `${item.effective_month}ヶ月` : '有効期限なし'} <br />
                                  数量: {item.quantity}<br />
                                  ￥{item.price}
                                </Col>
                                <Col>
                                  <Button
                                    onClick={() => deleteCartItem(item.public_id, item.item_type)}
                                    size='sm'
                                    variant='danger'>
                                    カートから削除
                                  </Button>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          )
                          case 'MonthlyPaymentPlan':
                            return (
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
                                  <Col>
                                    <Button
                                      onClick={() => deleteCartItem(item.public_id, item.item_type)}
                                      size='sm'
                                      variant='danger'>
                                      カートから削除
                                    </Button>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            )
                        default:
                          return (<></>)
                      }
                    }
                  })}
                </ListGroup>
                {<div>{cartItems?.length === 0}</div>}
                {cartItems?.length === 0 && <div>カートに商品が入っていません</div>}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2} md={5}>
            <Card>
              <Card.Body>
                {cartItems && <><div>小計</div>
                <h5>¥{totalPrice}</h5>
                <br /></>}
                {cartItems?.length !== 0 && <a href='/cash_register'
                   className='btn btn-primary'>レジに進む</a>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <PrefecturesChargeModal></PrefecturesChargeModal>
    </EndUserLoginLayout>
  )
}

export default Index
