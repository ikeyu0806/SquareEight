import React from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'
import { showCustomerMailSendModalChanged } from 'redux/customerSlice'
import MessageTemplateVariables from 'components/molecules/MessageTemplateVariables'
import PaymentRequestSendForm from 'components/molecules/PaymentRequestSendForm'
import SelectMessageTemplateForm from 'components/molecules/SelectMessageTemplateForm'
import MessageTemplateContentForm from 'components/atoms/MessageTemplateContentForm'

const CustomerMailSendModal = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const showCustomerMailSendModal = useSelector((state: RootState) => state.customer.showCustomerMailSendModal)

    return (
      <Modal show={showCustomerMailSendModal} fullscreen={true}>
        <Modal.Header>メール送信</Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={5}>
              メッセージ本文
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
          <Button>
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
