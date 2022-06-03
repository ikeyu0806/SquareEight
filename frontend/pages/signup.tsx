import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'
import IntroductionNavbar from '../components/atoms/IntroductionNavbar'

const Signup: NextPage = () => {
  return (
    <>
      <IntroductionNavbar />
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Card>
              <Card.Header>ユーザ登録</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className='mb-3' controlId='formEmail'>
                      <Form.Label>ビジネス名称</Form.Label>
                      <Form.Control type='text' placeholder='企業名、店舗名、教室名など' />
                      <Form.Text className='text-muted'></Form.Text>
                    </Form.Group>
                  <Form.Group className='mb-3' controlId='formEmail'>
                    <Form.Label>メールアドレス</Form.Label>
                    <Form.Control type='email' placeholder='必須' />
                    <Form.Text className='text-muted'></Form.Text>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formPassword'>
                    <Form.Label>パスワード</Form.Label>
                    <Form.Control type='password' placeholder='必須' />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formPassword'>
                    <Form.Label>パスワード(確認)</Form.Label>
                    <Form.Control type='password' />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                    <Form.Check type='checkbox' label='プライバシーポリシーに同意しました' />
                  </Form.Group>
                  <div className='text-center'>
                    <Button variant='primary' type='submit' href='/introduction/services'>
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

export default Signup
