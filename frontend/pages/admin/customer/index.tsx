import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import { CustomerParam } from 'interfaces/CustomerParam'
import axios from 'axios'
import { showCreateCustomerModalChanged,
         showEditCustomerModalChanged,
         showCustomerMailSendModalChanged,
         customerIdChanged,
         firstNameChanged,
         lastNameChanged,
         emailChanged,
         phoneNumberChanged } from 'redux/customerSlice'
import { useDispatch } from 'react-redux'
import CreateCustomerModal from 'components/templates/CreateCustomerModal'
import EditCustomerModal from 'components/templates/EditCustomerModal'
import CustomerMailSendModal from 'components/templates/CustomerMailSendModal'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [customers, setCustomers] = useState<CustomerParam[]>([])
  const dispatch = useDispatch()

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
  }, [cookies._square_eight_merchant_session])

  const showEditModal = (id: string, lastName: string, firstName: string, email: string, phoneNumber: string) => {
    dispatch(showEditCustomerModalChanged(true))
    dispatch(showCustomerMailSendModalChanged(true))
    dispatch(customerIdChanged(id))
    dispatch(lastNameChanged(lastName))
    dispatch(firstNameChanged(firstName))
    dispatch(emailChanged(email))
    dispatch(phoneNumberChanged(phoneNumber))
  }

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <Row>
            <Col lg={2}></Col>
            <Col lg={8}>
              <Card className='mb20'>
                <Card.Header>絞り込み</Card.Header>
                <Card.Body>
                <Row>
                  <Col lg={8} className='mb10'>
                    <label>
                      検索したい内容を入力してください<br/>
                      (お名前・メールアドレス・電話番号)
                    </label>
                    <Form.Control className='mt20'></Form.Control>
                  </Col>
                </Row>
                </Card.Body>
              </Card>
              <Button
                className='mb20'
                onClick={() => dispatch(showCreateCustomerModalChanged(true))}>顧客新規登録</Button>
              <Button
                className='mb20 ml10'
                onClick={() => dispatch(showCustomerMailSendModalChanged(true))}>選択した顧客にメール送信</Button>
              <Card>
                <Card.Header>顧客一覧</Card.Header>
                {customers && customers.map((customer, i) => {
                  return (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col>
                          <div>お名前: {customer.last_name}{customer.first_name}</div>
                          <br></br>
                          <div>メールアドレス: {customer.email}</div>
                          <Row>
                            <Col>
                              <div>携帯電話番号: {customer.phone_number}</div>
                            </Col>
                            <Col></Col>
                            <Col>
                              <Button onClick={() => showEditModal(customer.id, customer.last_name, customer.first_name, customer.email, customer.phone_number)}>
                                編集
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                })}
              </Card>
            </Col>
          </Row>
          <CreateCustomerModal></CreateCustomerModal>
          <EditCustomerModal></EditCustomerModal>
          <CustomerMailSendModal></CustomerMailSendModal>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
