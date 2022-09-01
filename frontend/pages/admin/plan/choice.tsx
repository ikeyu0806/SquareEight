import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'

const Choice: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <h3>プラン一覧</h3>
            <Button className='mt30'>退会はこちら</Button>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Choice
