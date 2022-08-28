import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import { Container, Modal, FormControl, Row, Col, Form, Button } from 'react-bootstrap'
import { showCreateMailTemplateModalChanged } from 'redux/mailTemplateSlice'
import CreateMailTemplateForm from 'components/organisms/CreateMailTemplateForm'
import { alertChanged } from 'redux/alertSlice'
import axios from 'axios'

const CreateMailTemplateModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const showCreateMailTemplateModal = useSelector((state: RootState) => state.mailTemplate.showCreateMailTemplateModal)
  const templateName = useSelector((state: RootState) => state.mailTemplate.templateName)
  const templateContent = useSelector((state: RootState) => state.mailTemplate.templateContent)

  const createTemplate = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/account/mail_template`,
    {
      customer: {
        template_mame: templateName,
        template_content: templateContent,
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

  return (
    <Modal show={showCreateMailTemplateModal} size='lg'>
      <Modal.Header>メールテンプレート登録</Modal.Header>
      <Modal.Body>
        <CreateMailTemplateForm></CreateMailTemplateForm>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => createTemplate()}>
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
