import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Card, Button, Form, Pagination } from 'react-bootstrap'
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
         customerPaginationStateChanged,
         phoneNumberChanged } from 'redux/customerSlice'
import { useDispatch, useSelector } from 'react-redux'
import CreateCustomerModal from 'components/templates/CreateCustomerModal'
import EditCustomerModal from 'components/templates/EditCustomerModal'
import CustomerMailSendModal from 'components/templates/CustomerMailSendModal'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [customers, setCustomers] = useState<CustomerParam[]>([])
  const [displayCustomers, setDisplayCustomers] = useState<CustomerParam[]>([])
  const dispatch = useDispatch()
  const [searchWord, setSearchWord] = useState('')
  const customerPaginationState = useSelector((state: RootState) => state.customer.customerPaginationState)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/account/customers`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setCustomers(response.data.customers)
      setDisplayCustomers(response.data.customers)
      const customersTotalPage = Math.ceil(response.data.customers.length / customerPaginationState.maxPerPage)
      dispatch(customerPaginationStateChanged(Object.assign({ ...customerPaginationState }, { totalPage: customersTotalPage })))
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

  const displayPrevPage = () => {
    if (customerPaginationState.currentPage <= 1) return
    dispatch(customerPaginationStateChanged({currentPage: customerPaginationState.currentPage - 1, totalPage: customerPaginationState.totalPage, maxPerPage: customerPaginationState.maxPerPage}))
  }

  const displayNextPage = () => {
    if (customerPaginationState.currentPage >= customerPaginationState.totalPage) return
    dispatch(customerPaginationStateChanged({currentPage: customerPaginationState.currentPage + 1, totalPage: customerPaginationState.totalPage, maxPerPage: customerPaginationState.maxPerPage}))
  }

  const displaySelectedPage = (i: number) => {
    dispatch(customerPaginationStateChanged({currentPage: i + 1, totalPage: customerPaginationState.totalPage, maxPerPage: customerPaginationState.maxPerPage}))
  }

  const displayFirstPage = () => {
    dispatch(customerPaginationStateChanged({currentPage: 1, totalPage: customerPaginationState.totalPage, maxPerPage: customerPaginationState.maxPerPage}))
  }

  const displayLastPage = () => {
    dispatch(customerPaginationStateChanged({currentPage: customerPaginationState.totalPage, totalPage: customerPaginationState.totalPage, maxPerPage: customerPaginationState.maxPerPage}))
  }

  const isDisplayPage = (i: number) => {
    // 最初のページの制御
    if ([0, 1, 2, 3].includes(customerPaginationState.currentPage)) {
      if ([0, 1, 2, 3, 4].includes(i)) {
        return true
      } else {
        return false
      }
    } else {
      if (i + 4 > customerPaginationState.currentPage  && customerPaginationState.currentPage > i - 2) {
        return true
      } else {
        return false
      }
    }
  }

  const execSearch = () => {
    let updateCustomers: CustomerParam[] = []
    updateCustomers = customers?.filter(customer => customer.last_name.match(searchWord)|| customer.first_name?.match(searchWord) || customer.email?.match(searchWord) || customer.phone_number?.match(searchWord)) || []
    setDisplayCustomers(updateCustomers)
    const totalPage = Math.ceil(updateCustomers.length / customerPaginationState.maxPerPage)
    dispatch(customerPaginationStateChanged(Object.assign({ ...customerPaginationState }, { totalPage: totalPage })))
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
                    <Form.Control className='mt20' onChange={(e) => setSearchWord(e.target.value)}></Form.Control>
                    <Button className='mt20' size='lg' onClick={execSearch}>検索</Button>
                  </Col>
                </Row>
                </Card.Body>
              </Card>
              <Button
                className='mb20'
                onClick={() => dispatch(showCreateCustomerModalChanged(true))}>顧客新規登録</Button>
              <h3>顧客一覧</h3>
              <ListGroup>
                
                {displayCustomers && displayCustomers.map((customer, i) => {
                  const dataRangeMin =+ customerPaginationState.maxPerPage * (customerPaginationState.currentPage - 1)
                  const dataRangeMax =+ customerPaginationState.maxPerPage * customerPaginationState.currentPage
                  return dataRangeMin <= i && dataRangeMax > i && (
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
                              <a onClick={() => showEditModal(customer)}
                                className='btn btn-primary mb20'>
                                編集
                              </a>
                              <br/>
                              <a href={`/admin/customer/${customer.id}/questionnaire_answers`}
                                className='btn btn-primary'>
                                アンケート回答
                              </a>
                            </Col>
                            <Col>
                              <a href={`/admin/customer/${customer.id}/order`}
                                className='btn btn-primary mb20'>
                                注文履歴
                              </a>
                              <br/>
                              <a href={`/admin/customer/${customer.id}/charges`}
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
                <Pagination className='mt10'>
                  <Pagination.First onClick={displayFirstPage} />
                  <Pagination.Prev onClick={displayPrevPage}></Pagination.Prev>
                  {[...Array(customerPaginationState.totalPage)].map((_, i) => {
                    return isDisplayPage(i) && (
                      <Pagination.Item key={i}
                                        active={i + 1 === customerPaginationState.currentPage}
                                        onClick={() => displaySelectedPage(i)}>
                        {i + 1}
                      </Pagination.Item>
                    )
                  })}

                  <Pagination.Next onClick={displayNextPage}></Pagination.Next>
                  <Pagination.Last onClick={displayLastPage} />
                </Pagination>
              </ListGroup>
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
