import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { isSendPaymentRequestChanged } from 'redux/lineOfficialAccountSlice'
import { nameChanged, priceChanged } from 'redux/paymentRequestSlice'


const PaymentRequestSendForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const isSendPaymentRequest = useSelector((state: RootState) => state.lineOfficialAccount.isSendPaymentRequest)
  const price = useSelector((state: RootState) => state.paymentRequest.price)
  const paymentRequestName = useSelector((state: RootState) => state.paymentRequest.name)

  return (
    <>
      <Form.Check
        onChange={() => dispatch(isSendPaymentRequestChanged(!isSendPaymentRequest))}
        defaultChecked={isSendPaymentRequest}
        label='決済リクエストを送る'
        id='isSendPaymentRequest' />
      {isSendPaymentRequest &&
        <div className='ml10 mt10'>
          <div>請求対象の商品名、イベント名など。請求画面に表示されます</div>
          <Form.Control
            onChange={(e) => dispatch(nameChanged(e.target.value))}
            value={paymentRequestName}  />  
          <div>決済金額</div>
          <Form.Control
            onChange={(e) => dispatch(priceChanged(Number(e.target.value)))}
            value={price}  />  
        </div>
      }
    </>
  )
}

export default PaymentRequestSendForm
