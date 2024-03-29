import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { alertChanged } from 'redux/alertSlice'
import { useCookies } from 'react-cookie'
import { sendTargetTypeChanged,
         showSendHtmlMessageModalChanged,
         selectedCustomerChanged,
         selectedCustomerGroupChanged,
        isSendMessageAllCustomersChanged } from 'redux/sendMailSlice'
import { showSendMailScheduleModalChanged } from 'redux/sendMailReservationSlice'
import SendMailScheduleModal from 'components/organisms/SendMailScheduleModal'
import { customerPublicIdChanged } from 'redux/customerSlice'
import { publicIdChanged } from 'redux/customerGroupSlice'

const SendHtmlMessageModal = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const showSendHtmlMessageModal = useSelector((state: RootState) => state.sendMail.showSendHtmlMessageModal)
  const sendTargetType = useSelector((state: RootState) => state.sendMail.sendTargetType)
  const customers =  useSelector((state: RootState) => state.sendMail.customers)
  const customerGroups =  useSelector((state: RootState) => state.sendMail.customerGroups)
  const selectedCustomer =  useSelector((state: RootState) => state.sendMail.selectedCustomer)
  const selectedCustomerGroup =  useSelector((state: RootState) => state.sendMail.selectedCustomerGroup)
  const selectedHtmlMailTemplatePublicId =  useSelector((state: RootState) => state.sendMail.selectedHtmlMailTemplatePublicId)
  const isSendMessageAllCustomers =  useSelector((state: RootState) => state.sendMail.isSendMessageAllCustomers)

  const InitDisplayCustomerCount = 10
  const InitDisplayCustomerGroupCount = 10
  const [showCustomerCount, setShowCustomerCount] = useState(InitDisplayCustomerCount)
  const [showCustomerGroupCount, setShowCustomerGroupCount] = useState(InitDisplayCustomerGroupCount)

  const addCustomerShowCount = () => {
    setShowCustomerCount(showCustomerCount + InitDisplayCustomerCount)
  }

  const addCustomerGroupShowCount = () => {
    setShowCustomerGroupCount(showCustomerGroupCount + InitDisplayCustomerGroupCount)
  }

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/html_mail_templates/${selectedHtmlMailTemplatePublicId}/send_mail`,
    {
      html_mail_templates: {
        send_target_type: sendTargetType,
        is_send_message_all_customers: isSendMessageAllCustomers,
        selected_customer: selectedCustomer,
        selected_customer_group: selectedCustomerGroup,
        customer_public_id: selectedHtmlMailTemplatePublicId
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
              <Form.Check
                onChange={() => dispatch(isSendMessageAllCustomersChanged(!isSendMessageAllCustomers))}
                checked={isSendMessageAllCustomers}
                id='sendMessageAllCustomers'
                label='全ての顧客に送信する'></Form.Check>}
            {sendTargetType === 'customer' && !isSendMessageAllCustomers &&
              <>
                {
                  customers.slice(0, showCustomerCount).map((customer, i) => {
                    return(
                      <Form.Check
                        className='ml10'
                        type='radio'
                        name='selectCustomer'
                        id={String(customer.id + i)}
                        label={<>{customer.last_name}{customer.first_name}</>}
                        key={i}
                        onClick={() => {
                          dispatch(customerPublicIdChanged(customer.public_id))
                          dispatch(selectedCustomerChanged(customer))
                        }}
                      />
                    )
                  })
                }
                {customers.length > showCustomerCount && <div>
                  <button className='btn btn-primary btn-sm mt10' onClick={addCustomerShowCount}>もっと表示 ▼</button>
                </div>}
              </>
            }
            {sendTargetType === 'customerGroup' && 
              <>
                {
                  customerGroups.slice(0, showCustomerGroupCount).map((group, i) => {
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
                {customerGroups.length > showCustomerGroupCount && <div>
                  <button className='btn btn-primary btn-sm mt10' onClick={addCustomerGroupShowCount}>もっと表示 ▼</button>
                </div>}
              </>
            }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => dispatch(showSendMailScheduleModalChanged(true))}>
            送信予約する
          </Button>
          <Button onClick={onSubmit}>送信する</Button>
          <Button
            variant='secondary'
            onClick={() => dispatch(showSendHtmlMessageModalChanged(false))}>閉じる</Button>
        </Modal.Footer>
        </Modal>
      <SendMailScheduleModal></SendMailScheduleModal>
    </>
  )
}

export default SendHtmlMessageModal
