import { Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useDispatch } from 'react-redux'
import { showSetTargetProductModalChanged } from 'redux/deliveryDatetimeSlice'

const SetTargetProductModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showSetTargetProductModal = useSelector((state: RootState) => state.deliveryDatetime.showSetTargetProductModal)

  return (
    <Modal show={showSetTargetProductModal} size='lg'>
      <Modal.Body>
      </Modal.Body>
      <Modal.Header>
        <Button onClick={() => console.log('')}>
          送信する
        </Button>
        <Button
          variant='secondary'
          onClick={() => dispatch(showSetTargetProductModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Header>
    </Modal>
  )
}

export default SetTargetProductModal
