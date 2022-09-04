import { Modal, Button, Row, Col } from 'react-bootstrap'
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
          <h3>プレビュー</h3>
          <footer className='content text-center'>
            <hr />
            <Row>
              <Col>
                <p className='footer-margin'>Copyright SquareEight {new Date().getFullYear()}</p>
              </Col>
            </Row>
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
