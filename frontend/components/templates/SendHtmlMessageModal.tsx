import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { sendTargetTypeChanged,
         showSendHtmlMessageModalChanged,
         selectedCustomerChanged,
         selectedCustomerGroupChanged } from 'redux/sendMailSlice'

const SendHtmlMessageModal = () => {
  const dispatch = useDispatch()
  const showSendHtmlMessageModal = useSelector((state: RootState) => state.sendMail.showSendHtmlMessageModal)
  const sendTargetType = useSelector((state: RootState) => state.sendMail.sendTargetType)
  const customers =  useSelector((state: RootState) => state.sendMail.customers)
  const customerGroups =  useSelector((state: RootState) => state.sendMail.customerGroups)

  return (
    <Modal show={showSendHtmlMessageModal}>
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
        {sendTargetType === 'customer' && 
          customers.map((customer, i) => {
            return(
              <Form.Check
                className='ml10'
                id={String(customer.id + i)}
                label={<>{customer.last_name}{customer.full_name}</>}
                key={i}
                onClick={() => dispatch(selectedCustomerChanged(customer))}
              />
            )
          })
        }
        {sendTargetType === 'customerGroup' && 
          customerGroups.map((group, i) => {
            return(
              <Form.Check
                className='ml10'
                id={String(group.id + i)}
                label={group.name}
                key={i}
                onClick={() => dispatch(selectedCustomerGroupChanged(group))}
              />
            )
          })
        }
     </Modal.Body>
     <Modal.Footer>
      <Button
        variant='secondary'
        onClick={() => dispatch(showSendHtmlMessageModalChanged(false))}>閉じる</Button>
     </Modal.Footer>
    </Modal>
  )
}

export default SendHtmlMessageModal
