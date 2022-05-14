import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'
import { Button, Container, Card, Row, Col, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
const Register: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <IntroductionNavbar />
      <div className='text-center mt50 mb50'>
       <h2>クレジットカードを登録してください</h2>
        <span className='mt10'>予約ページの支払いにクレジットカード決済、月額課金、回数券を使用する場合は必須となります</span>
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
                    <Form.Control type='password' placeholder='名前' />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <br />
        <Row>
          <Col></Col>
          <Col>
            <Button variant='outline-primary' size='lg' onClick={() => router.back()}>戻る</Button>
          </Col>
          <Col></Col>
          <Col sm={2}>
            <Button variant='primary' size='lg' href='/introduction/set_reserve_calendar'>登録して次へ</Button>
          </Col>
          <Col></Col>
          <Col>
            <Button variant='outline-primary' size='lg' href='/introduction/set_reserve_calendar'>スキップ</Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <br />
    </>
  )
}

export default Register
