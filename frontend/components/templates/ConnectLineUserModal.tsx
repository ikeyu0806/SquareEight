import { Modal, Button, ListGroup, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showConnectLineUserModalChanged } from 'redux/customerSlice'
import lineUserStyles from 'styles/lineUser.module.css'
import LineBrandColorButton from 'components/atoms/LineBrandColorButton'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const ConnectLineUserModal = (): JSX.Element => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const showConnectLineUserModal =  useSelector((state: RootState) => state.customer.showConnectLineUserModal)
  const lineUsers =  useSelector((state: RootState) => state.customer.lineUsers)
  const customerPublicId =  useSelector((state: RootState) => state.customer.customerPublicId)

  const connectLineUser = (lineUserPublicId: string) => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/customers/${customerPublicId}/connect_line_user`,
    {
      customers: {
        line_user_public_id: lineUserPublicId
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      console.log(response)
      location.reload()
    }).catch(error => {
      console.log(error)
    })
  }

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
                      onClick={() => connectLineUser(line_user.public_id)}
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
