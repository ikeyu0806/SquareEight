import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { isSendPaymentRequestChanged,
         paymentRequestNameChanged,
         paymentRequestPriceChanged } from 'redux/sendMailSlice'

const SendStripePaymentRequestForm = () => {
  const dispatch = useDispatch()
  const isSendPaymentRequest =  useSelector((state: RootState) => state.sendMail.isSendPaymentRequest)
  const paymentRequestName =  useSelector((state: RootState) => state.sendMail.paymentRequestName)
  const paymentRequestPrice =  useSelector((state: RootState) => state.sendMail.paymentRequestPrice)

  return (
    <>
      <Form.Check
        checked={isSendPaymentRequest}
        onChange={() => dispatch(isSendPaymentRequestChanged(!isSendPaymentRequest))}
        label='決済リクエストを送信する'
        id='isSendPaymentRequest' />
      {isSendPaymentRequest &&
      <>
        <div className='mt10'>決済リクエスト名</div>
        <div>商品名、サービス名などを入力してください</div>
        <Form.Control
          value={paymentRequestName}
          onChange={(e) => dispatch(paymentRequestNameChanged(e.target.value))} />
        <div className='mt10'>決済金額を入力してください（円）</div>
        <Form.Control
          value={paymentRequestPrice}
          onChange={(e) => dispatch(paymentRequestPriceChanged(Number(e.target.value)))}
          type='number' />
      </>}
    </>
  )
}
export default SendStripePaymentRequestForm
