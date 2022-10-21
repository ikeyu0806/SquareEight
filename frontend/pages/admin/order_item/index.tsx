import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { OrderItemParam } from 'interfaces/OrderItemParam'
import axios from 'axios'
import OrderItemTypeBadge from 'components/atoms/OrderItemTypeBadge'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [orderItems, setOrderItems] = useState<OrderItemParam[]>([])

  useEffect(() => {
    const fetchOrderItems = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/order_items`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        setOrderItems(response.data.order_items)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchOrderItems()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  const updateShippedStatus = (itemId: string) => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/order_items/${itemId}/update_shipped`,
    {
      order_item: {
        item_id: itemId,
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '更新しました',
        icon: 'info'
      })
      location.reload()
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '更新失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <h4>注文管理</h4>
            <Row>
              <Col>
                <ListGroup>
                  {orderItems && orderItems.map((item, i) => {
                    return (
                      <ListGroup.Item key={i}>
                        <Row>
                          <Col>
                            購入者 {item.order_name}<br/>
                            {item.product_name} <OrderItemTypeBadge itemType={item.item_type}/><br/>
                            ￥{item.price}<br/>
                            購入数 {item.quantity}
                            {item.delivery_date_text && <div>配送日時: {item.delivery_date_text}</div>}
                          </Col>
                          <Col>
                            {item.item_type === 'Product'
                            &&
                            <>
                              <div className='mt10'>郵送先</div>
                              <div>〒{item.postal_code}</div>
                              <div>{item.address}</div>
                              {!item.shipped &&
                              <>
                                <span className='badge bg-danger'>
                                  未発送
                                </span>
                                <a className='badge bg-primary ml10'
                                  onClick={() => updateShippedStatus(item.public_id)}>
                                  発送済みに更新する
                                </a>
                              </>}
                              {item.shipped &&
                              <span className='badge bg-info'>
                                発送済み
                              </span>}
                            </>}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  })}
                </ListGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
