import { Modal, Button, Navbar, Container, Form } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { showHeaderEditModalChanged,
         navbarBrandTypeChanged, 
         navbarBrandTextChanged} from 'redux/sharedComponentSlice'

const SharedComponentHeaderModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showHeaderEditModal =  useSelector((state: RootState) => state.sharedComponent.showHeaderEditModal)
  const navbarBrandType =  useSelector((state: RootState) => state.sharedComponent.navbarBrandType)
  const navbarBrandText =  useSelector((state: RootState) => state.sharedComponent.navbarBrandText)
  const navbarBrandImage =  useSelector((state: RootState) => state.sharedComponent.navbarBrandImage)

  return (
    <>
      <Modal show={showHeaderEditModal} size='lg'>
        <Modal.Header>ヘッダ編集</Modal.Header>
        <Modal.Body>
          <h3>ブランド編集</h3>
          <h4></h4>
          <Form.Check
            type='radio'
            id='brandTypeText'
            name='brandType'
            onChange={() => {dispatch(navbarBrandTypeChanged('text'));console.log("!!")}}
            label='テキスト'></Form.Check>
          <Form.Check
            type='radio'
            id='brandTypeImage'
            onChange={() => dispatch(navbarBrandTypeChanged('image'))}
            name='brandType'
            label='画像'></Form.Check>
          {navbarBrandType === 'text'
            && <Form.Control
                value={navbarBrandText}
                onChange={(e) => dispatch(navbarBrandTextChanged(e.target.value))}
                className='mt20'></Form.Control>}
          {navbarBrandType === 'image' && <Form.Group className='mt20'>
            <Form.Label>ブランド画像を選択してください</Form.Label>
            <Form.Control type='file' />
          </Form.Group>}
          <hr />
          <h3>カラー</h3>
          {[{label: 'White', variant: 'light'},
            {label: 'Black', variant: 'dark'},
            {label: 'Red', variant: 'danger'},
            {label: 'Blue', variant: 'primary'},
            {label: 'Green', variant: 'success'},
            {label: 'Yellow', variant: 'alert'},
            {label: 'Gray', variant: 'secondary'}].map((json, i) => {
            return (
              <Form.Check
                key={i}
                inline
                type='radio'
                id={json.label + 'brandColor'}
                label={json.label}
                value={json.variant}
                name='brandColor' ></Form.Check>
            )
          })}
          <hr />
          <h3>プレビュー</h3>
          <hr />
          <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
              <Navbar.Brand href='/'>
                <span className='font-weight-bold'>
                {navbarBrandText}
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
