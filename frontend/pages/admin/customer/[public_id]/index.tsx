import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import { CustomerParam } from 'interfaces/CustomerParam'
import axios from 'axios'
import { RootState } from 'redux/store'
import { useRouter } from 'next/router'
import { showConnectLineUserModalChanged,
         showEditCustomerModalChanged,
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
import LineBrandColorButton from 'components/atoms/LineBrandColorButton'
import ConnectLineUserModal from 'components/templates/ConnectLineUserModal'
import CustomerNotesModal from 'components/templates/CustomerNotesModal'
import LineOfficialAccountModal from 'components/templates/LineOfficialAccountModal'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [customer, setCustomer] = useState<CustomerParam>()
  const allowReadCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowReadCustomer)
  const allowUpdateCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateCustomer)
  const allowReadQuestionnaireAnswer = useSelector((state: RootState) => state.merchantUserPermission.allowReadQuestionnaireAnswer)
  const allowConnectLineUser = useSelector((state: RootState) => state.merchantUserPermission.allowConnectLineUser)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/customers/${router.query.public_id}`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      setCustomer(response.data.customer)
    }).catch((error) => {
      console.log(error)
    })
  }, [router.query.public_id, dispatch, cookies._square_eight_merchant_session])

  const showEditModal = (customer: CustomerParam) => {
    dispatch(showEditCustomerModalChanged(true))
    dispatch(customerPublicIdChanged(customer.public_id))
    dispatch(lastNameChanged(customer.last_name))
    dispatch(firstNameChanged(customer.first_name))
    dispatch(emailChanged(customer.email || ''))
    dispatch(notesChanged(customer.notes || ''))
    dispatch(phoneNumberChanged(customer.phone_number || ''))
  }

  return (
    <>
      <MerchantUserAdminLayout>
        <br />
        {allowReadCustomer === 'Allow' &&
        <Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6}>
              <Card>
                <Card.Header className='font-weight-bold'>顧客情報</Card.Header>
                <Card.Body>
                  <Row>
                    <Col className='font-weight-bold'>お名前</Col>
                    <Col>
                      {customer &&
                      <>{customer.last_name}{customer.first_name}</>}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className='font-weight-bold'>メールアドレス</Col>
                    <Col>
                      {customer &&
                      <>{customer.email}</>}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className='font-weight-bold'>携帯電話番号</Col>
                    <Col>
                      {customer &&
                      <>{customer.phone_number}</>}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className='font-weight-bold'>LINEユーザ</Col>
                    <Col>
                      {customer && !customer.line_display_name &&
                        allowConnectLineUser === 'Allow' &&
                        <LineBrandColorButton
                          text='LINEユーザと紐付け'
                          onClick={() => {
                            dispatch(showConnectLineUserModalChanged(true));
                            dispatch(customerPublicIdChanged(customer.public_id));
                          }}
                          size={'sm'} />}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className='font-weight-bold'>アンケート</Col>
                    <Col>
                      {customer &&
                      <>
                        {allowReadQuestionnaireAnswer === 'Allow' &&
                        <a href={`/admin/customer/${customer.public_id}/questionnaire_answers`}
                          className='btn btn-primary btn-sm'>
                          アンケート回答
                        </a>}
                      </>}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className='font-weight-bold'>注文履歴</Col>
                    <Col>
                      {customer &&
                      <>
                        <a href={`/admin/customer/${customer.public_id}/order`}
                          className='btn btn-primary btn-sm'>
                          注文履歴
                        </a>
                      </>}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className='font-weight-bold'>お支払い履歴</Col>
                    <Col>
                      {customer &&
                      <>
                      <a href={`/admin/customer/${customer.public_id}/charges`}
                        className='btn btn-primary btn-sm'>
                        お支払い履歴
                      </a>
                      </>}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className='font-weight-bold'>編集</Col>
                    <Col>
                      {customer &&
                      <>
                        {allowUpdateCustomer === 'Allow' &&
                          <a onClick={() => showEditModal(customer)}
                          className='btn btn-primary btn-sm mb20'>
                          編集
                        </a>}
                      </>}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className='font-weight-bold'>メモ</Col>
                    <Col>
                      {customer &&
                      <>{customer.notes}</>}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row></Row>
        </Container>}
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
