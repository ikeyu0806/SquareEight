import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import { Container, Modal, Button, Form, FormControl, Row, Col, ListGroup } from 'react-bootstrap'
import { showSendMessageTemplateModalChanged } from 'redux/messageTemplateSlice'
import { alertChanged } from 'redux/alertSlice'
import axios from 'axios'

const SendMessageTemplateModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const showSendMessageTemplateModal = useSelector((state: RootState) => state.messageTemplate.showSendMessageTemplateModal)
  const id = useSelector((state: RootState) => state.messageTemplate.id)
  const name = useSelector((state: RootState) => state.messageTemplate.name)
  const content = useSelector((state: RootState) => state.messageTemplate.content)

  const updateTemplate = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/message_templates/${id}`,
    {
      message_template: {
        name: name,
        content: content,
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '更新しました', show: true}))
      location.reload()
    }).catch(error => {
    })
  }

  return (
    <Modal show={showSendMessageTemplateModal} fullscreen={true}>
      <Modal.Header>メッセージ送信</Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={5}>
            <Form.Label>宛先メールアドレス</Form.Label>
            <Form.Control
              placeholder='宛先メールアドレスを入力してください。'></Form.Control>
            <Form.Label className='mt10'>送信内容</Form.Label>
            <FormControl
              disabled={true}
              value={content}
              as='textarea'
              rows={40} />
          </Col>
          <Col md={3}>
          <div>変数</div>
          <div>
            <ListGroup>
              <ListGroup.Item>
                <div>%customer_name</div>
                <div className='mt10'>顧客名に変換されます</div>
                <div>顧客一覧からの送信時に反映されます</div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div>%customer_postalcode</div>
                <div className='mt10'>顧客の郵便番号に変換されます</div>
                <div>顧客一覧からの送信時に反映されます</div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div>%customer_address</div>
                <div className='mt10'>顧客の住所に変換されます</div>
                <div>顧客一覧からの送信時に反映されます</div>
              </ListGroup.Item>
            </ListGroup>
          </div>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button>
          送信する
        </Button>
        <Button variant='secondary' onClick={() => dispatch(showSendMessageTemplateModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SendMessageTemplateModal
