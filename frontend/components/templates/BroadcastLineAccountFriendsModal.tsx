import React from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showPushMessageModalChanged } from 'redux/lineOfficialAccountSlice'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import LineBrandColorButton from 'components/atoms/LineBrandColorButton'
import MessageTemplateContentForm from 'components/atoms/MessageTemplateContentForm'
import MessageTemplateVariables from 'components/molecules/MessageTemplateVariables'
import PaymentRequestSendForm from 'components/molecules/PaymentRequestSendForm'
import SelectMessageTemplateForm from 'components/molecules/SelectMessageTemplateForm'
import SendLineScheduleModal from 'components/organisms/SendLineScheduleModal'
import { showSendLineScheduleModalChanged } from 'redux/sendLineScheduleSlice'

const BroadcastLineAccountFriendsModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const showPushMessageModal = useSelector((state: RootState) => state.lineOfficialAccount.showPushMessageModal)
  const isSendPaymentRequest = useSelector((state: RootState) => state.lineOfficialAccount.isSendPaymentRequest)
  const content = useSelector((state: RootState) => state.messageTemplate.content)
  const publicId = useSelector((state: RootState) => state.lineOfficialAccount.publicId)
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
    <>
      <Modal show={showPushMessageModal} fullscreen={true}>
        <Modal.Header>LINEメッセージを送信します</Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={5}>
              メッセージ本文
              <MessageTemplateContentForm />
            </Col>
            <Col md={3}>
              <PaymentRequestSendForm />
              <hr />
              <SelectMessageTemplateForm hideHtmlMailTemplate={true} />
            </Col>
            <Col>
              <MessageTemplateVariables />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <LineBrandColorButton onClick={() => {
              dispatch(showSendLineScheduleModalChanged(true))
            }} text='送信予約する'></LineBrandColorButton>
          <LineBrandColorButton onClick={onSubmit} text='送信する'></LineBrandColorButton>
          <Button variant='secondary' onClick={() => dispatch(showPushMessageModalChanged(false))}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
      <SendLineScheduleModal></SendLineScheduleModal>
    </>
  )
}

export default BroadcastLineAccountFriendsModal
