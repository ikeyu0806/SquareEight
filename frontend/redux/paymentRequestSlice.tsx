import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const paymentRequestSlice = createSlice({
  name: 'paymentRequest',
  initialState: {
    price: 1000,
    targetCustomerType: 'registeredCustomer',
    messageContentType: 'inputMessage'
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
  },
})

export const { priceChanged } = paymentRequestSlice.actions
export const { targetCustomerTypeChanged } = paymentRequestSlice.actions
export const { messageContentTypeChanged } = paymentRequestSlice.actions

export default paymentRequestSlice.reducer
