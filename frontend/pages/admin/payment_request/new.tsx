import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const New: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <h3>決済リクエスト作成</h3>
            <Form.Label>対象顧客</Form.Label>
            <Form.Check
              type='radio'
              label='登録済みの顧客に送信'
              name='targetCustomerCheck'
              id='registeredCustomer'></Form.Check>
            <Form.Check
              type='radio'
              label='顧客グループに送信'
              name='targetCustomerCheck'
              id='targetCustomerCustomer'></Form.Check>
            <Form.Check
              type='radio'
              label='未登録の顧客に送信'
              name='targetCustomerCheck'
              id='newCustomer'></Form.Check>
            <hr />
            <Form.Label>金額</Form.Label>
            <Form.Control type='number'></Form.Control>
            <div className='text-center mt20'>
              <Button>確定して送信する</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default New
