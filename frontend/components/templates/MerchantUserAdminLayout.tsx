import { ReactNode, useEffect } from 'react'
import AdminNavbarTemplate from 'components/organisms/AdminNavbarTemplate'
import RegularFooter from 'components/organisms/RegularFooter'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import WithoutSessionLayout from './WithoutSessionLayout'
import { loginStatusChanged,
         servicePlanChanged,
         emailChanged,
         isRootUserChanged,
         stripeAccountEnableChanged,
         stripeCustomerEnableChanged } from 'redux/currentMerchantUserSlice'
import {  allowReadMerchantUserChanged,
          allowCreateMerchantUserChanged,
          allowUpdateMerchantUserChanged,
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
          allowUpdateDeliveryDatetimeChanged,
          allowReadCustomerChanged,
          allowCreateCustomerChanged,
          allowUpdateCustomerChanged,
          allowDeleteCustomerChanged,
          allowReadCustomerGroupChanged,
          allowCreateCustomerGroupChanged,
          allowUpdateCustomerGroupChanged,
          allowDeleteCustomerGroupChanged,
          allowReadMessageTemplateChanged,
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
          allowUpdateSharedComponentChanged,
          allowReadSalesChanged,
          allowUpdateCreditCardChanged,
          allowReadStripeBusinessInfoChanged,
          allowReadSystemPlanSubscriptionPaymentsChanged,
          allowUpdateStripeBusinessInfoChanged, } from 'redux/merchantUserPermissionSlice'

interface Props {
  children: ReactNode
}

