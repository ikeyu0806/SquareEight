import { Modal, Button, ListGroup, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showLineOfficialAccountModalChanged } from 'redux/accountSlice'
import LineBrandColorButton from 'components/atoms/LineBrandColorButton'

const LineOfficialAccountModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showLineOfficialAccountModal = useSelector((state: RootState) => state.account.showLineOfficialAccountModal)
  const lineOfficialAccounts =  useSelector((state: RootState) => state.account.lineOfficialAccounts)

  return (
    <Modal show={showLineOfficialAccountModal}>
      <Modal.Header>送信元のLINE公式アカウントを選択してください</Modal.Header>
      <Modal.Body>
        <ListGroup>
          {lineOfficialAccounts.map((account, i) => {
            return (
              <ListGroup.Item key={i}>
                <Row>
                  <Col>
                    {account.name}
                  </Col>
                  <Col>
                    <LineBrandColorButton
                      onClick={() => console.log('')}
                      text='選択する' />
                  </Col>
                </Row>
              </ListGroup.Item>
            )
          })}
        </ListGroup>

      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => dispatch(showLineOfficialAccountModalChanged(false))}>閉じる</Button>
      </Modal.Footer>
    </Modal>
  )
} 

export default LineOfficialAccountModal
