import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { showReserveFrameModalChanged } from 'redux/reserveFrameSlice'
import ReserveFrameForm from 'components/molecules/ReserveFrameForm'

const ReserveFrameModal = (): JSX.Element => {
  const showReserveFrameModal = useSelector((state: RootState) => state.reserveFrame.showeserveFrameModal)
  const dispatch = useDispatch()

  return (
    <>
      <Modal show={showReserveFrameModal} size='lg'>
        <Modal.Header> 
          <Modal.Title>新規予約枠登録</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReserveFrameForm></ReserveFrameForm>
        </Modal.Body>
        <Modal.Footer>
        <Button variant='secondary' onClick={() => dispatch(showReserveFrameModalChanged(false))}>閉じる</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ReserveFrameModal
