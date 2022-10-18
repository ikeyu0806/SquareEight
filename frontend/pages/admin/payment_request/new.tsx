import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import MessageTemplateVariables from 'components/molecules/MessageTemplateVariables'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { contentChanged } from "redux/messageTemplateSlice"
import CreateCustomerForm from 'components/organisms/CreateCustomerForm'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useRouter } from 'next/router'
import {  priceChanged,
          targetCustomerTypeChanged,
          messageContentTypeChanged,
          customersChanged,
          selectedCustomersChanged,
          customerGroupsChanged,
          selectedCustomerGroupsChanged,
          messageTemplatesChanged } from 'redux/paymentRequestSlice'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const price = useSelector((state: RootState) => state.paymentRequest.price)
  const targetCustomerType = useSelector((state: RootState) => state.paymentRequest.targetCustomerType)
  const messageContentType = useSelector((state: RootState) => state.paymentRequest.messageContentType)
  const customers = useSelector((state: RootState) => state.paymentRequest.customers)
  const selectedCustomers = useSelector((state: RootState) => state.paymentRequest.selectedCustomers)
  const customerGroups = useSelector((state: RootState) => state.paymentRequest.customerGroups)
  const selectedCustomerGroups = useSelector((state: RootState) => state.paymentRequest.selectedCustomerGroups)
  const messageTemplates = useSelector((state: RootState) => state.paymentRequest.messageTemplates)
  const content = useSelector((state: RootState) => state.messageTemplate.content)

  useEffect(() => {
    const fetchPaymentRequestInitState = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/payment_requests/init_state`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response)
        dispatch(customersChanged(response.data.customers))
        dispatch(customerGroupsChanged(response.data.customer_groups))
        dispatch(messageTemplatesChanged(response.data.message_templates))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchPaymentRequestInitState()
  }, [cookies._square_eight_merchant_session, dispatch])

  const onSubmit = () => {
    swalWithBootstrapButtons.fire({
      title: '送信します',
      html: '決済リクエストを送信します',
      icon: 'question',
      confirmButtonText: '送信します',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.BACKEND_URL}/api/internal/payment_requests/send_payment_request_mail`,
        {
          payment_request: {
            price: price,
            target_customer_type: targetCustomerType,
            message_content_type: messageContentType,
            selected_customers: selectedCustomers,
            selected_customer_groups: selectedCustomerGroups,
            content: content
          }
        },
        {
          headers: {
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '送信しました',
            icon: 'info'
          })
          router.push('/payment_request')
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '送信失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <h3>決済リクエスト作成</h3>
        <Form.Label>対象顧客</Form.Label>
        <Form.Check
          type='radio'
          checked={targetCustomerType === 'registeredCustomer'}
          onChange={() => dispatch(targetCustomerTypeChanged('registeredCustomer'))}
          label='登録済みの顧客に送信'
          name='targetCustomerCheck'
          id='registeredCustomer'></Form.Check>
        <Form.Check
          type='radio'
          checked={targetCustomerType === 'customerGroup'}
          onChange={() => dispatch(targetCustomerTypeChanged('customerGroup'))}
          label='顧客グループに送信'
          name='targetCustomerCheck'
          id='targetCustomerCustomer'></Form.Check>
        <Form.Check
          type='radio'
          checked={targetCustomerType === 'newCustomer'}
          onChange={() => dispatch(targetCustomerTypeChanged('newCustomer'))}
          label='新規に顧客を登録して送信'
          name='targetCustomerCheck'
          id='newCustomer'></Form.Check>
        {targetCustomerType === 'registeredCustomer' &&
        <>
          {customers.map((customer, i) => {
            return (
              <Form.Check
                className='ml20'
                id={'customer_' + i}
                label={customer.last_name + customer.first_name + ' ' + customer.email}
                key={i}></Form.Check>
            )
          })}
        </>}
        {targetCustomerType === 'customerGroup' &&
        <>
          {customerGroups.map((group, i) => {
            return (
              <Form.Check
                className='ml20'
                id={'group_' + i}
                label={group.name}
                key={i}></Form.Check>
            )
          })}
        </>}
        {targetCustomerType === 'newCustomer' &&
        <>
          <CreateCustomerForm />
        </>}
        <hr />
        <Form.Label>請求金額</Form.Label>
        <Form.Control
          value={price}
          onChange={(e) => dispatch(priceChanged(Number(e.target.value)))}
          type='number'></Form.Control>
        <hr />
        <Form.Label>メール本文</Form.Label>
        <Form.Check
          type='radio'
          checked={messageContentType === 'inputMessage'}
          onChange={() => dispatch(messageContentTypeChanged('inputMessage'))}
          label='メッセージを入力する'
          name='messageTemplate'
          id='createMessageTemplate'></Form.Check>
        <Form.Check
          type='radio'
          checked={messageContentType === 'messageTemplate'}
          onChange={() => dispatch(messageContentTypeChanged('messageTemplate'))}
          label='登録済みのメッセージテンプレートから選択'
          name='messageTemplate'
          id='selectRegisteredMessageTemplate'></Form.Check>
        {messageContentType === 'messageTemplate' &&
        <>
           {messageTemplates.map((template, i) => {
            return (
              <Form.Check
                id={template.id + 'template'}
                className='ml20'
                type='radio'
                key={i}
                label={template.name}
                onChange={(e) => dispatch(contentChanged(template.content))}
              ></Form.Check>
            )
           })}
        </>}
        <Row>
          <Col md={8}>
            <Form.Control
              value={content}
              onChange={(e) => dispatch(contentChanged(e.target.value))}
              as='textarea'
              rows={30}></Form.Control>
          </Col>
          <Col md={4}>
            <MessageTemplateVariables />
          </Col>
        </Row>
        <div className='text-center mt20'>
          <Button onClick={() => onSubmit()}>確定して送信する</Button>
        </div>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default New
