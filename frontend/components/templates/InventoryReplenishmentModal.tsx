import { Modal, Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showInventoryReplenishmentModalChanged } from 'redux/productSlice'

const InventoryReplenishmentModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showInventoryReplenishmentModal = useSelector((state: RootState) => state.product.showInventoryReplenishmentModal)

  return (
    <Modal show={showInventoryReplenishmentModal}>
      <Modal.Header>在庫管理について</Modal.Header>
      <Modal.Body>
        <div>在庫数を入力してください</div>
        <Form.Control type='number'></Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => dispatch(showInventoryReplenishmentModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InventoryReplenishmentModal
