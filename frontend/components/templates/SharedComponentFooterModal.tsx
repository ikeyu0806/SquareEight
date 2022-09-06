import { Modal, Button, Form } from 'react-bootstrap'
import { RootState } from 'redux/store'
import MerchantCustomFooter from 'components/molecules/MerchantCustomFooter'
import { useSelector, useDispatch } from 'react-redux'
import { showFooterEditModalChanged, footerCopyRightTextChanged } from 'redux/sharedComponentSlice'
import SharedComponentFooterForm from 'components/organisms/SharedComponentFooterForm'

const SharedComponentFooterModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showFooterEditModal =  useSelector((state: RootState) => state.sharedComponent.showFooterEditModal)
  const footerCopyRightText =  useSelector((state: RootState) => state.sharedComponent.footerCopyRightText)

  return (
    <>
      <Modal show={showFooterEditModal} size='lg'>
        <Modal.Header>フッタ編集</Modal.Header>
        <Modal.Body>
          <SharedComponentFooterForm></SharedComponentFooterForm>
          <hr />
          <h3>プレビュー</h3>
          <MerchantCustomFooter></MerchantCustomFooter>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => console.log('')}>
            登録する
          </Button>
          <Button variant='secondary' onClick={() => dispatch(showFooterEditModalChanged(false))}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SharedComponentFooterModal
