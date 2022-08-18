import type { NextPage } from 'next'
import { Container, Button, Row, Col, Card, Alert } from 'react-bootstrap'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'

const PaymentMethod: NextPage = () => {
  return (
    <>
      <WithoutSessionLayout>
        <Container className='mt30'>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              <Card>
                <Card.Header>確認画面</Card.Header>
                <Card.Body></Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </WithoutSessionLayout>
    </>
  )
}
  
export default PaymentMethod
