import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form } from 'react-bootstrap'
import CommonNavbar from 'components/templates/CommonNavbar'
import RegularFooter from 'components/organisms/RegularFooter'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const router = useRouter()

  const onClickLoginLink= () => {
    localStorage.setItem('endUserOnLoginRedirectPath', `/reserve/${router.query.reserve_frame_id}/input_customer_info`)
    router.push('/customer/login')
  }

  const onClickSignupLink = () => {
    localStorage.setItem('endUserOnLoginRedirectPath', `/reserve/${router.query.reserve_frame_id}/input_customer_info`)
    router.push('/customer/signup')
  }


  const onClickNextLink = () => {
    localStorage.removeItem('endUserOnLoginRedirectPath')
    router.push(`reserve/${router.query.reserve_frame_id}/payment_method`)
  }

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
                <label className='mt10'>カスタマーアカウントをお持ちですか？ <a className='link-text' onClick={onClickLoginLink}>ログインする</a></label>
                <br/>
                <label className='mt10 mb10'>新規作成は<a className='link-text' onClick={onClickSignupLink}>こちら</a></label>
                <br/>
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
                <div>
                  <a className='btn btn-primary mt30' onClick={onClickNextLink}>次へ</a>
                </div>
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
