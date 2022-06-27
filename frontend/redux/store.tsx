import { configureStore } from '@reduxjs/toolkit'
import homepageReducer from './homepageSlice'
import alertReducer from './alertSlice'
import ticketMasterReducer from './ticketMasterSlice'
import stripeCompanyAccountSlice from './stripeCompanyAccountSlice'
import stripeIndividualAccountSlice from './stripeIndividualAccountSlice'
import stripeExternalAccountsSlice from './stripeExternalAccountsSlice'

export const store = configureStore({
  reducer: {
    homepage: homepageReducer,
    alert: alertReducer,
    ticketMaster: ticketMasterReducer,
    stripeCompanyAccount: stripeCompanyAccountSlice,
    stripeIndividualAccount: stripeIndividualAccountSlice,
    stripeExternalAccount: stripeExternalAccountsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
