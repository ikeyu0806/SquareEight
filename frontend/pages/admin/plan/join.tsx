import { NextPage } from 'next'
import React, { useState } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import MerchantPaymentMethodIndex from 'components/templates/MerchantPaymentMethodIndex'
import { useRouter } from 'next/router'

const Join: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col md={7}>
            <MerchantPaymentMethodIndex></MerchantPaymentMethodIndex>
          </Col>
          <Col md={5}>
            <Card>
              <Card.Body>
                <h2>
                  {router.query.plan === 'light' && <>ライトプラン</>}
                  {router.query.plan === 'standard' && <>スタンダードプラン</>}
                  {router.query.plan === 'premium' && <>プラミアムプラン</>}
                </h2>
                <h3>
                  ご請求額: １ヶ月 ￥
                  {router.query.plan === 'light' && 980}
                  {router.query.plan === 'standard' && 1980}
                  {router.query.plan === 'premium' && 4980}
                  </h3>
                <Button className='mt10'>
                  {isLoading && <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>}
                  注文を確定
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Join
