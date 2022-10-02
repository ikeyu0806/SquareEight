import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'

const Index: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <h3>配送日時設定</h3>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )  
}

export default Index