const MerchantUserAdminLayout = ({children}: Props): JSX.Element => {
  const merchantUserLoginStatus = useSelector((state: RootState) => state.currentMerchantUser.loginStatus)
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/merchant/sessions`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      dispatch(loginStatusChanged('Login'))
      dispatch(stripeAccountEnableChanged(response.data.user.stripe_account_enable ? 'Enable' : 'Disable'))
      dispatch(stripeCustomerEnableChanged(response.data.user.stripe_customer_enable ? 'Enable' : 'Disable'))
      dispatch(servicePlanChanged(response.data.service_plan))
      dispatch(emailChanged(response.data.user.email))
      dispatch(isRootUserChanged(response.data.user.is_root_user))
      // 権限
      dispatch(allowReadMerchantUserChanged(response.data.user.allow_read_merchant_user))
      dispatch(allowCreateMerchantUserChanged(response.data.user.allow_create_merchant_user))
      dispatch(allowUpdateMerchantUserChanged(response.data.user.allow_update_merchant_user))
      dispatch(allowUpdateMerchantUserPermissionChanged(response.data.user.allow_update_merchant_user_permission))
      dispatch(allowReadReserveFrameChanged(response.data.user.allow_read_reserve_frame))
      dispatch(allowCreateReserveFrameChanged(response.data.user.allow_create_reserve_frame))
      dispatch(allowUpdateReserveFrameChanged(response.data.user.allow_update_reserve_frame))
      dispatch(allowDeleteReserveFrameChanged(response.data.user.allow_delete_reserve_frame))
      dispatch(allowReadReservationChanged(response.data.user.allow_read_reservation))
      dispatch(allowCreateReservationChanged(response.data.user.allow_create_reservation))
      dispatch(allowConfirmReservationChanged(response.data.user.allow_confirm_reservation))
      dispatch(allowCancelReservationChanged(response.data.user.allow_cancel_reservation))
      dispatch(allowReadTicketMasterChanged(response.data.user.allow_read_ticket_master))
      dispatch(allowCreateTicketMasterChanged(response.data.user.allow_create_ticket_master))
      dispatch(allowUpdateTicketMasterChanged(response.data.user.allow_update_ticket_master))
      dispatch(allowDeleteTicketMasterChanged(response.data.user.allow_delete_ticket_master))
      dispatch(allowReadMonthlyPaymentPlanChanged(response.data.user.allow_read_monthly_payment_plan))
      dispatch(allowCreateMonthlyPaymentPlanChanged(response.data.user.allow_create_monthly_payment_plan))
      dispatch(allowUpdateMonthlyPaymentPlanChanged(response.data.user.allow_update_monthly_payment_plan))
      dispatch(allowDeleteMonthlyPaymentPlanChanged(response.data.user.allow_delete_monthly_payment_plan))
      dispatch(allowReadResourceChanged(response.data.user.allow_read_resource))
      dispatch(allowCreateResourceChanged(response.data.user.allow_create_resource))
      dispatch(allowUpdateResourceChanged(response.data.user.allow_update_resource))
      dispatch(allowDeleteResourceChanged(response.data.user.allow_delete_resource))
      dispatch(allowReadProductChanged(response.data.user.allow_read_product))
      dispatch(allowCreateProductChanged(response.data.user.allow_create_product))
      dispatch(allowUpdateProductChanged(response.data.user.allow_update_product))
      dispatch(allowDeleteProductChanged(response.data.user.allow_delete_product))
      dispatch(allowUpdateDeliveryDatetimeChanged(response.data.user.allow_update_delivery_datetime))
      
      dispatch(allowReadCustomerChanged(response.data.user.allow_read_customer))
      dispatch(allowCreateCustomerChanged(response.data.user.allow_create_customer))
      dispatch(allowUpdateCustomerChanged(response.data.user.allow_update_customer))
      dispatch(allowDeleteCustomerChanged(response.data.user.allow_delete_customer))
      dispatch(allowReadCustomerGroupChanged(response.data.user.allow_read_customer_group))
      dispatch(allowCreateCustomerGroupChanged(response.data.user.allow_create_customer_group))
      dispatch(allowUpdateCustomerGroupChanged(response.data.user.allow_update_customer_group))
      dispatch(allowDeleteCustomerGroupChanged(response.data.user.allow_delete_customer_group))
      dispatch(allowReadMessageTemplateChanged(response.data.user.allow_read_message_template))
      dispatch(allowReadWebpageChanged(response.data.user.allow_read_webpage))
      dispatch(allowCreateWebpageChanged(response.data.user.allow_create_webpage))
      dispatch(allowUpdateWebpageChanged(response.data.user.allow_update_webpage))
      dispatch(allowDeleteWebpageChanged(response.data.user.allow_delete_webpage))
      dispatch(allowReadQuestionnaireMasterChanged(response.data.user.allow_read_questionnaire_master))
      dispatch(allowCreateQuestionnaireMasterChanged(response.data.user.allow_create_questionnaire_master))
      dispatch(allowUpdateQuestionnaireMasterChanged(response.data.user.allow_update_questionnaire_master))
      dispatch(allowDeleteQuestionnaireMasterChanged(response.data.user.allow_delete_questionnaire_master))
      dispatch(allowReadQuestionnaireAnswerChanged(response.data.user.allow_create_questionnaire_master))
      dispatch(allowReadPaymentRequestChanged(response.data.user.allow_read_payment_request))
      dispatch(allowCreatePaymentRequestChanged(response.data.user.allow_create_payment_request))
      dispatch(allowUpdateSharedComponentChanged(response.data.user.allow_update_shared_component))
      dispatch(allowReadSalesChanged(response.data.user.allow_read_sales))
      dispatch(allowUpdateCreditCardChanged(response.data.user.allow_update_credit_card))
      dispatch(allowReadStripeBusinessInfoChanged(response.data.user.allow_read_stripe_business_info))
      dispatch(allowUpdateStripeBusinessInfoChanged(response.data.user.allow_read_merchan))
      dispatch(allowReadSystemPlanSubscriptionPaymentsChanged(response.data.user.allow_read_system_plan_subscription_payments))
    }).catch((e) => {
      dispatch(loginStatusChanged('Logout'))
    })
  }, [dispatch, cookies._square_eight_merchant_session, merchantUserLoginStatus])

  return (
    <>
      {merchantUserLoginStatus === 'Login'
        ? <><AdminNavbarTemplate></AdminNavbarTemplate><br/>{children}<RegularFooter></RegularFooter></>
        :
        merchantUserLoginStatus === 'Logout'
          ? <WithoutSessionLayout><div className='text-center mt30 mb30'>ログインしてください</div></WithoutSessionLayout>
          : <></>
      }
    </>
  )
}

export default MerchantUserAdminLayout
