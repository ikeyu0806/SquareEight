import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { showFooterEditModalChanged } from 'redux/sharedComponentSlice'

const SharedComponentFooterModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showFooterEditModal =  useSelector((state: RootState) => state.sharedComponent.showFooterEditModal)

  return (
    <>
      <Modal show={showFooterEditModal} size='lg'>
        <Modal.Header>フッタ編集</Modal.Header>
        <Modal.Body>
          <Form.Label>Copyrightの後に続く文言を設定してください</Form.Label>
          <Form.Control className='mt20'></Form.Control>
          <hr />
          <h3>プレビュー</h3>
          <footer className='content text-center'>
            <hr />
            <p className='footer-margin'>Copyright SquareEight {new Date().getFullYear()}</p>
          </footer>
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
