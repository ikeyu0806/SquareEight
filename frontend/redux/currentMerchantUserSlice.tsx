import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginStatus } from '../interfaces/LoginStatus'

export const currentMerchantUserSlice = createSlice({
  name: 'currentMerchantUser',
  initialState: {
    id: '',
    accountId: '',
    email: '',
    stripeAccountEnable: false,
    stripeCustomerEnable: false,
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
    stripeAccountEnableChanged: (state, action: PayloadAction<boolean>) => {
      state.stripeAccountEnable = action.payload
    },
    stripeCustomerEnableChanged: (state, action: PayloadAction<boolean>) => {
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
