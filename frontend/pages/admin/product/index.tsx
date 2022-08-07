import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap'
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
    const fetchResources = () => {
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
    fetchResources()
  }, [router.query.id, cookies._gybuilder_merchant_session])

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <Row>
            <Col lg={2}></Col>
            <Col lg={8}>
              <Card>
                <Card.Header>商品一覧</Card.Header>
                <ListGroup variant='flush'>
                    {products && products.map((p, i) => {
                      return (
                        <ListGroup.Item key={i}>
                          {p.name}
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
