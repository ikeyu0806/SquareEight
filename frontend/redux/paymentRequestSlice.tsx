import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const paymentRequestSlice = createSlice({
  name: 'paymentRequest',
  initialState: {
    price: 1000
  },
  reducers: {
    priceChanged: (state, action: PayloadAction<number>) => {
      state.price = action.payload
    },
  },
})

export const { priceChanged } = paymentRequestSlice.actions

export default paymentRequestSlice.reducer
