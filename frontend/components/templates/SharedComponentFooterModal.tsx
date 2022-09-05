import { Modal, Button, Form } from 'react-bootstrap'
import { RootState } from 'redux/store'
import MerchantCustomFooter from 'components/molecules/MerchantCustomFooter'
import { useSelector, useDispatch } from 'react-redux'
import { showFooterEditModalChanged, footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

const SharedComponentFooterModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showFooterEditModal =  useSelector((state: RootState) => state.sharedComponent.showFooterEditModal)
  const footerCopyRightText =  useSelector((state: RootState) => state.sharedComponent.footerCopyRightText)

  return (
    <>
      <Modal show={showFooterEditModal} size='lg'>
        <Modal.Header>フッタ編集</Modal.Header>
        <Modal.Body>
          <Form.Label>Copyrightの後に続く文言を設定してください</Form.Label>
          <Form.Control
            value={footerCopyRightText}
            onChange={(e) => dispatch(footerCopyRightTextChanged(e.target.value))}
            className='mt20'></Form.Control>
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
