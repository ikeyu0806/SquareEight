import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, ListGroup, Card, Button } from 'react-bootstrap'
import UserPermissionListGroupItem from 'components/molecules/UserPermissionListGroupItem'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { MerchantUserParam } from 'interfaces/MerchantUserParam'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import {  allowReadMerchantUserChanged,
          allowCreateMerchantUserChanged,
          allowUpdateMerchantUserChanged,
          allowDeleteMerchantUserChanged,
          allowUpdateMerchantUserPermissionChanged,
          allowReadReserveFrameChanged,
          allowCreateReserveFrameChanged,
          allowUpdateReserveFrameChanged,
          allowDeleteReserveFrameChanged,
          allowReadReservationChanged,
          allowCreateReservationChanged,
          allowConfirmReservationChanged,
          allowCancelReservationChanged,
          allowReadTicketMasterChanged,
          allowCreateTicketMasterChanged,
          allowUpdateTicketMasterChanged,
          allowDeleteTicketMasterChanged,
          allowReadMonthlyPaymentPlanChanged,
          allowCreateMonthlyPaymentPlanChanged,
          allowUpdateMonthlyPaymentPlanChanged,
          allowDeleteMonthlyPaymentPlanChanged,
          allowReadResourceChanged,
          allowCreateResourceChanged,
          allowUpdateResourceChanged,
          allowDeleteResourceChanged,
          allowReadProductChanged,
          allowCreateProductChanged,
          allowUpdateProductChanged,
          allowDeleteProductChanged,
          allowReadCustomerChanged,
          allowCreateCustomerChanged,
          allowUpdateCustomerChanged,
          allowDeleteCustomerChanged,
          allowReadCustomerGroupChanged,
          allowCreateCustomerGroupChanged,
          allowUpdateCustomerGroupChanged,
          allowDeleteCustomerGroupChanged,
          allowReadMessageTemplateChanged,
          allowCreateMessageTemplateChanged,
          allowUpdateMessageTemplateChanged,
          allowDeleteMessageTemplateChanged,
          allowReadWebpageChanged,
          allowCreateWebpageChanged,
          allowUpdateWebpageChanged,
          allowDeleteWebpageChanged,
          allowReadQuestionnaireMasterChanged,
          allowCreateQuestionnaireMasterChanged,
          allowUpdateQuestionnaireMasterChanged,
          allowDeleteQuestionnaireMasterChanged,
          allowReadQuestionnaireAnswerChanged,
          allowReadPaymentRequestChanged,
          allowCreatePaymentRequestChanged,
          allowReadSalesChanged,
          allowUpdateCreditCardChanged,
          allowReadStripeBusinessInfoChanged,
          allowUpdateStripeBusinessInfoChanged,
          allowReadSystemPlanSubscriptionPaymentsChanged,
          allowUpdateSharedComponentChanged,
          allowUpdateSystemPlanChanged } from 'redux/settingFormMerchantUserPermissionSlice'

