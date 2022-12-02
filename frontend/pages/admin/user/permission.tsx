import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, ListGroup, Form } from 'react-bootstrap'
import UserPermissionListGroupItem from 'components/molecules/UserPermissionListGroupItem'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import {  allowReadMerchantUserChanged,
          allowCreateMerchantUserChanged } from 'redux/settingFormMerchantUserPermissionSlice'

const Permission: NextPage = () => {
  const dispatch = useDispatch()
  const allowReadMerchantUser = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadMerchantUser)
  const allowCreateMerchantUser = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateMerchantUser)
  const allowUpdateMerchantUser = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateMerchantUser)
  const allowDeleteMerchantUser = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteMerchantUser)
  const allowReadReserveFrame = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadReserveFrame)
  const allowCreateReserveFrame = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateReserveFrame)
  const allowReadReservation = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadReservation)
  const allowCreateReservation = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateReservation)
  const allowDeleteReservation = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteReservation)
  const allowReadTicketMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadTicketMaster)
  const allowCreateTicketMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateTicketMaster)
  const allowDeleteTicketMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteTicketMaster)
  const allowCreateMonthlyPaymentPlan = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateMonthlyPaymentPlan)
  const allowUpdateMonthlyPaymentPlan = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateMonthlyPaymentPlan)
  const allowDeleteMonthlyPaymentPlan = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteMonthlyPaymentPlan)
  const allowReadResource = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadResource)
  const allowCreateResource = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateResource)
  const allowUpdateResource = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateResource)
  const allowDeleteResource = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteResource)
  const allowReadProduct = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadProduct)
  const allowCreateProduct = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateProduct)
  const allowUpdateProduct = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateProduct)
  const allowDeleteProduct = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteProduct)
  const allowUpdateDeliveryTarget = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateDeliveryTarget)
  const allowReadCustomer = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadCustomer)
  const allowCreateCustomer = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateCustomer)
  const allowUpdateCustomer = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateCustomer)
  const allowDeleteCustomer = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteCustomer)
  const allowReadCustomerGroup = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadCustomerGroup)
  const allowCreateCustomerGroup = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateCustomerGroup)
  const allowUpdateCustomerGroup = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateCustomerGroup)
  const allowDeleteCustomerGroup = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteCustomerGroup)
  const allowReadWebpage = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadWebpage)
  const allowCreateWebpage = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateWebpage)
  const allowUpdateWebpage = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateWebpage)
  const allowDeleteWebpage = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteWebpage)
  const allowReadQuestionnaireMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadQuestionnaireMaster)
  const allowCreateQuestionnaireMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateQuestionnaireMaster)
  const allowUpdateQuestionnaireMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateQuestionnaireMaster)
  const allowDeleteQuestionnaireMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteQuestionnaireMaster)
  const allowReadQuestionnaireAnswer = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadQuestionnaireAnswer)
  const allowCreatePaymentRequest = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreatePaymentRequest)
  const allowReadPaymentSales = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadPaymentSales)
  const allowUpdateCreditCard = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateCreditCard)
  const allowReadStripeBusinessInfo = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadStripeBusinessInfo)
  const allowUpdateStripeBusinessInfo = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateStripeBusinessInfo)

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={4}>
          </Col>
          <Col lg={4}>
            <ListGroup>
              <UserPermissionListGroupItem
                text={'ユーザ閲覧'}
                onChange={() => dispatch(allowReadMerchantUserChanged(allowReadMerchantUser === 'Allow' ? 'Forbit' : 'Allow' ))}
                checked={allowReadMerchantUser === 'Allow'} />
              <UserPermissionListGroupItem
                text={'ユーザ登録'}
                onChange={() => dispatch(allowCreateMerchantUserChanged(allowCreateMerchantUser === 'Allow' ? 'Forbit' : 'Allow' ))}
                checked={allowCreateMerchantUser === 'Allow'} />
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Permission
