import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { ProductParam } from 'interfaces/ProductParam'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Unauauthorized from 'components/templates/Unauauthorized'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [products, setProducts] = useState<ProductParam[]>([])
  const allowReadProduct = useSelector((state: RootState) => state.merchantUserPermission.allowReadProduct)
  const allowCreateProduct = useSelector((state: RootState) => state.merchantUserPermission.allowCreateProduct)
  const allowUpdateProduct = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateProduct)

  useEffect(() => {
    const fetchProducts = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/products`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
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
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  return (
    <>
      <MerchantUserAdminLayout>
        {allowReadProduct === 'Allow' && <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              {allowCreateProduct === 'Allow' && <a className='btn btn-primary mt10 mb10'
                 href='/admin/product/new'>物販商品登録</a>}
              <Card>
                <Card.Header>物販商品一覧</Card.Header>
                <ListGroup variant='flush'>
                  {products && products.map((p, i) => {
                    return (
                      <ListGroup.Item key={i}>
                        <Row>
                          <Col>
                            <span>{p.name}
                            <PublishStatusBadge publishStatus={p.publish_status} />
                            <br/>￥{p.price} 税率{p.tax_rate}% </span>
                            {!p.show_product_type_form && <span><br/>在庫数: {p.inventory}</span>}
                            {p.show_product_type_form &&
                            <><br/>
                              {p.product_types.map((type, i) => {
                                return (
                                  <span key={i}>{type.name} 在庫数: {type.inventory}<br/></span>
                                )
                              })}  
                            </>}

                          </Col>
                          <Col>
                            <div className='mt30'>
                            {allowUpdateProduct === 'Allow' && <a className='btn btn-sm btn-primary' href={`/admin/product/${p.public_id}/edit`}>
                                編集
                              </a>}
                              <a className='btn btn-sm btn-primary ml10'
                                 href={`/product/${p.public_id}/purchase`}
                                 target='_blank' rel='noreferrer'>
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
        </Container>}
        {allowReadProduct === 'Forbid' && <Unauauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
