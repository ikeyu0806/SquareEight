import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'
import { Button, Container, Card, Row, Col, Form } from 'react-bootstrap'

const Register: NextPage = () => {
  return (
    <>
      <IntroductionNavbar />
      <div className='text-center mt50 mb50'>
       <h2>クレジットカードを登録してください</h2>
        <span className='mt10'>有料プランへの申し込み、クレジットカード決済、月額課金、回数券発行を使用する場合は必須となります</span>
      </div>
      <Container></Container>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Card>
              <Card.Header>クレジットカード登録</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className='mb-3' controlId='formEmail'>
                    <Form.Label>カード番号</Form.Label>
                    <Form.Control type='card_number' placeholder='カード番号' />
                    <Form.Text className='text-muted'></Form.Text>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formPassword'>
                    <Form.Label>有効期限</Form.Label>
                    <Form.Control type='password' placeholder='有効期限' />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formPassword'>
                    <Form.Label>CVC番号</Form.Label>
                    <Form.Control type='password' placeholder='CVC番号' />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formPassword'>
                    <Form.Label>名前</Form.Label>
                    <Form.Control type='password' placeholder='CVC番号' />
                  </Form.Group>
                  <div className='text-center'>
                    <Button variant='primary' type='submit' href='/introduction/services'>
                      登録する
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

export default Register
