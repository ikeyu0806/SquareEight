import type { NextPage } from 'next'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'

const Index: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <a className='btn btn-primary' href='/admin/user/invitation'>ユーザを招待する</a>
            <ListGroup></ListGroup>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
