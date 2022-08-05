import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginStatus } from '../interfaces/LoginStatus'
import { StripeEnableStatus } from 'interfaces/StripeEnableStatus'

export const currentMerchantUserSlice = createSlice({
  name: 'currentMerchantUser',
  initialState: {
    id: '',
    accountId: '',
    email: '',
    stripeAccountEnable: 'Unconfirmed' as StripeEnableStatus,
    stripeCustomerEnable: 'Unconfirmed' as StripeEnableStatus,
    loginStatus: 'Unconfirmed' as LoginStatus
  },
  reducers: {
    idChanged: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    accountIdChanged: (state, action: PayloadAction<string>) => {
      state.accountId = action.payload
    },
    emailChanged: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    stripeAccountEnableChanged: (state, action: PayloadAction<StripeEnableStatus>) => {
      state.stripeAccountEnable = action.payload
    },
    stripeCustomerEnableChanged: (state, action: PayloadAction<StripeEnableStatus>) => {
      state.stripeCustomerEnable = action.payload
    },
    loginStatusChanged: (state, action: PayloadAction<LoginStatus>) => {
      state.loginStatus = action.payload
    },
  },
})

export const { idChanged } = currentMerchantUserSlice.actions
export const { accountIdChanged } = currentMerchantUserSlice.actions
export const { emailChanged } = currentMerchantUserSlice.actions
export const { stripeAccountEnableChanged } = currentMerchantUserSlice.actions
export const { stripeCustomerEnableChanged } = currentMerchantUserSlice.actions
export const { loginStatusChanged } = currentMerchantUserSlice.actions

export default currentMerchantUserSlice.reducer
