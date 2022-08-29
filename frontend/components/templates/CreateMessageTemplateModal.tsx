import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import { Container, Modal, FormControl, Row, Col, Form, Button } from 'react-bootstrap'
import { showCreateMessageTemplateModalChanged } from 'redux/messageTemplateSlice'
import CreateMessageTemplateForm from 'components/organisms/CreateMessageTemplateForm'
import { alertChanged } from 'redux/alertSlice'
import axios from 'axios'

const CreateMessageTemplateModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const showCreateMessageTemplateModal = useSelector((state: RootState) => state.messageTemplate.showCreateMessageTemplateModal)
  const name = useSelector((state: RootState) => state.messageTemplate.name)
  const title = useSelector((state: RootState) => state.messageTemplate.title)
  const content = useSelector((state: RootState) => state.messageTemplate.content)

  const createTemplate = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/message_templates`,
    {
      message_template: {
        name: name,
        title: title,
        content: content,
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '登録しました', show: true}))
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
    <Modal show={showCreateMessageTemplateModal} fullscreen={true}>
      <Modal.Header>メッセージテンプレート登録</Modal.Header>
      <Modal.Body>
        <CreateMessageTemplateForm></CreateMessageTemplateForm>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={validateSubmit()}
          onClick={() => createTemplate()}>
          登録する
        </Button>
        <Button variant='secondary' onClick={() => dispatch(showCreateMessageTemplateModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateMessageTemplateModal
