import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import { Container, Modal, Button } from 'react-bootstrap'
import { showEditMessageTemplateModalChanged } from 'redux/messageTemplateSlice'
import CreateMessageTemplateForm from 'components/organisms/CreateMessageTemplateForm'
import { alertChanged } from 'redux/alertSlice'
import axios from 'axios'

const EditMessageTemplateModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const showEditMessageTemplateModal = useSelector((state: RootState) => state.messageTemplate.showEditMessageTemplateModal)
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
    <Modal show={showEditMessageTemplateModal} fullscreen={true}>
      <Modal.Header>メッセージテンプレート編集</Modal.Header>
      <Modal.Body>
        <CreateMessageTemplateForm></CreateMessageTemplateForm>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => updateTemplate()}>
          登録する
        </Button>
        <Button variant='secondary' onClick={() => dispatch(showEditMessageTemplateModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditMessageTemplateModal
