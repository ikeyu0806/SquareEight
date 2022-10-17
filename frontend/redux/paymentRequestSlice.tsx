import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CustomerParam } from 'interfaces/CustomerParam'
import { CustomerGroupParam } from 'interfaces/CustomerGroupParam'

export const paymentRequestSlice = createSlice({
  name: 'paymentRequest',
  initialState: {
    price: 1000,
    targetCustomerType: 'registeredCustomer',
    messageContentType: 'inputMessage',
    customers:  [] as CustomerParam[],
    selectedCustomers:  [] as CustomerParam[],
    customerGroups:  [] as CustomerGroupParam[],
    selectedCustomerGroups:  [] as CustomerGroupParam[],
  },
  reducers: {
    priceChanged: (state, action: PayloadAction<number>) => {
      state.price = action.payload
    },
    targetCustomerTypeChanged: (state, action: PayloadAction<string>) => {
      state.targetCustomerType = action.payload
    },
    messageContentTypeChanged: (state, action: PayloadAction<string>) => {
      state.messageContentType = action.payload
    },
    customersChanged: (state, action: PayloadAction<CustomerParam[]>) => {
      state.customers = action.payload
    },
    selectedCustomersChanged: (state, action: PayloadAction<CustomerParam[]>) => {
      state.selectedCustomers = action.payload
    },
    customerGroupsChanged: (state, action: PayloadAction<CustomerGroupParam[]>) => {
      state.customerGroups = action.payload
    },
    selectedCustomerGroupsChanged: (state, action: PayloadAction<CustomerGroupParam[]>) => {
      state.selectedCustomerGroups = action.payload
    },
  },
})

export const { priceChanged } = paymentRequestSlice.actions
export const { targetCustomerTypeChanged } = paymentRequestSlice.actions
export const { messageContentTypeChanged } = paymentRequestSlice.actions
export const { customersChanged } = paymentRequestSlice.actions
export const { selectedCustomersChanged } = paymentRequestSlice.actions
export const { customerGroupsChanged } = paymentRequestSlice.actions
export const { selectedCustomerGroupsChanged } = paymentRequestSlice.actions

export default paymentRequestSlice.reducer
