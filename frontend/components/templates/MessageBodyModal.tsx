import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showMessageBodyModalChanged } from 'redux/sendMailHistorySlice'

const MessageBodyModal = () => {
  const dispatch = useDispatch()
  const showMessageBodyModal = useSelector((state: RootState) => state.sendMailHistory.showMessageBodyModal)

  return (
    <Modal show={showMessageBodyModal}>
      <Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => dispatch(showMessageBodyModalChanged(false))}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}

export default MessageBodyModal
