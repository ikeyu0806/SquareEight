import { Modal, Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { inventoryChanged, showInventoryReplenishmentModalChanged } from 'redux/productSlice'
import axios from 'axios'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useCookies } from 'react-cookie'

const InventoryReplenishmentModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const publicId = useSelector((state: RootState) => state.product.publicId)
  const inventory = useSelector((state: RootState) => state.product.inventory)
  const showInventoryReplenishmentModal = useSelector((state: RootState) => state.product.showInventoryReplenishmentModal)
  const inventoryReplenishmentModalTarget = useSelector((state: RootState) => state.product.inventoryReplenishmentModalTarget)

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/products/${publicId}/inventory_replenishment`,
    {
      product: {
        inventory: inventory,
        target_type: inventoryReplenishmentModalTarget
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '更新しました',
        icon: 'info'
      })
      location.reload()
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '更新失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <Modal show={showInventoryReplenishmentModal}>
      <Modal.Header>在庫補充</Modal.Header>
      <Modal.Body>
        <div>在庫数を入力してください</div>
        <Form.Control
          value={inventory}
          onChange={(e) => dispatch(inventoryChanged(Number(e.target.value)))}
          type='number'></Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>登録する</Button>
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
