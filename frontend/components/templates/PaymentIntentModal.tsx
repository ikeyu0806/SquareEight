import { Modal, Button } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { showPaymentIntentModalChanged } from 'redux/stripePaymentIntentSlice'

const PaymentIntentModal = () => {
  const dispatch = useDispatch()
  const showPaymentIntentModal =  useSelector((state: RootState) => state.stripePaymentIntent.showPaymentIntentModal)

  return (
    <Modal show={showPaymentIntentModal}>
      <Modal.Body>
        <div className='text-center font-size-25'>領収書</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => dispatch(showPaymentIntentModalChanged(false))}>閉じる</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PaymentIntentModal
