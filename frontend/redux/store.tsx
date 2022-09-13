import { configureStore } from '@reduxjs/toolkit'
import webpageReducer from './webpageSlice'
import alertReducer from './alertSlice'
import ticketMasterReducer from './ticketMasterSlice'
import productReducer from './productSlice'
import stripeAccountSlice from './stripeAccountSlice'
import stripeCompanyAccountSlice from './stripeCompanyAccountSlice'
import stripeIndividualAccountSlice from './stripeIndividualAccountSlice'
import stripeExternalAccountsSlice from './stripeExternalAccountsSlice'
import monthlyPaymentPlanReducer from './monthlyPaymentPlanSlice'
import resourceReducer from './resourceSlice'
import reserveFrameReducer from './reserveFrameSlice'
import currentMerchantUserReducer from './currentMerchantUserSlice'
import currentEndUserReducer from './currentEndUserSlice'
import currentSystemAdminUserReducer from './currentSystemAdminUserSlice'
import deliveryTargetReducer from './deliveryTargetSlice'
import customerReducer from './customerSlice'
import questionnaireMasterReducer from './questionnaireMasterSlice'
import messageTemplateReducer from './messageTemplateSlice'
import dashboardReducer from './dashboardSlice'
import sharedComponentReducer from './sharedComponentSlice'

export const store = configureStore({
  reducer: {
    webpage: webpageReducer,
    alert: alertReducer,
    ticketMaster: ticketMasterReducer,
    product: productReducer,
    stripeCompanyAccount: stripeCompanyAccountSlice,
    stripeAccount: stripeAccountSlice,
    stripeIndividualAccount: stripeIndividualAccountSlice,
    stripeExternalAccount: stripeExternalAccountsSlice,
    monthlyPaymentPlan: monthlyPaymentPlanReducer,
    resource: resourceReducer,
    reserveFrame: reserveFrameReducer,
    currentMerchantUser: currentMerchantUserReducer,
    currentEndUser: currentEndUserReducer,
    currentSystemAdminUser: currentSystemAdminUserReducer,
    deliveryTarget: deliveryTargetReducer,
    customer: customerReducer,
    questionnaireMaster: questionnaireMasterReducer,
    messageTemplate: messageTemplateReducer,
    dashboard: dashboardReducer,
    sharedComponent: sharedComponentReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
