import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import { Col, Row, Modal, Button } from 'react-bootstrap'
import { showEditMessageTemplateModalChanged } from 'redux/messageTemplateSlice'
import CreateMessageTemplateForm from 'components/organisms/CreateMessageTemplateForm'
import { alertChanged } from 'redux/alertSlice'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import axios from 'axios'

const EditMessageTemplateModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const showEditMessageTemplateModal = useSelector((state: RootState) => state.messageTemplate.showEditMessageTemplateModal)
  const publicId = useSelector((state: RootState) => state.messageTemplate.publicId)
  const name = useSelector((state: RootState) => state.messageTemplate.name)
  const title = useSelector((state: RootState) => state.messageTemplate.title)
  const content = useSelector((state: RootState) => state.messageTemplate.content)

  const updateTemplate = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/message_templates/${publicId}`,
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

  const execDelete = () => {
    swalWithBootstrapButtons.fire({
      title: '削除します',
      html: `${name}を削除します。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/message_templates/${publicId}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '削除しました',
            icon: 'info'
          })
          location.reload()
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '削除失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  return (
    <Modal show={showEditMessageTemplateModal} fullscreen={true}>
      <Modal.Header>
        <Col lg={11} md={9}>
          メッセージテンプレート編集
        </Col>
        <Col>
          <Button
            onClick={() => execDelete()}
            variant='danger'
            className='ml10'>削除する</Button>
        </Col>
      </Modal.Header>
      <Modal.Body>
        <CreateMessageTemplateForm></CreateMessageTemplateForm>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={validateSubmit()}
          onClick={() => updateTemplate()}>
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
