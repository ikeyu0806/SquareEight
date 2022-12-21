import { Modal, Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showSendMailReservationModalChanged } from 'redux/sendMailReservationSlice'

const MailSendReservationModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showSendMailReservationModal = useSelector((state: RootState) => state.sendMailReservation.showSendMailReservationModal)

  return (
    <Modal show={showSendMailReservationModal}>
      <Modal.Body>
        <div>送信日時を入力してください</div>
        <Form.Control type='date' className='mt10'></Form.Control>
        <Form.Control type='time' className='mt10'></Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(showSendMailReservationModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MailSendReservationModal
