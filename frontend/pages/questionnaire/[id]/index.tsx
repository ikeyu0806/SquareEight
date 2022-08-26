import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import type { NextPage } from 'next'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

const Index: NextPage = () => {
  return (
    <MerchantCustomLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
            </Card>
          </Col>
          </Row>
      </Container>
    </MerchantCustomLayout>
  )
}

export default Index
