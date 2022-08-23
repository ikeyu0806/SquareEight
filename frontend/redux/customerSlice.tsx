import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlertType } from '../interfaces/AlertType'

export const customerSlice = createSlice({
  name: 'alert',
  initialState: {
    customerId: '',
    firstName: '',
    lastName: '',
    firstNameKana: '',
    lastNameKana: '',
    email: '',
    phoneNumber: '',
    showCustomerModal: false,
  },
  reducers: {
    customerIdChanged: (state, action: PayloadAction<string>) => {
      state.customerId = action.payload
    },
    firstNameChanged: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload
    },
    lastNameChanged: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload
    },
    firstNameKanaChanged: (state, action: PayloadAction<string>) => {
      state.firstNameKana = action.payload
    },
    lastNameKanaChanged: (state, action: PayloadAction<string>) => {
      state.lastNameKana = action.payload
    },
    emailChanged: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    phoneNumberChanged: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload
    },
    showCustomerModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showCustomerModal = action.payload
    },
  },
})

export const { customerIdChanged } = customerSlice.actions
export const { firstNameChanged } = customerSlice.actions
export const { lastNameChanged } = customerSlice.actions
export const { firstNameKanaChanged } = customerSlice.actions
export const { lastNameKanaChanged } = customerSlice.actions
export const { emailChanged } = customerSlice.actions
export const { phoneNumberChanged } = customerSlice.actions
export const { showCustomerModalChanged } = customerSlice.actions

export default customerSlice.reducer
