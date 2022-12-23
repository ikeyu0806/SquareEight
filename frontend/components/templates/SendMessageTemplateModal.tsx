import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { alertChanged } from 'redux/alertSlice'
import { useCookies } from 'react-cookie'
import { sendTargetTypeChanged,
         showSendMessageTemplateModalChanged,
         selectedCustomerChanged,
         selectedCustomerGroupChanged } from 'redux/sendMailSlice'
import { showSendMailScheduleModalChanged } from 'redux/sendMailReservationSlice'
import SendMailScheduleModal from 'components/organisms/SendMailScheduleModal'
import { customerPublicIdChanged } from 'redux/customerSlice'
import { publicIdChanged } from 'redux/customerGroupSlice'

const SendMessageTemplateModal = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const showSendMessageTemplateModal = useSelector((state: RootState) => state.sendMail.showSendMessageTemplateModal)
  const sendTargetType = useSelector((state: RootState) => state.sendMail.sendTargetType)
  const customers =  useSelector((state: RootState) => state.sendMail.customers)
  const customerGroups =  useSelector((state: RootState) => state.sendMail.customerGroups)
  const selectedCustomer =  useSelector((state: RootState) => state.sendMail.selectedCustomer)
  const selectedCustomerGroup =  useSelector((state: RootState) => state.sendMail.selectedCustomerGroup)
  const selectedMessageTemplate =  useSelector((state: RootState) => state.sendMail.selectedMessageTemplate)

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/message_templates/${selectedMessageTemplate.public_id}/send_mail`,
    {
      html_mail_templates: {
        send_target_type: sendTargetType,
        selected_customer: selectedCustomer,
        selected_customer_group: selectedCustomerGroup
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '送信しました', show: true}))
      location.reload()
    }).catch(error => {
      dispatch(alertChanged({message: '送信失敗しました', show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <Modal show={showSendMessageTemplateModal}>
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
                    type='radio'
                    name='selectCustomer'
                    id={String(customer.id + i)}
                    label={<>{customer.last_name}{customer.full_name}</>}
                    key={i}
                    onClick={() => {
                      dispatch(customerPublicIdChanged(customer.public_id))
                      dispatch(selectedCustomerChanged(customer))
                    }}
                  />
                )
              })
            }
            {sendTargetType === 'customerGroup' && 
              customerGroups.map((group, i) => {
                return(
                  <Form.Check
                    className='ml10'
                    type='radio'
                    name='selectCustomerGroup'
                    id={String(group.id + i)}
                    label={group.name}
                    key={i}
                    onClick={() => {
                      dispatch(publicIdChanged(group.public_id))
                      dispatch(selectedCustomerGroupChanged(group))
                    }}
                  />
                )
              })
            }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => dispatch(showSendMailScheduleModalChanged(true))}>
            送信予約する
          </Button>
          <Button onClick={onSubmit}>送信する</Button>
          <Button
            variant='secondary'
            onClick={() => dispatch(showSendMessageTemplateModalChanged(false))}>閉じる</Button>
        </Modal.Footer>
        </Modal>
      <SendMailScheduleModal></SendMailScheduleModal>
    </>
  )
}

export default SendMessageTemplateModal
