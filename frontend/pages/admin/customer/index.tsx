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
         showCustomerMailSendModalChanged,
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

  const showEditModal = (id: string, lastName: string, firstName: string, email: string, phoneNumber: string, notes: string) => {
    dispatch(showEditCustomerModalChanged(true))
    dispatch(customerIdChanged(id))
    dispatch(lastNameChanged(lastName))
    dispatch(firstNameChanged(firstName))
    dispatch(emailChanged(email))
    dispatch(notesChanged(notes))
    dispatch(phoneNumberChanged(phoneNumber))
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
              <Card>
                <Card.Header>顧客一覧</Card.Header>
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
                          <Row>
                            <Col>
                              <div>携帯電話番号: {customer.phone_number}</div>
                            </Col>
                            <Col></Col>
                            <Col>
                              <Button onClick={() => showEditModal(customer.id, customer.last_name, customer.first_name, customer.email, customer.phone_number, customer.notes)}>
                                編集
                              </Button>
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
