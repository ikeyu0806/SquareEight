import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import type { NextPage } from 'next'
import MerchantPaymentMethodIndex from 'components/templates/MerchantPaymentMethodIndex'
import { Container, Row, Col } from 'react-bootstrap'

const Index: NextPage = () => {
  return (
    <>
      <MerchantUserAdminLayout>
      <br />
        <Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={8}>
              <h2>決済方法</h2>
              <MerchantPaymentMethodIndex></MerchantPaymentMethodIndex>
            </Col>
          </Row>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
