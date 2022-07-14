import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form } from 'react-bootstrap'
import RegularFooter from 'components/organisms/RegularFooter'

const Index: NextPage = () => {
  return (
    <>
      <Container>
        <div className='text-center mt50 mb50'>
          <h2>お客様情報の入力</h2>
        </div>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <Card>
              <Card.Header>お客様情報の入力</Card.Header>
              <Card.Body>
                <label className='mt10 mb10'>カスタマーアカウントをお持ちですか？ <a className='btn btn-info btn-sm'>ログインする</a></label>
                <label>購入済みの月謝や回数券、または登録済みのクレジットカードを使用する場合、ログインする必要があります</label>
                <Form.Label className='mt50'>お名前（姓）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label>お名前（名）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label>メールアドレス</Form.Label>
                <Form.Control></Form.Control>
                <a className='btn btn-primary mt30'>次へ</a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Index
