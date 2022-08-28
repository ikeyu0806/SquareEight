import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'
import { showCustomerMailSendModalChanged } from 'redux/customerSlice'

const CustomerMailSendModal = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const showCustomerMailSendModal = useSelector((state: RootState) => state.customer.showCustomerMailSendModal)

    return (
      <Modal show={showCustomerMailSendModal} size='lg'>
        <Modal.Header>メール送信</Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button>
            送信する
          </Button>
          <Button variant='secondary' onClick={() => dispatch(showCustomerMailSendModalChanged(false))}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default CustomerMailSendModal
