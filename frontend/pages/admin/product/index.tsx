import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { ProductParam } from 'interfaces/ProductParam'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import axios from 'axios'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()
  const [products, setProducts] = useState<ProductParam[]>([])

  useEffect(() => {
    const fetchProducts = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/products`, {
          headers: { 
            'Session-Id': cookies._gybuilder_merchant_session
          },
        }
      )
      .then(function (response) {
        const productResponse: ProductParam[] = response.data.products
        setProducts(productResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchProducts()
  }, [router.query.id, cookies._gybuilder_merchant_session])

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <Card>
                <Card.Header>商品一覧</Card.Header>
                <ListGroup variant='flush'>
                    {products && products.map((p, i) => {
                      return (
                        <ListGroup.Item key={i}>
                          <Row>
                            <Col>
                              <span>{p.name} <br/>￥{p.price} 税率{p.tax_rate}% <br/>在庫数: {p.inventory}</span>
                              <span></span>
                            </Col>
                            <Col>
                              <div className='mt30'>
                                <a className='btn btn-sm btn-primary' href={`/admin/product/${p.id}/edit`}>
                                  編集
                                </a>
                                <a className='btn btn-sm btn-primary ml10' href={`/product/${p.id}/purchase`}>
                                  購入ページプレビュー
                                </a>
                              </div>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )
                    })}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
