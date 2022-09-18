import { Modal, Button } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { showRegisterReservationModalChanged } from 'redux/reservationSlice'

const CreateReservationModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showRegisterReservationModal = useSelector((state: RootState) => state.reservation.showRegisterReservationModal)

  return (

    <Modal show={showRegisterReservationModal}>
      <Modal.Header>予約登録</Modal.Header>
      <Modal.Footer>
        <Button onClick={() => dispatch(showRegisterReservationModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default CreateReservationModal
