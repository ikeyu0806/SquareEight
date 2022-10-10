import { NextPage } from 'next'
import { Container, Row, Col } from 'react-bootstrap'
import StripePersonForm from 'components/molecules/StripePersonForm'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
const RegisterStripePerson: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3} md={1}></Col>
          <Col lg={6} md={10}>
            <StripePersonForm></StripePersonForm>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default RegisterStripePerson
