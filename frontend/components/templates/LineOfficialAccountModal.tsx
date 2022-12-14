import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showLineOfficialAccountModalChanged } from 'redux/accountSlice'

const LineOfficialAccountModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const showLineOfficialAccountModal = useSelector((state: RootState) => state.account.showLineOfficialAccountModal)

  return (
    <Modal show={showLineOfficialAccountModal}>
      <Modal.Header>送信元のLINE公式アカウントを選択してください</Modal.Header>
      <Modal.Body>

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
