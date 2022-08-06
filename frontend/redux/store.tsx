import { configureStore } from '@reduxjs/toolkit'
import homepageReducer from './homepageSlice'
import alertReducer from './alertSlice'
import ticketMasterReducer from './ticketMasterSlice'
import productReducer from './productSlice'
import stripeCompanyAccountSlice from './stripeCompanyAccountSlice'
import stripeIndividualAccountSlice from './stripeIndividualAccountSlice'
import stripeExternalAccountsSlice from './stripeExternalAccountsSlice'
import monthlyPaymentPlanReducer from './monthlyPaymentPlanSlice'
import businessHourReducer from './businessHourSlice'
import resourceReducer from './resourceSlice'
import reserveFrameReducer from './reserveFrameSlice'
import currentMerchantUserReducer from './currentMerchantUserSlice'
import currentEndUserReducer from './currentEndUserSlice'
import currentSystemAdminUserReducer from './currentSystemAdminUserSlice'

export const store = configureStore({
  reducer: {
    homepage: homepageReducer,
    alert: alertReducer,
    ticketMaster: ticketMasterReducer,
    product: productReducer,
    stripeCompanyAccount: stripeCompanyAccountSlice,
    stripeIndividualAccount: stripeIndividualAccountSlice,
    stripeExternalAccount: stripeExternalAccountsSlice,
    monthlyPaymentPlan: monthlyPaymentPlanReducer,
    businessHour: businessHourReducer,
    resource: resourceReducer,
    reserveFrame: reserveFrameReducer,
    currentMerchantUser: currentMerchantUserReducer,
    currentEndUser: currentEndUserReducer,
    currentSystemAdminUser: currentSystemAdminUserReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
