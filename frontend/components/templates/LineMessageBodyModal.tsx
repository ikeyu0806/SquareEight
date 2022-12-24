import { Modal, Button, Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showLineMessageModalChanged } from 'redux/sendLineSlice'

const LineMessageBodyModal = () => {
  const dispatch = useDispatch()
  const selectedMessage = useSelector((state: RootState) => state.sendLine.selectedMessage)
  const showLineMessageModal = useSelector((state: RootState) => state.sendLine.showLineMessageModal)

  return (
    <Modal show={showLineMessageModal} size='lg'>
      <Modal.Body>
        <div>{selectedMessage}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => dispatch(showLineMessageModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LineMessageBodyModal
