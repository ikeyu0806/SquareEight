import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { sendTargetTypeChanged, showSelectSendMessageTargetModalChanged } from 'redux/sendMailSlice'

const SelectSendMessageTargetModal = () => {
  const dispatch = useDispatch()
  const showSelectSendMessageTargetModal = useSelector((state: RootState) => state.sendMail.showSelectSendMessageTargetModal)
  const sendTargetType = useSelector((state: RootState) => state.sendMail.sendTargetType)

  return (
    <Modal show={showSelectSendMessageTargetModal}>
     <Modal.Header>送信先を選択してください</Modal.Header> 
     <Modal.Body>
        <Form.Check
          checked={sendTargetType === 'customer'}
          onChange={() => dispatch(sendTargetTypeChanged('customer'))}
          id='selectCustomer'
          label='顧客'
          type='radio'/>
        <Form.Check
          checked={sendTargetType === 'customerGroup'}
          onChange={() => dispatch(sendTargetTypeChanged('customerGroup'))}
          id='selectCustomerGroup'
          label='顧客グループ'
          type='radio'/>
     </Modal.Body>
     <Modal.Footer>
      <Button
        variant='secondary'
        onClick={() => dispatch(showSelectSendMessageTargetModalChanged(false))}>閉じる</Button>
     </Modal.Footer>
    </Modal>
  )
}

export default SelectSendMessageTargetModal
