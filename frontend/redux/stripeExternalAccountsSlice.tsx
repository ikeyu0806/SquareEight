import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const stripeExternalAccountsSlice = createSlice({
  name: 'stripeExternalAccounts',
  initialState: {
    businessProfileName: '',
    accountNumber: '',
    bankCode: '',
    branchCode: '',
    accountHolderName: ''
  },
  reducers: {
    businessProfileNameChanged: (state, action: PayloadAction<string>) => {
      state.businessProfileName = action.payload
    },
    accountNumberChanged: (state, action: PayloadAction<string>) => {
      state.accountNumber = action.payload
    },
    bankCodeChanged: (state, action: PayloadAction<string>) => {
      state.bankCode = action.payload
    },
    branchCodeChanged: (state, action: PayloadAction<string>) => {
      state.branchCode = action.payload
    },
    accountHolderNameChanged: (state, action: PayloadAction<string>) => {
      state.accountHolderName = action.payload
    },
  },
})

export const { businessProfileNameChanged } = stripeExternalAccountsSlice.actions
export const { accountNumberChanged } = stripeExternalAccountsSlice.actions
export const { bankCodeChanged } = stripeExternalAccountsSlice.actions
export const { branchCodeChanged } = stripeExternalAccountsSlice.actions
export const { accountHolderNameChanged } = stripeExternalAccountsSlice.actions

export default stripeExternalAccountsSlice.reducer
