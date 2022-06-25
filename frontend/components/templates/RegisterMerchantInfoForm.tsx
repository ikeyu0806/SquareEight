import { Container, Row, Col, Form } from 'react-bootstrap'

const RegisterMerchantInfoForm = () => {
  return (
    <>
      <Container>
        <Row>
        <Col lg={4} md={3}></Col>
          <Col lg={4} md={5}>
          <Form.Label>事業形態</Form.Label>
          <Form.Select>
            <option value='individual'>個人事業主（副業も含む）</option>
            <option value='company'>法人（株式会社/合同会社/NPOなど）</option>
          </Form.Select>
          <h4 className='mt20 mb20'>事業所情報を入力してください</h4>
          <Form.Label className='mt10'>都道府県（漢字）</Form.Label>
          <Form.Control></Form.Control>
          <Form.Label className='mt10'>区市町村（漢字）</Form.Label>
          <Form.Control></Form.Control>
          <Form.Label className='mt10'>町名(丁目まで、漢字)</Form.Label>
          <Form.Control></Form.Control>
          <Form.Label className='mt10'>番地、号（漢字）</Form.Label>
          <Form.Control></Form.Control>
          <Form.Label className='mt10'>建物・部屋番号・その他 (任意、漢字)</Form.Label>
          <Form.Control></Form.Control>
          <Form.Label className='mt10'>事業責任者の生年月日</Form.Label>
          <Form.Control></Form.Control>
          <Form.Label className='mt10'>事業責任者の姓別</Form.Label>
          <Form.Control></Form.Control>
          <Form.Label className='mt10'>事業責任者の電話番号</Form.Label>
          <Form.Control></Form.Control>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  )
}


export default RegisterMerchantInfoForm
