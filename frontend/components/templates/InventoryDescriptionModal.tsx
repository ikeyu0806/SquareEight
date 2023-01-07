import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showInventoryDescriptionModalChanged } from 'redux/productSlice'

const InventoryDescriptionModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showInventoryDescriptionModal = useSelector((state: RootState) => state.product.showInventoryDescriptionModal)

  return (
    <Modal show={showInventoryDescriptionModal}>
      <Modal.Header>在庫管理について</Modal.Header>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => dispatch(showInventoryDescriptionModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InventoryDescriptionModal
