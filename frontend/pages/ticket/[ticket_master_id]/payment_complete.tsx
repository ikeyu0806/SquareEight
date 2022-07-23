import type { NextPage } from 'next'
import { Container, Row, Col } from 'react-bootstrap'
import ProductPurchaseLayout from 'components/templates/ProductPurchaseLayout'

const PaymentComplete: NextPage = () => {
  return (
    <>
      <ProductPurchaseLayout>
        <Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              <div>購入完了しました</div>
            </Col>
          </Row>
        </Container>
      </ProductPurchaseLayout>
    </>
  )
}

export default PaymentComplete
