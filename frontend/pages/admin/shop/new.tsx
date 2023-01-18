import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Button } from 'react-bootstrap'
import CreateShop from 'components/templates/CreateShop'

const New: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              <CreateShop />
              <Button className='mt20'>登録する</Button>
            </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default New
