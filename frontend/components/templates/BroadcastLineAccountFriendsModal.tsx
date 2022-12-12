import React, { useState } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { messageChanged, showPushMessageModalChanged } from 'redux/lineOfficialAccountSlice'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import LineBrandColorButton from 'components/atoms/LineBrandColorButton'
import LineMessageForm from 'components/atoms/LineMessageForm'
import MessageTemplateVariables from 'components/molecules/MessageTemplateVariables'

const BroadcastLineAccountFriendsModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [isUseMessageTemplate, setIsUseMessageTemplate] = useState(false)
  const showPushMessageModal = useSelector((state: RootState) => state.lineOfficialAccount.showPushMessageModal)
  const message = useSelector((state: RootState) => state.lineOfficialAccount.message)
  const publicId = useSelector((state: RootState) => state.lineOfficialAccount.publicId)
  const messageTemplates = useSelector((state: RootState) => state.lineOfficialAccount.messageTemplates)

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/line_official_accounts/${publicId}/broadcast`,
    {
      line_official_account: {
        message: message
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
              label='決済リクエストを送る'
              id='isSendPaymentRequest' />
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
                    onChange={() => dispatch(messageChanged(template.content))}
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
