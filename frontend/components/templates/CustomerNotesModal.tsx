import { Modal, Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showNotesModalChanged } from 'redux/customerSlice'

const CustomerNotesModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const notes = useSelector((state: RootState) => state.customer.notes)
  const showNotesModal = useSelector((state: RootState) => state.customer.showNotesModal)

  return (
    <Modal show={showNotesModal}>
      <Modal.Body>
        <Form.Control
          as='textarea'
          rows={30}
          value={notes}
          readOnly={true}>
        </Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(showNotesModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomerNotesModal
