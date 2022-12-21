import React from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { showCustomerGroupMailSendModalChanged } from 'redux/customerGroupSlice'
import MessageTemplateVariables from 'components/molecules/MessageTemplateVariables'
import PaymentRequestSendForm from 'components/molecules/PaymentRequestSendForm'
import SelectMessageTemplateForm from 'components/molecules/SelectMessageTemplateForm'
import MessageTemplateContentForm from 'components/atoms/MessageTemplateContentForm'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { titleChanged } from 'redux/messageTemplateSlice'
import HtmlMailTemplatePreview from 'components/organisms/HtmlMailTemplatePreview'
import SendMailScheduleForm from 'components/organisms/SendMailScheduleModal'
import { showSendMailScheduleModalChanged } from 'redux/sendMailReservationSlice'

const CustomerGroupMailSendModal = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const showCustomerGroupMailSendModal = useSelector((state: RootState) => state.customerGroup.showCustomerGroupMailSendModal)
  const publicId =  useSelector((state: RootState) => state.customerGroup.publicId)
  const messageTemplatePublicId =  useSelector((state: RootState) => state.messageTemplate.publicId)
  const title = useSelector((state: RootState) => state.messageTemplate.title)
  const content = useSelector((state: RootState) => state.messageTemplate.content)
  const price = useSelector((state: RootState) => state.paymentRequest.price)
  const paymentRequestName = useSelector((state: RootState) => state.paymentRequest.name)
  const isSendPaymentRequest = useSelector((state: RootState) => state.lineOfficialAccount.isSendPaymentRequest)
  const selectedHtmlMailTemplate = useSelector((state: RootState) => state.sendMail.selectedHtmlMailTemplate)
  const messageTemplateType = useSelector((state: RootState) => state.sendMail.messageTemplateType)

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/customer_groups/${publicId}/send_mail`,
    {
      customer_groups: {
        mail_title: title,
        message: content,
        is_send_payment_request: isSendPaymentRequest,
        price: price,
        payment_request_name: paymentRequestName,
        message_template_public_id: messageTemplatePublicId,
        selected_html_mail_template: selectedHtmlMailTemplate,
        message_template_type: messageTemplateType
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
      <Modal show={showCustomerGroupMailSendModal} fullscreen={true}>
        <Modal.Header>メール送信</Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={5}>
              {messageTemplateType !== 'htmlMailTemplate' &&
              <>
                <div>メールタイトル</div>
                <Form.Control
                  value={title}
                  onChange={(e) => dispatch(titleChanged(e.target.value))}
                ></Form.Control>
                <div>メッセージ本文</div>
                <MessageTemplateContentForm />
              </>}
              {messageTemplateType === 'htmlMailTemplate' && <HtmlMailTemplatePreview></HtmlMailTemplatePreview>}
            </Col>
            <Col md={3}>
              {messageTemplateType !== 'htmlMailTemplate' && <><PaymentRequestSendForm /><hr /></>}
              <SelectMessageTemplateForm />
            </Col>
            <Col>
              {messageTemplateType !== 'htmlMailTemplate' &&<MessageTemplateVariables />}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => dispatch(showSendMailScheduleModalChanged(true))}>
            送信予約する
          </Button>
          <Button onClick={onSubmit}>
            送信する
          </Button>
          <Button variant='secondary' onClick={() => dispatch(showCustomerGroupMailSendModalChanged(false))}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
      <SendMailScheduleForm />
    </>
  )
}

export default CustomerGroupMailSendModal
