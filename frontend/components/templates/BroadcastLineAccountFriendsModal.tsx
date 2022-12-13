import React, { useState } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showPushMessageModalChanged, isSendPaymentRequestChanged } from 'redux/lineOfficialAccountSlice'
import { contentChanged } from 'redux/messageTemplateSlice'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import LineBrandColorButton from 'components/atoms/LineBrandColorButton'
import LineMessageForm from 'components/atoms/LineMessageForm'
import MessageTemplateVariables from 'components/molecules/MessageTemplateVariables'
import { nameChanged, priceChanged } from 'redux/paymentRequestSlice'

const BroadcastLineAccountFriendsModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [isUseMessageTemplate, setIsUseMessageTemplate] = useState(false)
  const showPushMessageModal = useSelector((state: RootState) => state.lineOfficialAccount.showPushMessageModal)
  const isSendPaymentRequest = useSelector((state: RootState) => state.lineOfficialAccount.isSendPaymentRequest)
  const content = useSelector((state: RootState) => state.messageTemplate.content)
  const publicId = useSelector((state: RootState) => state.lineOfficialAccount.publicId)
  const messageTemplates = useSelector((state: RootState) => state.lineOfficialAccount.messageTemplates)
  const price = useSelector((state: RootState) => state.paymentRequest.price)
  const paymentRequestName = useSelector((state: RootState) => state.paymentRequest.name)

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/line_official_accounts/${publicId}/broadcast`,
    {
      line_official_account: {
        message: content,
        is_send_payment_request: isSendPaymentRequest,
        price: price,
        payment_request_name: paymentRequestName
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '送信しました',
        icon: 'info'
      })
      location.reload()
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '送信失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <Modal show={showPushMessageModal} fullscreen={true}>
      <Modal.Header>LINEメッセージを送信します</Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={5}>
            メッセージ本文
            <LineMessageForm />
          </Col>
          <Col md={3}>
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
              </div>}
            <hr />
            <Form.Check
              type='radio'
              name='isUseMessageTemplate'
              id='notUseMessageTemplate'
              label='メッセージテンプレートを使用しない'
              onChange={() => setIsUseMessageTemplate(false)}
              checked={!isUseMessageTemplate} />
            <Form.Check
              type='radio'
              name='isUseMessageTemplate'
              id='useMessageTemplate'
              label='メッセージテンプレートから本文を入力'
              onChange={() => setIsUseMessageTemplate(true)}
              checked={isUseMessageTemplate} />
            {isUseMessageTemplate && <div className='ml10'>
              {messageTemplates.map((template, i) => {
                return (
                  <Form.Check
                    key={i}
                    type='radio'
                    label={template.name}
                    name='MessageTemplate'
                    id={'messageTemplate' + i}
                    onChange={() => dispatch(contentChanged(template.content))}
                  />
                )
              })}
            </div>}
          </Col>
          <Col>
            <MessageTemplateVariables />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <LineBrandColorButton onClick={onSubmit} text='送信する'></LineBrandColorButton>
        <Button variant='secondary' onClick={() => dispatch(showPushMessageModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default BroadcastLineAccountFriendsModal
