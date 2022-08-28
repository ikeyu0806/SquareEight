import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import { Container, Modal, Button } from 'react-bootstrap'
import { showSendMessageTemplateModalChanged } from 'redux/messageTemplateSlice'
import CreateMessageTemplateForm from 'components/organisms/CreateMessageTemplateForm'
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

  const validateSubmit = () => {
    if (!name || !content) {
      return true
    }
    return false
  }

  return (
    <Modal show={showSendMessageTemplateModal} fullscreen={true}>
      <Modal.Header>メッセージ送信</Modal.Header>
      <Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button>
          登録する
        </Button>
        <Button variant='secondary' onClick={() => dispatch(showSendMessageTemplateModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SendMessageTemplateModal
