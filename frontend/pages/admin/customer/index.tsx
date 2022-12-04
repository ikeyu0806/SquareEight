import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Card, Button, Form, Pagination, Alert } from 'react-bootstrap'
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
         phoneNumberChanged } from 'redux/customerSlice'
import { useDispatch, useSelector } from 'react-redux'
import CreateCustomerModal from 'components/templates/CreateCustomerModal'
import EditCustomerModal from 'components/templates/EditCustomerModal'
import CustomerMailSendModal from 'components/templates/CustomerMailSendModal'

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

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/account/customers`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setCustomers(response.data.customers)
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
        {allowReadCustomer === 'Allow' && <Container>
          <Row>
            <Col lg={2}></Col>
            <Col lg={8}>
              {servicePlan === 'Free' && <Alert variant='warning'>フリープランでは登録顧客の最大表示数は50件となります</Alert>}
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
              {allowCreateCustomer === 'Allow' && <Button
                className='mb20'
                onClick={() => dispatch(showCreateCustomerModalChanged(true))}>顧客新規登録</Button>}
              <h3>顧客一覧</h3>
              <ListGroup>
                
                {customers.map((customer, i) => {
                  return (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col>
                          <div>お名前: {customer.last_name}{customer.first_name}</div>
                          <br></br>
                          <div>メールアドレス: {customer.email}</div>
                            <Col>
                              <div>携帯電話番号: {customer.phone_number}</div>
                            </Col>
                            <Col></Col>
                        </Col>
                        <Col>
                          <Row>
                            <Col>
                              {allowUpdateCustomer === 'Allow' && <a onClick={() => showEditModal(customer)}
                                className='btn btn-primary mb20'>
                                編集
                              </a>}
                              <br/>
                              {allowReadQuestionnaireAnswer === 'Allow' && <a href={`/admin/customer/${customer.public_id}/questionnaire_answers`}
                                className='btn btn-primary'>
                                アンケート回答
                              </a>}
                            </Col>
                            <Col>
                              <a href={`/admin/customer/${customer.public_id}/order`}
                                className='btn btn-primary mb20'>
                                注文履歴
                              </a>
                              <br/>
                              <a href={`/admin/customer/${customer.public_id}/charges`}
                                className='btn btn-primary'>
                                お支払い履歴
                              </a>

                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Col>
          </Row>
          <CreateCustomerModal></CreateCustomerModal>
          <EditCustomerModal></EditCustomerModal>
          <CustomerMailSendModal></CustomerMailSendModal>
        </Container>}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
