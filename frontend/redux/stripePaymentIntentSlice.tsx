import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StripePaymentIntentsParam } from 'interfaces/StripePaymentIntentsParam'

export const stripePaymentIntentSlice = createSlice({
  name: 'stripePaymentIntent',
  initialState: {
    selectedStripePaymentIntent: {} as StripePaymentIntentsParam,
  },
  reducers: {
    selectedStripePaymentIntentChanged: (state, action: PayloadAction<StripePaymentIntentsParam>) => {
      state.selectedStripePaymentIntent = action.payload
    },
  },
})

export const { selectedStripePaymentIntentChanged } = stripePaymentIntentSlice.actions

export default stripePaymentIntentSlice.reducer
