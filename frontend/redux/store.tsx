import { configureStore } from '@reduxjs/toolkit'
import webpageReducer from './webpageSlice'
import accountReducer from './accountSlice'
import alertReducer from './alertSlice'
import ticketMasterReducer from './ticketMasterSlice'
import productReducer from './productSlice'
import stripeAccountSlice from './stripeAccountSlice'
import stripeCompanyAccountSlice from './stripeCompanyAccountSlice'
import stripeIndividualAccountSlice from './stripeIndividualAccountSlice'
import stripeExternalAccountsSlice from './stripeExternalAccountsSlice'
import stripeBusinessInfoSlice from './stripeBusinessInfoSlice'
import monthlyPaymentPlanReducer from './monthlyPaymentPlanSlice'
import resourceReducer from './resourceSlice'
import reserveFrameReducer from './reserveFrameSlice'
import reservationReducer from './reservationSlice'
import currentMerchantUserReducer from './currentMerchantUserSlice'
import currentEndUserReducer from './currentEndUserSlice'
import currentSystemAdminUserReducer from './currentSystemAdminUserSlice'
import deliveryTargetReducer from './deliveryTargetSlice'
import customerReducer from './customerSlice'
import customerGroupReducer from './customerGroupSlice'
import questionnaireMasterReducer from './questionnaireMasterSlice'
import messageTemplateReducer from './messageTemplateSlice'
import dashboardReducer from './dashboardSlice'
import sharedComponentReducer from './sharedComponentSlice'
import deliveryDatetimeReducer from './deliveryDatetimeSlice'
import paymentRequestReducer from './paymentRequestSlice'
import merchantUserPermissionReducer from './merchantUserPermissionSlice'
import settingFormMerchantUserPermissionReducer from './settingFormMerchantUserPermissionSlice'
import lineOfficialAccountReducer from './lineOfficialAccountSlice'
import lineUserReducer from './lineUserSlice'
import htmlMailTemplateReducer from './htmlMailTemplateSlice'
import sendMailReducer from './sendMailSlice'

export const store = configureStore({
  reducer: {
    webpage: webpageReducer,
    account: accountReducer,
    alert: alertReducer,
    ticketMaster: ticketMasterReducer,
    product: productReducer,
    stripeCompanyAccount: stripeCompanyAccountSlice,
    stripeAccount: stripeAccountSlice,
    stripeIndividualAccount: stripeIndividualAccountSlice,
    stripeExternalAccount: stripeExternalAccountsSlice,
    stripeBusinessInfo: stripeBusinessInfoSlice,
    monthlyPaymentPlan: monthlyPaymentPlanReducer,
    resource: resourceReducer,
    reserveFrame: reserveFrameReducer,
    reservation: reservationReducer,
    currentMerchantUser: currentMerchantUserReducer,
    currentEndUser: currentEndUserReducer,
    currentSystemAdminUser: currentSystemAdminUserReducer,
    deliveryTarget: deliveryTargetReducer,
    customer: customerReducer,
    customerGroup: customerGroupReducer,
    questionnaireMaster: questionnaireMasterReducer,
    messageTemplate: messageTemplateReducer,
    dashboard: dashboardReducer,
    sharedComponent: sharedComponentReducer,
    deliveryDatetime: deliveryDatetimeReducer,
    paymentRequest: paymentRequestReducer,
    merchantUserPermission: merchantUserPermissionReducer,
    settingFormMerchantUserPermission: settingFormMerchantUserPermissionReducer,
    lineOfficialAccount: lineOfficialAccountReducer,
    lineUser: lineUserReducer,
    htmlMailTemplate: htmlMailTemplateReducer,
    sendMail: sendMailReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
