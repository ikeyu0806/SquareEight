import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CustomerParam } from 'interfaces/CustomerParam'

export const customerGroupSlice = createSlice({
  name: 'customerGroup',
  initialState: {
    name: '',
    showCustomerGroupMailSendModal: false,
    unselectedCustomers: [] as CustomerParam[],
    selectedCustomers: [] as CustomerParam[]
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    showCustomerGroupMailSendModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showCustomerGroupMailSendModal = action.payload
    },
    unselectedCustomersChanged: (state, action: PayloadAction<CustomerParam[]>) => {
      state.unselectedCustomers = action.payload
    },
    selectedCustomersChanged: (state, action: PayloadAction<CustomerParam[]>) => {
      state.selectedCustomers = action.payload
    },
  },
})

export const { nameChanged } = customerGroupSlice.actions
export const { showCustomerGroupMailSendModalChanged } = customerGroupSlice.actions
export const { unselectedCustomersChanged } = customerGroupSlice.actions
export const { selectedCustomersChanged } = customerGroupSlice.actions

export default customerGroupSlice.reducer
