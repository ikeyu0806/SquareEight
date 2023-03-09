import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Form, Table, Alert, Pagination  } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import { CustomerParam } from 'interfaces/CustomerParam'
import axios from 'axios'
import { RootState } from 'redux/store'
import lineUserStyles from 'styles/LineUser.module.css'
import { customersChanged,
         htmlMailTemplateChanged,
         showLineOfficialAccountModalChanged } from 'redux/accountSlice'
import { showConnectLineUserModalChanged,
         showEditCustomerModalChanged,
         firstNameChanged,
         lastNameChanged,
         emailChanged,
         notesChanged,
         phoneNumberChanged,
         customerPublicIdChanged,
         lineUsersChanged,
         showNotesModalChanged } from 'redux/customerSlice'
import { selectedLineUserChanged } from 'redux/sendLineScheduleSlice'
import { useDispatch, useSelector } from 'react-redux'
import CreateCustomerModal from 'components/templates/CreateCustomerModal'
import EditCustomerModal from 'components/templates/EditCustomerModal'
import CustomerMailSendModal from 'components/templates/CustomerMailSendModal'
import Unauthorized from 'components/templates/Unauthorized'
import { showCustomerMailSendModalChanged, showCreateCustomerModalChanged } from 'redux/customerSlice'
import { messageTemplatesChanged } from 'redux/accountSlice'
import { lineUserPublicIdChanged } from 'redux/lineUserSlice'
import LineBrandColorButton from 'components/atoms/LineBrandColorButton'
import ConnectLineUserModal from 'components/templates/ConnectLineUserModal'
import CustomerNotesModal from 'components/templates/CustomerNotesModal'
import LineOfficialAccountModal from 'components/templates/LineOfficialAccountModal'
import { htmlMailTemplateChanged as htmlMailTemplateStateContentChanged } from 'redux/htmlMailTemplateSlice'
import { selectedHtmlMailTemplateChanged, sendTargetTypeChanged } from 'redux/sendMailSlice'
import { usePaginationNumber } from 'hooks/usePaginationNumber'
import { lineOfficialAccountsChanged,
         registeredCustomersCountChanged } from 'redux/accountSlice'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const [searchWord, setSearchWord] = useState('')
  const customers =  useSelector((state: RootState) => state.account.customers)
  const registeredCustomersCount =  useSelector((state: RootState) => state.account.registeredCustomersCount)
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)
  const allowReadCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowReadCustomer)
  const allowCreateCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowCreateCustomer)
  const allowUpdateCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateCustomer)
  const allowReadQuestionnaireAnswer = useSelector((state: RootState) => state.merchantUserPermission.allowReadQuestionnaireAnswer)
  const showCustomerMailSendModal = useSelector((state: RootState) => state.customer.showCustomerMailSendModal)
  const allowConnectLineUser = useSelector((state: RootState) => state.merchantUserPermission.allowConnectLineUser)
  const allowReadLineUser = useSelector((state: RootState) => state.merchantUserPermission.allowReadLineUser)
  const allowSendLineMessage = useSelector((state: RootState) => state.merchantUserPermission.allowSendLineMessage)
  // Pagination用
  // 表示するレコード数
  const displayCount = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1000)
  let usePaginationNumberReturnVal = usePaginationNumber(currentPage, lastPage)
  let firstPaginationNum: number = usePaginationNumberReturnVal[0]
  let secondPaginationNum: number = usePaginationNumberReturnVal[1]
  let thirdPaginationNum: number = usePaginationNumberReturnVal[2]
  let forthPaginationNum: number = usePaginationNumberReturnVal[3]
  let fifthPaginationNum: number = usePaginationNumberReturnVal[4]

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/account/customers`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      },
      params: {
        current_page: currentPage,
        display_count: displayCount
      }
    }).then((response) => {
      console.log(response.data)
      dispatch(customersChanged(response.data.customers))
      dispatch(messageTemplatesChanged(response.data.message_templates))
      dispatch(lineUsersChanged(response.data.line_users))
      dispatch(htmlMailTemplateStateContentChanged({templateType: response.data.selected_html_mail_template.template_type, content: response.data.selected_html_template_content}))
      dispatch(htmlMailTemplateChanged(response.data.html_mail_templates))
      dispatch(selectedHtmlMailTemplateChanged(response.data.selected_html_mail_template))
      dispatch(lineOfficialAccountsChanged(response.data.line_official_accounts))
      dispatch(sendTargetTypeChanged('customer'))
      dispatch(registeredCustomersCountChanged(response.data.registered_customers_count))
      setLastPage(response.data.last_page)
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, dispatch, currentPage, lastPage])

  const showEditModal = (customer: CustomerParam) => {
    dispatch(showEditCustomerModalChanged(true))
    dispatch(customerPublicIdChanged(customer.public_id))
    dispatch(lastNameChanged(customer.last_name))
    dispatch(firstNameChanged(customer.first_name))
    dispatch(emailChanged(customer.email || ''))
    dispatch(notesChanged(customer.notes || ''))
    dispatch(phoneNumberChanged(customer.phone_number || ''))
  }

  const execSearch = () => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/account/customers?search_word=${searchWord}`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      dispatch(customersChanged(response.data.customers))
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        {servicePlan === 'Free' && <Alert className='text-center'>フリープランでは顧客数は10人まで表示されます。現在の顧客数は{registeredCustomersCount}人です。</Alert>}
        {servicePlan === 'Light' && <Alert className='text-center'>ライトプランでは顧客数は500人まで表示されます。現在の顧客数は{registeredCustomersCount}人です。</Alert>}
        {servicePlan === 'Standard' && <Alert className='text-center'>スタンダードプランでは顧客数は1000人まで表示されます。現在の顧客数は{registeredCustomersCount}人です。</Alert>}
        {allowReadCustomer === 'Allow' &&
        <><br />
          <Container>
          <h4>顧客一覧</h4>
          {customers.length >= 1 && <>
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
                  <th>メモ</th>
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
                    <td>
                      <div>
                        {allowReadLineUser === 'Allow' && <>
                          {customer.line_picture_url && <img
                            className={lineUserStyles.line_picture_url}
                            src={customer.line_picture_url}
                            alt='line_picture_url' />}
                          {customer.line_display_name &&
                            <span className='ml10'>
                              {customer.line_display_name}
                            </span>}
                        </>}
                        <div>
                        {customer.line_display_name &&
                          allowSendLineMessage === 'Allow' &&
                          <div className='mt10'>
                            <LineBrandColorButton
                              text='メッセージ送信'
                              onClick={() => {
                                dispatch(showLineOfficialAccountModalChanged(true));
                                dispatch(customerPublicIdChanged(customer.public_id));
                                dispatch(lineUserPublicIdChanged(customer.line_user_public_id));
                                dispatch(selectedLineUserChanged(customer.line_user))
                              }}
                              size={'sm'} />
                          </div>}
                        </div>
                      </div>
                      {!customer.line_display_name &&
                        allowConnectLineUser === 'Allow' &&
                        <LineBrandColorButton
                          text='LINEユーザと紐付け'
                          onClick={() => {
                            dispatch(showConnectLineUserModalChanged(true));
                            dispatch(customerPublicIdChanged(customer.public_id));
                          }}
                          size={'sm'} />}
                    </td>
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
                      {allowUpdateCustomer === 'Allow' &&
                        <a onClick={() => showEditModal(customer)}
                        className='btn btn-primary btn-sm mb20'>
                        編集
                      </a>}
                    </td>
                    <td>
                      {customer.notes &&
                        <Button
                          onClick={() => {
                            dispatch(showNotesModalChanged(true));
                            dispatch(notesChanged(customer.notes));
                          }}
                          size='sm'>表示</Button>}
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
            <Pagination>
              <Pagination.First onClick={() => setCurrentPage(1)} />
              {currentPage > 1 && <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)} />}
              <Pagination.Item
                active={currentPage == firstPaginationNum}
                onClick={() => setCurrentPage(firstPaginationNum)}>{firstPaginationNum}</Pagination.Item>
              {lastPage > 1 && <Pagination.Item
                active={currentPage == secondPaginationNum}
                onClick={() => setCurrentPage(secondPaginationNum)}>{secondPaginationNum}</Pagination.Item>}
              {lastPage > 2 && <Pagination.Item
                active={currentPage == thirdPaginationNum}
                onClick={() => setCurrentPage(thirdPaginationNum)}>{thirdPaginationNum}</Pagination.Item>}
              {lastPage > 3 && currentPage < lastPage &&  <Pagination.Item
                active={currentPage == forthPaginationNum}
                onClick={() => setCurrentPage(forthPaginationNum)}>{forthPaginationNum}</Pagination.Item>}
              {lastPage > 4 && currentPage < lastPage - 1 && <Pagination.Item
                active={currentPage == fifthPaginationNum}
                onClick={() => setCurrentPage(fifthPaginationNum)}>{fifthPaginationNum}</Pagination.Item>}
              {currentPage !== lastPage && <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)} />}
              <Pagination.Last onClick={() => setCurrentPage(lastPage)} />
            </Pagination>
          </>}
          {customers.length === 0 && <Container>
            {allowCreateCustomer === 'Allow' && <Button
              className='mb20'
              onClick={() => dispatch(showCreateCustomerModalChanged(true))}>顧客新規登録</Button>}
              <div className='text-center font-size-20'>
                顧客が登録されていません
              </div>
          </Container>}
          </Container>
        </>}
        <CreateCustomerModal></CreateCustomerModal>
        <EditCustomerModal></EditCustomerModal>
        <CustomerMailSendModal></CustomerMailSendModal>
        <ConnectLineUserModal></ConnectLineUserModal>
        <CustomerNotesModal></CustomerNotesModal>
        <LineOfficialAccountModal></LineOfficialAccountModal>
        {allowReadCustomer === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
