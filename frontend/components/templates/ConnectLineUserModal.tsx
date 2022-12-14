import { Modal, Button, ListGroup, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showConnectLineUserModalChanged } from 'redux/customerSlice'
import lineUserStyles from 'styles/lineUser.module.css'
import LineBrandColorButton from 'components/atoms/LineBrandColorButton'

const ConnectLineUserModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showConnectLineUserModal =  useSelector((state: RootState) => state.customer.showConnectLineUserModal)
  const lineUsers =  useSelector((state: RootState) => state.customer.lineUsers)

  return (
    <Modal show={showConnectLineUserModal}>
      <Modal.Header>LINEユーザと紐付け</Modal.Header>
      <Modal.Body>
        <ListGroup>
          {lineUsers.map((line_user, i) => {
            return (
              <ListGroup.Item key={i}>
                <Row>
                  <Col>
                    <img
                      className={lineUserStyles.line_picture_url}
                      src={line_user.line_picture_url}
                      alt='line_picture_url' />
                    <span className='ml10'>
                      {line_user.line_display_name}</span>
                  </Col>
                  <Col>
                    <LineBrandColorButton
                      text='紐付け'
                      onClick={() => console.log('')}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => dispatch(showConnectLineUserModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ConnectLineUserModal
