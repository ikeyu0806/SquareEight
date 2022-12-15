import React from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { showCustomerMailSendModalChanged } from 'redux/customerSlice'
import MessageTemplateVariables from 'components/molecules/MessageTemplateVariables'
import PaymentRequestSendForm from 'components/molecules/PaymentRequestSendForm'
import SelectMessageTemplateForm from 'components/molecules/SelectMessageTemplateForm'
import MessageTemplateContentForm from 'components/atoms/MessageTemplateContentForm'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { titleChanged } from 'redux/messageTemplateSlice'

const CustomerMailSendModal = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const showCustomerMailSendModal = useSelector((state: RootState) => state.customer.showCustomerMailSendModal)
  const customerPublicId =  useSelector((state: RootState) => state.customer.customerPublicId)
  const messageTemplatePublicId =  useSelector((state: RootState) => state.messageTemplate.publicId)
  const title = useSelector((state: RootState) => state.messageTemplate.title)
  const content = useSelector((state: RootState) => state.messageTemplate.content)
  const price = useSelector((state: RootState) => state.paymentRequest.price)
  const paymentRequestName = useSelector((state: RootState) => state.paymentRequest.name)
  const isSendPaymentRequest = useSelector((state: RootState) => state.lineOfficialAccount.isSendPaymentRequest)

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/customers/${customerPublicId}/send_mail`,
    {
      customers: {
        mail_title: title,
        message: content,
        is_send_payment_request: isSendPaymentRequest,
        price: price,
        payment_request_name: paymentRequestName,
        message_template_public_id: messageTemplatePublicId
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
    <Modal show={showCustomerMailSendModal} fullscreen={true}>
      <Modal.Header>メール送信</Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={5}>
            <div>メールタイトル</div>
            <Form.Control
              value={title}
              onChange={(e) => dispatch(titleChanged(e.target.value))}
            ></Form.Control>
            <div>メッセージ本文</div>
            <MessageTemplateContentForm />
          </Col>
          <Col md={3}>
            <PaymentRequestSendForm />
            <hr />
            <SelectMessageTemplateForm />
          </Col>
          <Col>
            <MessageTemplateVariables />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>
          送信する
        </Button>
        <Button variant='secondary' onClick={() => dispatch(showCustomerMailSendModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomerMailSendModal
