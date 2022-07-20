import React from 'react'
import { Form } from 'react-bootstrap'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js'

const RegisterCardForm = () => {

  return (
    <>
      <Form.Label>カード番号</Form.Label>
      <CardNumberElement className="form-control" />
      <Form.Label className='mt10'>有効期限</Form.Label>
      <CardExpiryElement className="form-control" />
      <Form.Label className='mt10'>セキュリティコード</Form.Label>
      <CardCvcElement className="form-control" />
    </>
  )
}

export default RegisterCardForm
