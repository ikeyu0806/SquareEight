import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginStatus } from '../interfaces/LoginStatus'
import { StripeEnableStatus } from 'interfaces/StripeEnableStatus'
import { StripePaymentMethodsParam } from 'interfaces/StripePaymentMethodsParam'

export const currentMerchantUserSlice = createSlice({
  name: 'currentMerchantUser',
  initialState: {
    id: '',
    accountId: '',
    email: '',
    servicePlan: '',
    defaultPaymentMethodId: '',
    isRootUser: false,
    paymentMethods: [] as StripePaymentMethodsParam[],
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
    servicePlanChanged: (state, action: PayloadAction<string>) => {
      state.servicePlan = action.payload
    },
    defaultPaymentMethodIdChanged: (state, action: PayloadAction<string>) => {
      state.defaultPaymentMethodId = action.payload
    },
    isRootUserChanged: (state, action: PayloadAction<boolean>) => {
      state.isRootUser = action.payload
    },
    paymentMethodsChanged: (state, action: PayloadAction<StripePaymentMethodsParam[]>) => {
      state.paymentMethods = action.payload
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
export const { servicePlanChanged } = currentMerchantUserSlice.actions
export const { defaultPaymentMethodIdChanged } = currentMerchantUserSlice.actions
export const { isRootUserChanged } = currentMerchantUserSlice.actions
export const { paymentMethodsChanged } = currentMerchantUserSlice.actions
export const { stripeAccountEnableChanged } = currentMerchantUserSlice.actions
export const { stripeCustomerEnableChanged } = currentMerchantUserSlice.actions
export const { loginStatusChanged } = currentMerchantUserSlice.actions

export default currentMerchantUserSlice.reducer
