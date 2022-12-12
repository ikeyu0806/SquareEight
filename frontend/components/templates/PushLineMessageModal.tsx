import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showPushMessageModalChanged } from 'redux/lineOfficialAccountSlice'

const PushLineMessageModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showPushMessageModal = useSelector((state: RootState) => state.lineOfficialAccount.showPushMessageModal)

  return (
    <Modal show={showPushMessageModal}>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => dispatch(showPushMessageModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PushLineMessageModal