const Permission: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [merchantUser, setMerchantUser] = useState<MerchantUserParam>()

  const allowReadMerchantUser = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadMerchantUser)
  const allowCreateMerchantUser = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateMerchantUser)
  const allowUpdateMerchantUser = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateMerchantUser)
  const allowDeleteMerchantUser = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteMerchantUser)
  const allowUpdateMerchantUserPermission = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateMerchantUserPermission)  
  const allowReadReserveFrame = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadReserveFrame)
  const allowCreateReserveFrame = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateReserveFrame)
  const allowUpdateReserveFrame = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateReserveFrame)
  const allowDeleteReserveFrame = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteReserveFrame)
  const allowReadReservation = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadReservation)
  const allowCreateReservation = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateReservation)
  const allowConfirmReservation = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowConfirmReservation)
  const allowCancelReservation = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCancelReservation)
  const allowReadTicketMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadTicketMaster)
  const allowCreateTicketMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateTicketMaster)
  const allowUpdateTicketMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateTicketMaster)
  const allowDeleteTicketMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteTicketMaster)
  const allowReadMonthlyPaymentPlan = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadMonthlyPaymentPlan)
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
  const allowUpdateDeliveryDatetime = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateDeliveryDatetime)
  const allowReadCustomer = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadCustomer)
  const allowCreateCustomer = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateCustomer)
  const allowUpdateCustomer = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateCustomer)
  const allowDeleteCustomer = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteCustomer)
  const allowReadCustomerGroup = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadCustomerGroup)
  const allowCreateCustomerGroup = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateCustomerGroup)
  const allowUpdateCustomerGroup = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateCustomerGroup)
  const allowDeleteCustomerGroup = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteCustomerGroup)
  const allowReadMessageTemplate = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadMessageTemplate)
  const allowCreateMessageTemplate = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateMessageTemplate)
  const allowUpdateMessageTemplate = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateMessageTemplate)
  const allowDeleteMessageTemplate = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteMessageTemplate)
  const allowReadWebpage = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadWebpage)
  const allowCreateWebpage = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateWebpage)
  const allowUpdateWebpage = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateWebpage)
  const allowDeleteWebpage = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteWebpage)
  const allowReadQuestionnaireMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadQuestionnaireMaster)
  const allowCreateQuestionnaireMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreateQuestionnaireMaster)
  const allowUpdateQuestionnaireMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateQuestionnaireMaster)
  const allowDeleteQuestionnaireMaster = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowDeleteQuestionnaireMaster)
  const allowReadQuestionnaireAnswer = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadQuestionnaireAnswer)
  const allowReadPaymentRequest = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadPaymentRequest)
  const allowCreatePaymentRequest = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowCreatePaymentRequest)
  const allowReadSales = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadSales)
  const allowUpdateCreditCard = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateCreditCard)
  const allowReadStripeBusinessInfo = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadStripeBusinessInfo)
  const allowUpdateStripeBusinessInfo = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateStripeBusinessInfo)
  const allowReadSystemPlanSubscriptionPayments = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowReadSystemPlanSubscriptionPayments)
  const allowUpdateSharedComponent = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateSharedComponent)
  const allowUpdateSystemPlan = useSelector((state: RootState) => state.settingFormMerchantUserPermission.allowUpdateSystemPlan)

  useEffect(() => {
    const fetchMerchantUser = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/merchant_users/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data.merchant_user)
        setMerchantUser(response.data.merchant_user)
        dispatch(allowReadMerchantUserChanged(response.data.merchant_user.allow_read_merchant_user))
        dispatch(allowCreateMerchantUserChanged(response.data.merchant_user.allow_create_merchant_user))
        dispatch(allowUpdateMerchantUserChanged(response.data.merchant_user.allow_update_merchant_user))
        dispatch(allowUpdateMerchantUserPermissionChanged(response.data.merchant_user.allow_update_merchant_user_permission))
        dispatch(allowReadReserveFrameChanged(response.data.merchant_user.allow_read_reserve_frame))
        dispatch(allowCreateReserveFrameChanged(response.data.merchant_user.allow_create_reserve_frame))
        dispatch(allowUpdateReserveFrameChanged(response.data.merchant_user.allow_update_reserve_frame))
        dispatch(allowDeleteReserveFrameChanged(response.data.merchant_user.allow_delete_reserve_frame))
        dispatch(allowReadReservationChanged(response.data.merchant_user.allow_read_reservation))
        dispatch(allowCreateReservationChanged(response.data.merchant_user.allow_create_reservation))
        dispatch(allowConfirmReservationChanged(response.data.merchant_user.allow_update_reservation))
        dispatch(allowCancelReservationChanged(response.data.merchant_user.allow_delete_reservation))
        dispatch(allowReadTicketMasterChanged(response.data.merchant_user.allow_read_ticket_master))
        dispatch(allowCreateTicketMasterChanged(response.data.merchant_user.allow_create_ticket_master))
        dispatch(allowUpdateTicketMasterChanged(response.data.merchant_user.allow_update_ticket_master))
        dispatch(allowDeleteTicketMasterChanged(response.data.merchant_user.allow_delete_ticket_master))
        dispatch(allowReadMonthlyPaymentPlanChanged(response.data.merchant_user.allow_read_monthly_payment_plan))
        dispatch(allowCreateMonthlyPaymentPlanChanged(response.data.merchant_user.allow_create_monthly_payment_plan))
        dispatch(allowUpdateMonthlyPaymentPlanChanged(response.data.merchant_user.allow_update_monthly_payment_plan))
        dispatch(allowDeleteMonthlyPaymentPlanChanged(response.data.merchant_user.allow_delete_monthly_payment_plan))
        dispatch(allowReadResourceChanged(response.data.merchant_user.allow_read_resource))
        dispatch(allowCreateResourceChanged(response.data.merchant_user.allow_create_resource))
        dispatch(allowUpdateResourceChanged(response.data.merchant_user.allow_update_resource))
        dispatch(allowDeleteResourceChanged(response.data.merchant_user.allow_delete_resource))
        dispatch(allowReadProductChanged(response.data.merchant_user.allow_read_product))
        dispatch(allowCreateProductChanged(response.data.merchant_user.allow_create_product))
        dispatch(allowUpdateProductChanged(response.data.merchant_user.allow_update_product))
        dispatch(allowDeleteProductChanged(response.data.merchant_user.allow_delete_product))
        dispatch(allowReadCustomerChanged(response.data.merchant_user.allow_read_customer))
        dispatch(allowCreateCustomerChanged(response.data.merchant_user.allow_create_customer))
        dispatch(allowUpdateCustomerChanged(response.data.merchant_user.allow_update_customer))
        dispatch(allowDeleteCustomerChanged(response.data.merchant_user.allow_delete_customer))
        dispatch(allowReadCustomerGroupChanged(response.data.merchant_user.allow_read_customer_group))
        dispatch(allowCreateCustomerGroupChanged(response.data.merchant_user.allow_create_customer_group))
        dispatch(allowUpdateCustomerGroupChanged(response.data.merchant_user.allow_update_customer_group))
        dispatch(allowDeleteCustomerGroupChanged(response.data.merchant_user.allow_delete_customer_group))
        dispatch(allowReadWebpageChanged(response.data.merchant_user.allow_read_webpage))
        dispatch(allowCreateWebpageChanged(response.data.merchant_user.allow_create_webpage))
        dispatch(allowUpdateWebpageChanged(response.data.merchant_user.allow_update_webpage))
        dispatch(allowDeleteWebpageChanged(response.data.merchant_user.allow_delete_webpage))
        dispatch(allowReadQuestionnaireMasterChanged(response.data.merchant_user.allow_read_questionnaire_master))
        dispatch(allowCreateQuestionnaireMasterChanged(response.data.merchant_user.allow_create_questionnaire_master))
        dispatch(allowUpdateQuestionnaireMasterChanged(response.data.merchant_user.allow_update_questionnaire_master))
        dispatch(allowDeleteQuestionnaireMasterChanged(response.data.merchant_user.allow_delete_questionnaire_master))
        dispatch(allowReadQuestionnaireAnswerChanged(response.data.merchant_user.allow_create_questionnaire_master))
        dispatch(allowCreatePaymentRequestChanged(response.data.merchant_user.allow_create_payment_request))
        dispatch(allowReadSalesChanged(response.data.merchant_user.allow_read_payment_sales))
        dispatch(allowUpdateCreditCardChanged(response.data.merchant_user.allow_update_credit_card))
        dispatch(allowReadStripeBusinessInfoChanged(response.data.merchant_user.allow_read_stripe_business_info))
        dispatch(allowUpdateStripeBusinessInfoChanged(response.data.merchant_user.allow_read_merchan))
        dispatch(allowReadSystemPlanSubscriptionPaymentsChanged(response.data.merchant_user.allow_read_system_plan_subscription_payments))
        dispatch(allowUpdateSharedComponentChanged(response.data.merchant_user.allow_update_shared_component))
        dispatch(allowUpdateSystemPlanChanged(response.data.merchant_user.allow_update_system_plan))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchMerchantUser()
  }, [router.query.public_id, cookies._square_eight_merchant_session, dispatch])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/merchant_users/${router.query.public_id}/update_permission`,
    {
      merchant_user: {
        allow_read_merchant_user: allowReadMerchantUser,
        allow_create_merchant_user: allowCreateMerchantUser,
        allow_update_merchant_user: allowUpdateMerchantUser,
        allow_delete_merchant_user: allowDeleteMerchantUser,
        allow_read_reserve_frame: allowReadReserveFrame,
        allow_create_reserve_frame: allowCreateReserveFrame,
        allow_update_reserve_frame: allowUpdateReserveFrame,
        allow_delete_reserve_frame: allowDeleteReserveFrame,
        allow_read_reservation: allowReadReservation,
        allow_create_reservation: allowCreateReservation,
        allow_delete_reservation: allowCancelReservation,
        allow_read_ticket_master: allowReadTicketMaster,
        allow_create_ticket_master: allowCreateTicketMaster,
        allow_update_ticket_master: allowUpdateTicketMaster,
        allow_delete_ticket_master: allowDeleteTicketMaster,
        allow_read_monthly_payment_plan: allowReadMonthlyPaymentPlan,
        allow_create_monthly_payment_plan: allowCreateMonthlyPaymentPlan,
        allow_update_monthly_payment_plan: allowUpdateMonthlyPaymentPlan,
        allow_delete_monthly_payment_plan: allowDeleteMonthlyPaymentPlan,
        allow_read_resource: allowReadResource,
        allow_create_resource: allowCreateResource,
        allow_update_resource: allowUpdateResource,
        allow_delete_resource: allowDeleteResource,
        allow_read_product: allowReadProduct,
        allow_create_product: allowCreateProduct,
        allow_update_product: allowUpdateProduct,
        allow_delete_product: allowDeleteProduct,
        allow_update_delivery_setting: allowUpdateDeliveryDatetime,
        // allow_update_product_shipping_status: allowUpdateProductShippingStatus,
        allow_read_customer: allowReadCustomer,
        allow_create_customer: allowCreateCustomer,
        allow_update_customer: allowUpdateCustomer,
        allow_delete_customer: allowDeleteCustomer,
        allow_read_customer_group: allowReadCustomerGroup,
        allow_create_customer_group: allowCreateCustomerGroup,
        allow_update_customer_group: allowUpdateCustomerGroup,
        allow_delete_customer_group: allowDeleteCustomerGroup,
        allow_read_webpage: allowReadWebpage,
        allow_create_webpage: allowCreateWebpage,
        allow_update_webpage: allowUpdateWebpage,
        allow_delete_webpage: allowDeleteWebpage,
        allow_read_questionnaire_master: allowReadQuestionnaireMaster,
        allow_create_questionnaire_master: allowCreateQuestionnaireMaster,
        allow_update_questionnaire_master: allowUpdateQuestionnaireMaster,
        allow_delete_questionnaire_master: allowDeleteQuestionnaireMaster,
        allow_read_questionnaire_answer: allowReadQuestionnaireAnswer,
        allow_read_sales: allowReadSales,
        allow_read_payment_request: allowReadPaymentRequest,
        allow_create_payment_request: allowCreatePaymentRequest,
        allow_update_credit_card: allowUpdateCreditCard,
        allow_read_stripe_business_info: allowReadStripeBusinessInfo,
        allow_update_stripe_business_info: allowUpdateStripeBusinessInfo,
        allow_read_system_plan_subscription_payments: allowReadSystemPlanSubscriptionPayments,
        allow_update_shared_component: allowUpdateSharedComponent,
        allow_update_system_plan: allowUpdateSystemPlan,
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '保存しました',
        icon: 'info'
      })
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '保存失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}>
          </Col>
          <Col lg={6}>
            <h3>ユーザ権限設定</h3>
            <Card>
              <Card.Body>
                <div>お名前: {merchantUser?.last_name}{merchantUser?.first_name}</div>
                <div>メールアドレス: {merchantUser?.email}</div>
              </Card.Body>
            </Card>
            <ListGroup className='mt20'>
              <UserPermissionListGroupItem
                text={'ユーザ閲覧'}
                onChange={() => dispatch(allowReadMerchantUserChanged(allowReadMerchantUser === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadMerchantUser === 'Allow'} />
              <UserPermissionListGroupItem
                text={'ユーザ登録'}
                onChange={() => dispatch(allowCreateMerchantUserChanged(allowCreateMerchantUser === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCreateMerchantUser === 'Allow'} />
              <UserPermissionListGroupItem
                text={'ユーザ更新'}
                onChange={() => dispatch(allowUpdateMerchantUserChanged(allowUpdateMerchantUser === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowUpdateMerchantUser === 'Allow'} />
              <UserPermissionListGroupItem
                text={'ユーザ削除'}
                onChange={() => dispatch(allowDeleteMerchantUserChanged(allowDeleteMerchantUser === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowDeleteMerchantUser === 'Allow'} />
              <UserPermissionListGroupItem
                text={'ユーザ権限設定'}
                onChange={() => dispatch(allowUpdateMerchantUserPermissionChanged(allowUpdateMerchantUserPermission === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowUpdateMerchantUserPermission === 'Allow'} />
              <UserPermissionListGroupItem
                text={'予約メニュー閲覧'}
                onChange={() => dispatch(allowReadReserveFrameChanged(allowReadReserveFrame === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadReserveFrame === 'Allow'} />
              <UserPermissionListGroupItem
                text={'予約メニュー登録'}
                onChange={() => dispatch(allowCreateReserveFrameChanged(allowCreateReserveFrame === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCreateReserveFrame === 'Allow'} />
              <UserPermissionListGroupItem
                text={'予約メニュー更新'}
                onChange={() => dispatch(allowUpdateReserveFrameChanged(allowUpdateReserveFrame === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowUpdateReserveFrame === 'Allow'} />
              <UserPermissionListGroupItem
                text={'予約メニュー削除'}
                onChange={() => dispatch(allowDeleteReserveFrameChanged(allowDeleteReserveFrame === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowDeleteReserveFrame === 'Allow'} />
              <UserPermissionListGroupItem
                text={'予約閲覧'}
                onChange={() => dispatch(allowReadReservationChanged(allowReadReservation === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadReservation === 'Allow'} />
              <UserPermissionListGroupItem
                text={'予約登録'}
                onChange={() => dispatch(allowCreateReservationChanged(allowCreateReservation === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCreateReservation === 'Allow'} />
              <UserPermissionListGroupItem
                text={'予約確定'}
                onChange={() => dispatch(allowConfirmReservationChanged(allowConfirmReservation === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowConfirmReservation === 'Allow'} />
              <UserPermissionListGroupItem
                text={'予約キャンセル'}
                onChange={() => dispatch(allowCancelReservationChanged(allowCancelReservation === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCancelReservation === 'Allow'} />
              <UserPermissionListGroupItem
                text={'回数券閲覧'}
                onChange={() => dispatch(allowReadTicketMasterChanged(allowReadTicketMaster === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadTicketMaster === 'Allow'} />
              <UserPermissionListGroupItem
                text={'回数券登録'}
                onChange={() => dispatch(allowCreateTicketMasterChanged(allowCreateTicketMaster === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCreateTicketMaster === 'Allow'} />
              <UserPermissionListGroupItem
                text={'回数券登録'}
                onChange={() => dispatch(allowCreateTicketMasterChanged(allowCreateTicketMaster === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCreateTicketMaster === 'Allow'} />
              <UserPermissionListGroupItem
                text={'回数券削除'}
                onChange={() => dispatch(allowDeleteTicketMasterChanged(allowDeleteTicketMaster === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowDeleteTicketMaster === 'Allow'} />
              <UserPermissionListGroupItem
                text={'月額課金プラン閲覧'}
                onChange={() => dispatch(allowReadMonthlyPaymentPlanChanged(allowReadMonthlyPaymentPlan === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadMonthlyPaymentPlan === 'Allow'} />
              <UserPermissionListGroupItem
                text={'月額課金プラン登録'}
                onChange={() => dispatch(allowCreateMonthlyPaymentPlanChanged(allowCreateMonthlyPaymentPlan === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCreateMonthlyPaymentPlan === 'Allow'} />
              <UserPermissionListGroupItem
                text={'月額課金プラン更新'}
                onChange={() => dispatch(allowUpdateMonthlyPaymentPlanChanged(allowUpdateMonthlyPaymentPlan === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowUpdateMonthlyPaymentPlan === 'Allow'} />
              <UserPermissionListGroupItem
                text={'月額課金プラン削除'}
                onChange={() => dispatch(allowDeleteMonthlyPaymentPlanChanged(allowDeleteMonthlyPaymentPlan === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowDeleteMonthlyPaymentPlan === 'Allow'} />
              <UserPermissionListGroupItem
                text={'リソース閲覧'}
                onChange={() => dispatch(allowReadResourceChanged(allowReadResource === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadResource === 'Allow'} />
              <UserPermissionListGroupItem
                text={'リソース登録'}
                onChange={() => dispatch(allowCreateResourceChanged(allowCreateResource === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCreateResource === 'Allow'} />
              <UserPermissionListGroupItem
                text={'リソース更新'}
                onChange={() => dispatch(allowUpdateResourceChanged(allowUpdateResource === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowUpdateResource === 'Allow'} />
              <UserPermissionListGroupItem
                text={'リソース削除'}
                onChange={() => dispatch(allowDeleteResourceChanged(allowDeleteResource === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowDeleteResource === 'Allow'} />
              <UserPermissionListGroupItem
                text={'商品閲覧'}
                onChange={() => dispatch(allowReadProductChanged(allowReadProduct === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadProduct === 'Allow'} />
              <UserPermissionListGroupItem
                text={'商品登録'}
                onChange={() => dispatch(allowCreateProductChanged(allowCreateProduct === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCreateProduct === 'Allow'} />
              <UserPermissionListGroupItem
                text={'商品更新'}
                onChange={() => dispatch(allowUpdateProductChanged(allowUpdateProduct === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowUpdateProduct === 'Allow'} />
              <UserPermissionListGroupItem
                text={'商品削除'}
                onChange={() => dispatch(allowDeleteProductChanged(allowDeleteProduct === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowDeleteProduct === 'Allow'} />
              <UserPermissionListGroupItem
                text={'顧客閲覧'}
                onChange={() => dispatch(allowReadCustomerChanged(allowReadCustomer === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadCustomer === 'Allow'} />
              <UserPermissionListGroupItem
                text={'顧客登録'}
                onChange={() => dispatch(allowCreateCustomerChanged(allowCreateCustomer === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCreateCustomer === 'Allow'} />
              <UserPermissionListGroupItem
                text={'顧客更新'}
                onChange={() => dispatch(allowUpdateCustomerChanged(allowUpdateCustomer === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowUpdateCustomer === 'Allow'} />
              <UserPermissionListGroupItem
                text={'顧客削除'}
                onChange={() => dispatch(allowDeleteCustomerChanged(allowDeleteCustomer === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowDeleteCustomer === 'Allow'} />
              <UserPermissionListGroupItem
                text={'顧客グループ閲覧'}
                onChange={() => dispatch(allowReadCustomerGroupChanged(allowReadCustomerGroup === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadCustomerGroup === 'Allow'} />
              <UserPermissionListGroupItem
                text={'顧客グループ登録'}
                onChange={() => dispatch(allowCreateCustomerGroupChanged(allowCreateCustomerGroup === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCreateCustomerGroup === 'Allow'} />
              <UserPermissionListGroupItem
                text={'顧客グループ更新'}
                onChange={() => dispatch(allowUpdateCustomerGroupChanged(allowUpdateCustomerGroup === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowUpdateCustomerGroup === 'Allow'} />
              <UserPermissionListGroupItem
                text={'顧客グループ削除'}
                onChange={() => dispatch(allowDeleteCustomerGroupChanged(allowDeleteCustomerGroup === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowDeleteCustomerGroup === 'Allow'} />
              <UserPermissionListGroupItem
                text={'メッセージテンプレート閲覧'}
                onChange={() => dispatch(allowReadMessageTemplateChanged(allowReadMessageTemplate === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadMessageTemplate === 'Allow'} />
              <UserPermissionListGroupItem
                text={'メッセージテンプレート登録'}
                onChange={() => dispatch(allowCreateMessageTemplateChanged(allowCreateMessageTemplate === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCreateMessageTemplate === 'Allow'} />
              <UserPermissionListGroupItem
                text={'メッセージテンプレート更新'}
                onChange={() => dispatch(allowUpdateMessageTemplateChanged(allowUpdateMessageTemplate === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowUpdateMessageTemplate === 'Allow'} />
              <UserPermissionListGroupItem
                text={'メッセージテンプレート削除'}
                onChange={() => dispatch(allowDeleteMessageTemplateChanged(allowDeleteMessageTemplate === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowDeleteMessageTemplate === 'Allow'} />
              <UserPermissionListGroupItem
                text={'Webページ閲覧'}
                onChange={() => dispatch(allowReadWebpageChanged(allowReadWebpage === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadWebpage === 'Allow'} />
              <UserPermissionListGroupItem
                text={'Webページ登録'}
                onChange={() => dispatch(allowCreateWebpageChanged(allowCreateWebpage === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCreateWebpage === 'Allow'} />
              <UserPermissionListGroupItem
                text={'Webページ更新'}
                onChange={() => dispatch(allowUpdateWebpageChanged(allowUpdateWebpage === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowUpdateWebpage === 'Allow'} />
              <UserPermissionListGroupItem
                text={'Webページ削除'}
                onChange={() => dispatch(allowDeleteWebpageChanged(allowDeleteWebpage === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowDeleteWebpage === 'Allow'} />
              <UserPermissionListGroupItem
                text={'アンケートマスタ閲覧'}
                onChange={() => dispatch(allowReadQuestionnaireMasterChanged(allowReadQuestionnaireMaster === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadQuestionnaireMaster === 'Allow'} />
              <UserPermissionListGroupItem
                text={'アンケートマスタ登録'}
                onChange={() => dispatch(allowCreateQuestionnaireMasterChanged(allowCreateQuestionnaireMaster === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCreateQuestionnaireMaster === 'Allow'} />
              <UserPermissionListGroupItem
                text={'アンケートマスタ更新'}
                onChange={() => dispatch(allowUpdateQuestionnaireMasterChanged(allowUpdateQuestionnaireMaster === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowUpdateQuestionnaireMaster === 'Allow'} />
              <UserPermissionListGroupItem
                text={'アンケートマスタ削除'}
                onChange={() => dispatch(allowDeleteQuestionnaireMasterChanged(allowDeleteQuestionnaireMaster === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowDeleteQuestionnaireMaster === 'Allow'} />
              <UserPermissionListGroupItem
                text={'アンケート回答閲覧'}
                onChange={() => dispatch(allowReadQuestionnaireAnswerChanged(allowReadQuestionnaireAnswer === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadQuestionnaireAnswer === 'Allow'} />
              <UserPermissionListGroupItem
                text={'決済リクエスト閲覧'}
                onChange={() => dispatch(allowReadPaymentRequestChanged(allowReadPaymentRequest === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadPaymentRequest === 'Allow'} />
              <UserPermissionListGroupItem
                text={'決済リクエスト登録'}
                onChange={() => dispatch(allowCreatePaymentRequestChanged(allowCreatePaymentRequest === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowCreatePaymentRequest === 'Allow'} />
              <UserPermissionListGroupItem
                text={'ページ共通レイアウト設定'}
                onChange={() => dispatch(allowReadSystemPlanSubscriptionPaymentsChanged(allowReadSystemPlanSubscriptionPayments === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadSystemPlanSubscriptionPayments === 'Allow'} />
              <UserPermissionListGroupItem
                text={'売り上げ閲覧'}
                onChange={() => dispatch(allowReadSalesChanged(allowReadSales === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadSales === 'Allow'} />
              <UserPermissionListGroupItem
                text={'クレジットカード登録'}
                onChange={() => dispatch(allowUpdateCreditCardChanged(allowUpdateCreditCard === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowUpdateCreditCard === 'Allow'} />
              <UserPermissionListGroupItem
                text={'事業情報閲覧'}
                onChange={() => dispatch(allowReadStripeBusinessInfoChanged(allowReadStripeBusinessInfo === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadStripeBusinessInfo === 'Allow'} />
              <UserPermissionListGroupItem
                text={'事業情報登録'}
                onChange={() => dispatch(allowUpdateStripeBusinessInfoChanged(allowUpdateStripeBusinessInfo === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowUpdateStripeBusinessInfo === 'Allow'} />
              <UserPermissionListGroupItem
                text={'支払い履歴閲覧'}
                onChange={() => dispatch(allowReadSystemPlanSubscriptionPaymentsChanged(allowReadSystemPlanSubscriptionPayments === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowReadSystemPlanSubscriptionPayments === 'Allow'} />
              <UserPermissionListGroupItem
                text={'SquareEightプラン変更'}
                onChange={() => dispatch(allowUpdateSystemPlanChanged(allowUpdateSystemPlan === 'Allow' ? 'Forbid' : 'Allow' ))}
                checked={allowUpdateSystemPlan === 'Allow'} />
            </ListGroup>
            <Button className='mt10' onClick={onSubmit}>設定を保存する</Button>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Permission
