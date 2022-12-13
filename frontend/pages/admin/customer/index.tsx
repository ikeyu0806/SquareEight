import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Card, Button, Form, Table  } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import { CustomerParam } from 'interfaces/CustomerParam'
import axios from 'axios'
import { RootState } from 'redux/store'
import { showCreateCustomerModalChanged,
         showEditCustomerModalChanged,
         customerIdChanged,
         firstNameChanged,
         lastNameChanged,
         emailChanged,
         notesChanged,
         phoneNumberChanged,
         customerPublicIdChanged } from 'redux/customerSlice'
import { useDispatch, useSelector } from 'react-redux'
import CreateCustomerModal from 'components/templates/CreateCustomerModal'
import EditCustomerModal from 'components/templates/EditCustomerModal'
import CustomerMailSendModal from 'components/templates/CustomerMailSendModal'
import Unauthorized from 'components/templates/Unauthorized'
import { showCustomerMailSendModalChanged } from 'redux/customerSlice'
import { messageTemplatesChanged } from 'redux/accountSlice'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [customers, setCustomers] = useState<CustomerParam[]>([])
  const dispatch = useDispatch()
  const [searchWord, setSearchWord] = useState('')
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)
  const allowReadCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowReadCustomer)
  const allowCreateCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowCreateCustomer)
  const allowUpdateCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateCustomer)
  const allowReadQuestionnaireAnswer = useSelector((state: RootState) => state.merchantUserPermission.allowReadQuestionnaireAnswer)
  const showCustomerMailSendModal =  useSelector((state: RootState) => state.customer.showCustomerMailSendModal)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/account/customers`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setCustomers(response.data.customers)
      dispatch(messageTemplatesChanged(response.data.message_templates))
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, dispatch])

  const showEditModal = (customer: CustomerParam) => {
    dispatch(showEditCustomerModalChanged(true))
    dispatch(customerIdChanged(customer.id))
    dispatch(lastNameChanged(customer.last_name))
    dispatch(firstNameChanged(customer.first_name))
    dispatch(emailChanged(customer.email || ''))
    dispatch(notesChanged(customer.notes || ''))
    dispatch(phoneNumberChanged(customer.phone_number || ''))
  }

  const execSearch = () => {
    let updateCustomers: CustomerParam[] = []
    updateCustomers = customers?.filter(customer => customer.last_name.match(searchWord)|| customer.first_name?.match(searchWord) || customer.email?.match(searchWord) || customer.phone_number?.match(searchWord)) || []
    setCustomers(updateCustomers)
  }

  return (
    <>
      <MerchantUserAdminLayout>
        {allowReadCustomer === 'Allow' &&
        <Container>
        <>
          <Card className='mb20'>
            <Card.Header>絞り込み</Card.Header>
            <Card.Body>
            <Row>
              <Col lg={8} className='mb10'>
                <label>
                  検索したい内容を入力してください<br/>
                  (お名前・メールアドレス・電話番号)
                </label>
                <Form.Control className='mt20' onChange={(e) => setSearchWord(e.target.value)}></Form.Control>
                <Button className='mt20' size='lg' onClick={execSearch}>検索</Button>
              </Col>
            </Row>
            </Card.Body>
          </Card>
          <Table bordered>
            <thead>
              <tr>
                <th>お名前</th>
                <th>メールアドレス</th>
                <th>携帯電話番号</th>
                <th>LINE</th>
                <th>アンケート</th>
                <th>注文/お支払い</th>
                <th>編集</th>
              </tr>
            </thead>
            <tbody>
            {customers.map((customer, i) => {
              return (
                <tr key={i}>
                  <td>{customer.last_name}{customer.first_name}</td>
                  <td>{customer.email &&
                    <>
                      <div>{customer.email}</div>
                      <Button
                        variant='primary'
                        className='mt10'
                        size='sm'
                        onClick={() => {
                          dispatch(showCustomerMailSendModalChanged(true));
                          dispatch(customerPublicIdChanged(customer.public_id));
                        }}>メール送信</Button>
                    </>}</td>
                  <td>{customer.phone_number}</td>
                  <td></td>
                  <td>
                    {allowReadQuestionnaireAnswer === 'Allow' &&
                      <a href={`/admin/customer/${customer.public_id}/questionnaire_answers`}
                        className='btn btn-primary btn-sm'>
                        アンケート回答
                      </a>}
                  </td>
                  <td>
                    <a href={`/admin/customer/${customer.public_id}/order`}
                      className='btn btn-primary btn-sm mb20'>
                      注文履歴
                    </a>
                    <br/>
                    <a href={`/admin/customer/${customer.public_id}/charges`}
                      className='btn btn-primary btn-sm'>
                      お支払い履歴
                    </a>
                  </td>
                  <td>
                    {allowUpdateCustomer === 'Allow' && <a onClick={() => showEditModal(customer)}
                      className='btn btn-primary btn-sm mb20'>
                      編集
                    </a>}
                  </td>
                </tr>
              )
            })}
            </tbody>
          </Table>
        </>
        </Container>}
        <CreateCustomerModal></CreateCustomerModal>
        <EditCustomerModal></EditCustomerModal>
        <CustomerMailSendModal></CustomerMailSendModal>
        {allowReadCustomer === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
