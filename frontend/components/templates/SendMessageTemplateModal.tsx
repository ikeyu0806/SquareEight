import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import { Modal, Button, Form, FormControl, Row, Col, ListGroup } from 'react-bootstrap'
import { showSendMessageTemplateModalChanged, targetEmailsChanged } from 'redux/messageTemplateSlice'
import { alertChanged } from 'redux/alertSlice'
import axios from 'axios'

const SendMessageTemplateModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const showSendMessageTemplateModal = useSelector((state: RootState) => state.messageTemplate.showSendMessageTemplateModal)
  const id = useSelector((state: RootState) => state.messageTemplate.id)
  const name = useSelector((state: RootState) => state.messageTemplate.name)
  const targetEmails = useSelector((state: RootState) => state.messageTemplate.targetEmails)
  const content = useSelector((state: RootState) => state.messageTemplate.content)
  const customers = useSelector((state: RootState) => state.messageTemplate.customers)
  const customerPaginationState = useSelector((state: RootState) => state.messageTemplate.customerPaginationState)

  const sendMessage = () => {
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

  const insertEmail = (selectedEmail: string) => {
    let updateTargetEmails = targetEmails
    updateTargetEmails = updateTargetEmails === '' ? selectedEmail : updateTargetEmails + ',' + selectedEmail
    dispatch(targetEmailsChanged(updateTargetEmails))
  }

  return (
    <Modal show={showSendMessageTemplateModal} fullscreen={true}>
      <Modal.Header>メッセージ送信</Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={5}>
            <Form.Label>宛先メールアドレス</Form.Label>
            <div>複数の送信先に送る場合カンマ区切りで入力してください</div>
            <Form.Control
              placeholder='例) demo1@example.com, demo2@example.com'
              onChange={(e) => dispatch(targetEmailsChanged(e.target.value))}
              value={targetEmails}></Form.Control>
            <Form.Label className='mt10'>送信内容</Form.Label>
            <FormControl
              value={content}
              disabled={true}
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
          <Col md={4}>
            <div className='mt10'>顧客一覧</div>
            <div>
              <ListGroup>
                {customers.map((customer, i) => {
                  const dataRangeMin =+ customerPaginationState.maxPerPage * (customerPaginationState.currentPage - 1)
                  const dataRangeMax =+ customerPaginationState.maxPerPage * customerPaginationState.currentPage
                  return dataRangeMin <= i && dataRangeMax > i && (
                    <ListGroup.Item key={i}>
                      <span className='badge bg-info'>{customer.last_name}{customer.first_name}</span><br/>
                      メールアドレス: {customer.email}<br/>
                      <Button size='sm' className='mt5' onClick={() => insertEmail(customer.email)}>送信先に追加</Button>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </div>
          </Col>
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
