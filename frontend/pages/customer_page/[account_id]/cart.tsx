import type { NextPage } from 'next'
import { Container, Row, Col, Card } from 'react-bootstrap'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'

const Cart: NextPage = () => {
  return (
    <MerchantCustomLayout>
      <Container>
        <Row>
        <Col lg={3} md={3}></Col>
        <Col lg={6}>
          <Card.Header></Card.Header>
          <Card.Body>
            
          </Card.Body>
        </Col>
        </Row>
      </Container>
    </MerchantCustomLayout>
  )
}

export default Cart
