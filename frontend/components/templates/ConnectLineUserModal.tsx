import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showConnectLineUserModalChanged } from 'redux/customerSlice'

const ConnectLineUserModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showConnectLineUserModal =  useSelector((state: RootState) => state.customer.showConnectLineUserModal)

  return (
    <Modal show={showConnectLineUserModal}>
      <Modal.Header>LINEユーザと紐付け</Modal.Header>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => dispatch(showConnectLineUserModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ConnectLineUserModal
