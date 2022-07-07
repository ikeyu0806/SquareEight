import { Container, Row, Col, Form } from 'react-bootstrap'

const InputCustomerInfo = (): JSX.Element => {
  return (
    <>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <Form.Label>姓</Form.Label>
            <Form.Label>名</Form.Label>
            <Form.Label>メールアドレス</Form.Label>
            <Form.Label>電話番号</Form.Label>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default InputCustomerInfo
