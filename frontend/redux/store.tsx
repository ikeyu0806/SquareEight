import { configureStore } from '@reduxjs/toolkit'
import homepageReducer from './homepageSlice'
import alertReducer from './alertSlice'
import ticketMasterReducer from './ticketMasterSlice'
import stripeCompanyAccountSlice from './stripeCompanyAccountSlice'
import stripeIndividualAccountSlice from './stripeIndividualAccountSlice'
import stripeExternalAccountsSlice from './stripeExternalAccountsSlice'
import monthlyPaymentPlanReducer from './monthlyPaymentPlanSlice'
import businessHourReducer from './businessHourSlice'
import resourceReducer from './resourceSlice'
import reserveFrameReducer from './reserveFrameSlice'

export const store = configureStore({
  reducer: {
    homepage: homepageReducer,
    alert: alertReducer,
    ticketMaster: ticketMasterReducer,
    stripeCompanyAccount: stripeCompanyAccountSlice,
    stripeIndividualAccount: stripeIndividualAccountSlice,
    stripeExternalAccount: stripeExternalAccountsSlice,
    monthlyPaymentPlan: monthlyPaymentPlanReducer,
    businessHour: businessHourReducer,
    resource: resourceReducer,
    reserveFrame: reserveFrameReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
