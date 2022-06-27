import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

const RegisterMerchantBank = () => {

  return (
    <>
      <Card.Header>振込先銀行口座登録</Card.Header>
      <Card.Body>
        <Form.Label className='mt10'>口座番号</Form.Label>
        <Form.Control></Form.Control>
        <Form.Label className='mt10'>口座名義人</Form.Label>
        <Form.Control></Form.Control>
        <Form.Label className='mt10'>銀行コード</Form.Label>
        <Form.Control></Form.Control>
        <Form.Label className='mt10'>支店コード</Form.Label>
        <Form.Control></Form.Control>
        <div className='text-center mt20'>
          <Button>登録する</Button>
        </div>
      </Card.Body>
    </>
  )
}

export default RegisterMerchantBank
