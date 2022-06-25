import React, { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import StripeIndividualAccountForm from 'components/organisms/StripeIndividualAccountForm'

const RegisterMerchantInfoForm = () => {
  const [businessType, setBusinessType] = useState('individual')
  return (
    <>
      <Container>
        <Row>
        <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
          <h4 className='mb20'>事業情報を入力してください</h4>
          <h5>決済機能の有効化に必要となります</h5>
          <Form.Label className='mt20'>事業形態</Form.Label>
          <Form.Select onChange={(e) => setBusinessType(e.target.value)}>
            <option value='individual'>個人事業主（副業も含む）</option>
            <option value='company'>法人（株式会社/合同会社/NPOなど）</option>
          </Form.Select>
          {businessType === 'individual' && <StripeIndividualAccountForm></StripeIndividualAccountForm>}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  )
}


export default RegisterMerchantInfoForm
