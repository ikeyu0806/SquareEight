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
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const price = useSelector((state: RootState) => state.paymentRequest.price)
  const targetCustomerType = useSelector((state: RootState) => state.paymentRequest.targetCustomerType)
  const messageContentType = useSelector((state: RootState) => state.paymentRequest.messageContentType)
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
          <Button>確定して送信する</Button>
        </div>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default New
