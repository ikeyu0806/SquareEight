import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Container, Modal, FormControl, Row, Col, Form, Button } from 'react-bootstrap'
import { showCreateMailTemplateModalChanged } from 'redux/mailTemplateSlice'
import CreateMailTemplateForm from 'components/organisms/CreateMailTemplateForm'

const CreateMailTemplateModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showCreateMailTemplateModal = useSelector((state: RootState) => state.mailTemplate.showCreateMailTemplateModal)

  return (
    <Modal show={showCreateMailTemplateModal} size='lg'>
      <Modal.Header>メールテンプレート登録</Modal.Header>
      <Modal.Body>
        <CreateMailTemplateForm></CreateMailTemplateForm>
      </Modal.Body>
      <Modal.Footer>
        <Button>
          登録する
        </Button>
        <Button variant='secondary' onClick={() => dispatch(showCreateMailTemplateModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateMailTemplateModal
