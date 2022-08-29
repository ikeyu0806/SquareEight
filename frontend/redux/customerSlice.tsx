import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    notes: '',
    showCreateCustomerModal: false,
    showEditCustomerModal: false,
    showCustomerMailSendModal: false,
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
    notesChanged: (state, action: PayloadAction<string>) => {
      state.notes = action.payload
    },
    showCreateCustomerModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showCreateCustomerModal = action.payload
    },
    showEditCustomerModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showEditCustomerModal = action.payload
    },
    showCustomerMailSendModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showCustomerMailSendModal = action.payload
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
export const { notesChanged } = customerSlice.actions
export const { showCreateCustomerModalChanged } = customerSlice.actions
export const { showEditCustomerModalChanged } = customerSlice.actions
export const { showCustomerMailSendModalChanged } = customerSlice.actions

export default customerSlice.reducer
