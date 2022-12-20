import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showMessageBodyModalChanged } from 'redux/sendMailHistorySlice'

const MessageBodyModal = () => {
  const dispatch = useDispatch()
  const selectedMessageBody = useSelector((state: RootState) => state.sendMailHistory.selectedMessageBody)
  const selectedMessageType = useSelector((state: RootState) => state.sendMailHistory.selectedMessageType)
  const showMessageBodyModal = useSelector((state: RootState) => state.sendMailHistory.showMessageBodyModal)

  return (
    <Modal show={showMessageBodyModal} size='lg'>
      <Modal.Body>
        {selectedMessageType === 'MessageTemplate' && selectedMessageBody}
        {selectedMessageType === 'HtmlMailTemplate' && <></>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => dispatch(showMessageBodyModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MessageBodyModal
