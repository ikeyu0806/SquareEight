import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showPerPrefecturesChargeModalChanged } from 'redux/productSlice'

const PrefecturesChargeModal = () => {
  const dispatch = useDispatch()
  const prefectureDeliveryCharges = useSelector((state: RootState) => state.product.prefectureDeliveryCharges)
  const showPerPrefecturesChargeModal = useSelector((state: RootState) => state.product.showPerPrefecturesChargeModal)

  return (
    <Modal show={showPerPrefecturesChargeModal}>
      <Modal.Body>
        {prefectureDeliveryCharges.map((charge, i) => {
          return (
            <div key={i} className='mb10'>
              {charge.region}: ¥{charge.shipping_fee}
            </div>
          )
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => dispatch(showPerPrefecturesChargeModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PrefecturesChargeModal
