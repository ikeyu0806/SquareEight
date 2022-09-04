import { Modal, Button } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { showHeaderEditModalChanged } from 'redux/sharedComponentSlice'

const SharedComponentHeaderModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showHeaderEditModal =  useSelector((state: RootState) => state.sharedComponent.showHeaderEditModal)

  return (
    <>
      <Modal show={showHeaderEditModal} size='lg'>
        <Modal.Header>ヘッダ編集</Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => console.log('')}>
            登録する
          </Button>
          <Button variant='secondary' onClick={() => dispatch(showHeaderEditModalChanged(false))}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SharedComponentHeaderModal
