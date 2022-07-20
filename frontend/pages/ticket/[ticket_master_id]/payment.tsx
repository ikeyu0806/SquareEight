import type { NextPage } from 'next'
import { Container, Row, Col, Card } from 'react-bootstrap'
import CommonNavbar from 'components/organisms/CommonNavbar'

const Payment: NextPage = () => {
  return (
    <>
      <CommonNavbar></CommonNavbar>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <Card>
              <Card.Header>回数券購入</Card.Header>
              <Card.Body>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Payment
