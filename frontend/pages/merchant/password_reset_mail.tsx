import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { NextPage } from 'next'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import axios from 'axios'

const onSubmit = () => {
  axios.post(`${process.env.BACKEND_URL}/api/internal/merchant/sessions`,
  {
    merchant_user: {
    }
  }).then(response => {
  }).catch(error => {
  })
}

const PasswordResetMail: NextPage = () => {
  return (
    <WithoutSessionLayout>
    <Container>
      <Row>
        <Col lg={4} md={3}></Col>
          <Col>
            <Card>
              <Card.Header>パスワードリセットメールを送信</Card.Header>
              <Card.Body>
                <Form.Control
                  placeholder='メールアドレスを入力してください'></Form.Control>
                <div className='text-center'>
                  <Button className=' mt20' onClick={() => onSubmit()}>送信する</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={3}></Col>
        </Row>
      </Container>
    </WithoutSessionLayout>
  )
}

export default PasswordResetMail
