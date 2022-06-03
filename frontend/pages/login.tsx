import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'
import IntroductionNavbar from '../components/atoms/IntroductionNavbar'

const Login: NextPage = () => {
  return (
    <>
      <IntroductionNavbar />
      <Container>
        <Row>
          <Col></Col>
            <Col>
              <Card>
                <Card.Header>ログイン</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className='mb-3' controlId='formEmail'>
                      <Form.Label>メールアドレス</Form.Label>
                      <Form.Control type='email' placeholder='メールアドレス' />
                      <Form.Text className='text-muted'></Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formPassword'>
                      <Form.Label>パスワード</Form.Label>
                      <Form.Control type='password' placeholder='パスワード' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                      <Form.Check type='checkbox' label='プライバシーポリシーに同意しました' />
                    </Form.Group>
                    <div className='text-center'>
                      <Button variant='primary' type='submit' href='/admin/dashboard'>
                        送信
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  )
}

export default Login
