import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginStatus } from '../interfaces/LoginStatus'
import { StripePaymentMethodsParam } from 'interfaces/StripePaymentMethodsParam'
import { StripeEnableStatus } from 'interfaces/StripeEnableStatus'

export const currentEndUserSlice = createSlice({
  name: 'currentEndUser',
  initialState: {
    id: '',
    email: '',
    loginStatus: 'Unconfirmed' as LoginStatus,
    defaultPaymentMethodId: '',
    stripeCustomerEnable: 'Unconfirmed' as StripeEnableStatus,
    paymentMethods: [] as StripePaymentMethodsParam[]
  },
  reducers: {
    idChanged: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    emailChanged: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    loginStatusChanged: (state, action: PayloadAction<LoginStatus>) => {
      state.loginStatus = action.payload
    },
    defaultPaymentMethodIdChanged: (state, action: PayloadAction<string>) => {
      state.defaultPaymentMethodId = action.payload
    },
    stripeCustomerEnableChanged: (state, action: PayloadAction<StripeEnableStatus>) => {
      state.stripeCustomerEnable = action.payload
    },
    paymentMethodsChanged: (state, action: PayloadAction<StripePaymentMethodsParam[]>) => {
      state.paymentMethods = action.payload
    },
  },
})

export const { idChanged } = currentEndUserSlice.actions
export const { emailChanged } = currentEndUserSlice.actions
export const { loginStatusChanged } = currentEndUserSlice.actions
export const { defaultPaymentMethodIdChanged } = currentEndUserSlice.actions
export const { stripeCustomerEnableChanged } = currentEndUserSlice.actions
export const { paymentMethodsChanged } = currentEndUserSlice.actions

export default currentEndUserSlice.reducer
