import { useRef, createRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useDispatch } from 'react-redux'
import {  showSetTargetProductModalChanged,
          productsChanged } from 'redux/deliveryDatetimeSlice'
import { DeliveryDatetimeProduct } from 'interfaces/DeliveryDatetimeProduct'

const SetTargetProductModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showSetTargetProductModal = useSelector((state: RootState) => state.deliveryDatetime.showSetTargetProductModal)
  const products = useSelector((state: RootState) => state.deliveryDatetime.products)

  const productRefs = useRef<any>([])
  productRefs.current = products.map((_, i) => productRefs.current[i] ?? createRef())

  const updateProduct = (productRef: number) => {
    let updateProduct: DeliveryDatetimeProduct
    let updateProducts: DeliveryDatetimeProduct[]
    updateProducts = []

    updateProduct = { public_id: '', id: products[productRef].id, name: products[productRef].name, delivery_datetime_target_flg: !products[productRef].delivery_datetime_target_flg }
    products.map((p, i) => {
      if (i == productRef) {
        updateProducts.push(updateProduct)
      } else {
        updateProducts.push(p)
      }
    })
    dispatch(productsChanged(updateProducts))
  }

  return (
    <Modal show={showSetTargetProductModal} size='lg'>
      <Modal.Body>
        <div className='mb20'>配送日時指定を受け付けたくない商品はチェックを外してください</div>
        {products && products.map((p, i) => {
          return (
            <div key={i}>
              <Form.Check
                label={p.name}
                id={i + p.name}
                name='deliveryDateTargetProduct'
                checked={p.delivery_datetime_target_flg}
                onChange={() => updateProduct(i)}
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
