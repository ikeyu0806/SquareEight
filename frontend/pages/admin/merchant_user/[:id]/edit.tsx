import { NextPage } from 'next'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'

const Edit: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container className='mt30'>
        <Row>
          <Col md={2} lg={3}></Col>
          <Col md={8} lg={6}>
            <Form.Label>名前（性）</Form.Label>
            <Form.Control></Form.Control>
            <Form.Label className='mt10'>名前（名）</Form.Label>
            <Form.Control></Form.Control>
            <Form.Label className='mt10'>メールアドレス</Form.Label>
            <Form.Control></Form.Control>
            <Form.Label className='mt10'>電話番号</Form.Label>
            <Form.Control></Form.Control>
            <div className='mt30 text-center'>
              <Button>更新する</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Edit
