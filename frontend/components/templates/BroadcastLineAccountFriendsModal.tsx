import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showPushMessageModalChanged } from 'redux/lineOfficialAccountSlice'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import LineBrandColorButton from 'components/atoms/LineBrandColorButton'
import LineMessageForm from 'components/atoms/LineMessageForm'

const BroadcastLineAccountFriendsModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const showPushMessageModal = useSelector((state: RootState) => state.lineOfficialAccount.showPushMessageModal)
  const message = useSelector((state: RootState) => state.lineOfficialAccount.message)
  const publicId = useSelector((state: RootState) => state.lineOfficialAccount.publicId)

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
    <Modal show={showPushMessageModal}>
      <Modal.Header>LINEメッセージを送信します</Modal.Header>
      <Modal.Body>
        <LineMessageForm />
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
