import { Modal, Button, Navbar, Container, Form } from 'react-bootstrap'
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
          <h3>ブランド編集</h3>
          <h4></h4>
          <Form.Check type='radio' id='brandType' label='テキスト'></Form.Check>
          <Form.Check type='radio' id='brandType' label='画像'></Form.Check>
          <Form.Control className='mt20'></Form.Control>
          <Form.Group className='mt20'>
            <Form.Label>ブランド画像を選択してください</Form.Label>
            <Form.Control type='file' />
          </Form.Group>
          <hr />
          <h3>右寄せリンク</h3>
          <Form.Check type='radio' id='brandType' label='リンク付きテキストを追加'></Form.Check>
          <Form.Check type='radio' id='brandType' label='ドロップダウンリンクを追加'></Form.Check>
          <hr />
          <h3>左寄せリンク</h3>
          <Form.Check type='radio' id='brandType' label='リンク付きテキストを追加'></Form.Check>
          <Form.Check type='radio' id='brandType' label='ドロップダウンリンクを追加'></Form.Check>
          <hr />
          <h3>プレビュー</h3>
          <hr />
          <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
              <Navbar.Brand href='/'>
                <span className='font-weight-bold'>
                SquareEight
                </span>
              </Navbar.Brand>
            </Container>
          </Navbar>
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
