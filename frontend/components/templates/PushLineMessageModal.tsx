import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showPushMessageModalChanged } from 'redux/lineOfficialAccountSlice'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const PushLineMessageModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [message, setMessage] = useState('')
  const showPushMessageModal = useSelector((state: RootState) => state.lineOfficialAccount.showPushMessageModal)
  const lineUserPublicId = useSelector((state: RootState) => state.lineUser.lineUserPublicId)

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/line_official_accounts/${router.query.public_id}/push_message`,
    {
      line_official_account: {
        line_user_public_id: lineUserPublicId,
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
    <Modal show={showPushMessageModal}>
      <Modal.Header>LINEメッセージを送信します</Modal.Header>
      <Modal.Body>
        <Form.Control
          onChange={(e) => setMessage(e.target.value)}
          as='textarea'
          rows={20}></Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>送信する</Button>
        <Button variant='secondary' onClick={() => dispatch(showPushMessageModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PushLineMessageModal
