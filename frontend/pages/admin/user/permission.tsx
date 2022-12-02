import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, ListGroup, Form } from 'react-bootstrap'
import UserPermissionListGroupItem from 'components/molecules/UserPermissionListGroupItem'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { allowReadMerchantUserChanged } from 'redux/merchantUserPermissionSlice'

const Permission: NextPage = () => {
  const dispatch = useDispatch()
  const allowReadMerchantUser = useSelector((state: RootState) => state.merchantUserPermission.allowReadMerchantUser)
  const allowCreateMerchantUser = useSelector((state: RootState) => state.merchantUserPermission.allowCreateMerchantUser)
  const allowUpdateMerchantUser = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateMerchantUser)
  const allowDeleteMerchantUser = useSelector((state: RootState) => state.merchantUserPermission.allowDeleteMerchantUser)
  const allowReadReserveFrame = useSelector((state: RootState) => state.merchantUserPermission.allowReadReserveFrame)
  const allowCreateReserveFrame = useSelector((state: RootState) => state.merchantUserPermission.allowCreateReserveFrame)
  const allowReadReservation = useSelector((state: RootState) => state.merchantUserPermission.allowReadReservation)
  const allowCreateReservation = useSelector((state: RootState) => state.merchantUserPermission.allowCreateReservation)
  const allowDeleteReservation = useSelector((state: RootState) => state.merchantUserPermission.allowDeleteReservation)
  const allowReadTicketMaster = useSelector((state: RootState) => state.merchantUserPermission.allowReadTicketMaster)
  const allowCreateTicketMaster = useSelector((state: RootState) => state.merchantUserPermission.allowCreateTicketMaster)
  const allowDeleteTicketMaster = useSelector((state: RootState) => state.merchantUserPermission.allowDeleteTicketMaster)
  const allowCreateMonthlyPaymentPlan = useSelector((state: RootState) => state.merchantUserPermission.allowCreateMonthlyPaymentPlan)
  const allowUpdateMonthlyPaymentPlan = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateMonthlyPaymentPlan)
  const allowDeleteMonthlyPaymentPlan = useSelector((state: RootState) => state.merchantUserPermission.allowDeleteMonthlyPaymentPlan)
  const allowReadResource = useSelector((state: RootState) => state.merchantUserPermission.allowReadResource)
  const allowCreateResource = useSelector((state: RootState) => state.merchantUserPermission.allowCreateResource)
  const allowUpdateResource = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateResource)
  const allowDeleteResource = useSelector((state: RootState) => state.merchantUserPermission.allowDeleteResource)
  const allowReadProduct = useSelector((state: RootState) => state.merchantUserPermission.allowReadProduct)
  const allowCreateProduct = useSelector((state: RootState) => state.merchantUserPermission.allowCreateProduct)
  const allowUpdateProduct = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateProduct)
  const allowDeleteProduct = useSelector((state: RootState) => state.merchantUserPermission.allowDeleteProduct)
  const allowUpdateDeliveryTarget = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateDeliveryTarget)
  const allowReadCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowReadCustomer)
  const allowCreateCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowCreateCustomer)
  const allowUpdateCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateCustomer)
  const allowDeleteCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowDeleteCustomer)
  const allowReadCustomerGroup = useSelector((state: RootState) => state.merchantUserPermission.allowReadCustomerGroup)
  const allowCreateCustomerGroup = useSelector((state: RootState) => state.merchantUserPermission.allowCreateCustomerGroup)
  const allowUpdateCustomerGroup = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateCustomerGroup)
  const allowDeleteCustomerGroup = useSelector((state: RootState) => state.merchantUserPermission.allowDeleteCustomerGroup)
  const allowReadWebpage = useSelector((state: RootState) => state.merchantUserPermission.allowReadWebpage)
  const allowCreateWebpage = useSelector((state: RootState) => state.merchantUserPermission.allowCreateWebpage)
  const allowUpdateWebpage = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateWebpage)
  const allowDeleteWebpage = useSelector((state: RootState) => state.merchantUserPermission.allowDeleteWebpage)
  const allowReadQuestionnaireMaster = useSelector((state: RootState) => state.merchantUserPermission.allowReadQuestionnaireMaster)
  const allowCreateQuestionnaireMaster = useSelector((state: RootState) => state.merchantUserPermission.allowCreateQuestionnaireMaster)
  const allowUpdateQuestionnaireMaster = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateQuestionnaireMaster)
  const allowDeleteQuestionnaireMaster = useSelector((state: RootState) => state.merchantUserPermission.allowDeleteQuestionnaireMaster)
  const allowReadQuestionnaireAnswer = useSelector((state: RootState) => state.merchantUserPermission.allowReadQuestionnaireAnswer)
  const allowCreatePaymentRequest = useSelector((state: RootState) => state.merchantUserPermission.allowCreatePaymentRequest)
  const allowReadPaymentSales = useSelector((state: RootState) => state.merchantUserPermission.allowReadPaymentSales)
  const allowUpdateCreditCard = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateCreditCard)
  const allowReadStripeBusinessInfo = useSelector((state: RootState) => state.merchantUserPermission.allowReadStripeBusinessInfo)
  const allowUpdateStripeBusinessInfo = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateStripeBusinessInfo)

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={4}>
          </Col>
          <Col lg={4}>
            <ListGroup>
              <UserPermissionListGroupItem
                onChange={() => dispatch(allowReadMerchantUserChanged(allowReadMerchantUser === 'Allow' ? 'Forbit' : 'Allow' ))}
                checked={allowReadMerchantUser === 'Allow'} />
              <ListGroup.Item>
                <Row>
                  <Col>
                    ユーザ登録
                  </Col>
                  <Col>
                    <Row>
                      <Col sm={2}></Col>
                      <Col>
                        <Form.Check type='switch'></Form.Check>
                      </Col>
                      <Col>
                        <span>有効</span>
                      </Col>
                      <Col sm={1}></Col>
                    </Row>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Permission
