import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form } from 'react-bootstrap'
import CommonNavbar from 'components/templates/CommonNavbar'
import RegularFooter from 'components/organisms/RegularFooter'

const Index: NextPage = () => {
  return (
    <>
      <CommonNavbar></CommonNavbar>
      <Container className='mt30'>
        <div className='text-center mt50 mb50'>
          <h2>お客様情報の入力</h2>
        </div>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <Card>
              <Card.Header>お客様情報の入力</Card.Header>
              <Card.Body>
                <label className='mt10 mb10'>カスタマーアカウントをお持ちですか？ <a className='link-text'>ログインする</a></label>
                <label>回数券、月額課金、登録済みクレジットカードを使用する場合、ログインする必要があります</label>
                <Form.Label className='mt50'>お名前（姓）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>お名前（名）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>お名前カナ（姓）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>お名前カナ（名）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>メールアドレス</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>携帯電話番号</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>生年月日</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>姓別</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>電話番号</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>都道府県（漢字）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>都道府県（カナ）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>区市町村（漢字）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>区市町村（カナ）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>町名（丁目まで、漢字）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>町名（丁目まで、カナ）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>番地、号（漢字）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>番地、号（カナ）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>建物・部屋番号・その他 （漢字）</Form.Label>
                <Form.Control></Form.Control>
                <Form.Label className='mt10'>建物・部屋番号・その他 （カナ）</Form.Label>
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
