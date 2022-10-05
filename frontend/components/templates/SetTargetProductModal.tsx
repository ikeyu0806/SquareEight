import { Modal, Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useDispatch } from 'react-redux'
import { showSetTargetProductModalChanged } from 'redux/deliveryDatetimeSlice'

const SetTargetProductModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showSetTargetProductModal = useSelector((state: RootState) => state.deliveryDatetime.showSetTargetProductModal)
  const products = useSelector((state: RootState) => state.deliveryDatetime.products)

  return (
    <Modal show={showSetTargetProductModal} size='lg'>
      <Modal.Body>
        {products && products.map((p, i) => {
          return (
            <div key={i}>
              <Form.Check
                label={p.name}
                id={i + p.name}
                name='deliveryDateTargetProduct'
                checked={p.delivery_datetime_target_flg}
              ></Form.Check>
            </div>
          )
        })}
        {!products && <>商品が登録されていません</>}
      </Modal.Body>
      <Modal.Header>
        <Button
          onClick={() => dispatch(showSetTargetProductModalChanged(false))}>
          設定を終える
        </Button>
      </Modal.Header>
    </Modal>
  )
}

export default SetTargetProductModal
