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
