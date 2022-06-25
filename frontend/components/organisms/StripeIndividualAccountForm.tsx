import { Container, Row, Col, Form } from 'react-bootstrap'

const StripeIndividualAccountForm = (): JSX.Element => {
  return (
    <>
      <Form.Label className='mt10'>事業主様の姓（漢字）</Form.Label>
      <Form.Control></Form.Control>
      <Form.Label className='mt10'>事業主様の姓（カナ）</Form.Label>
      <Form.Control></Form.Control>
      <Form.Label className='mt10'>事業主様のお名前（漢字）</Form.Label>
      <Form.Control></Form.Control>
      <Form.Label className='mt10'>事業主様のお名前（カナ）</Form.Label>
      <Form.Control></Form.Control>
      <Form.Label className='mt10'>郵便番号</Form.Label>
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
      <Form.Label className='mt10'>事業責任者の生年月日</Form.Label>
      <Form.Control type='date'></Form.Control>
      <Form.Label className='mt10'>事業責任者の姓別</Form.Label>
      <Form.Select>
        <option value='man'>男</option>
        <option value='woman'>女</option>
      </Form.Select>
      <Form.Label className='mt10'>事業責任者の電話番号</Form.Label>
      <Form.Control></Form.Control>
    </>
  )
}

export default StripeIndividualAccountForm
