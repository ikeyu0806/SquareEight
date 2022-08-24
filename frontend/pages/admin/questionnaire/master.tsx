import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import PlusCircleIcon from 'components/atoms/PlusCircleIcon'
import { Card, Row, Col, Navbar, Container, Form } from 'react-bootstrap'

const Master: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Header>アンケート作成</Card.Header>
              <Card.Body>
                <Form.Label>フォーム種別を選択してください</Form.Label>
                <Form.Check type='radio' label='テキスト'></Form.Check>
                <Form.Check type='radio' label='選択フォーム'></Form.Check>
                <Form.Check type='radio' label='チェックボックス'></Form.Check>
                <Form.Check type='radio' label='ラジオボタン'></Form.Check>
                <Form.Label
                  className='mt20'>
                  質問を入力してください
                </Form.Label>
                <Form.Control
                  placeholder='例) 年齢 ご要望 商品の感想'></Form.Control>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Master
