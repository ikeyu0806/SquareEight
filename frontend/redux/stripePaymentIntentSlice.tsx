import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StripePaymentIntentsParam } from 'interfaces/StripePaymentIntentsParam'

export const stripePaymentIntentSlice = createSlice({
  name: 'stripePaymentIntent',
  initialState: {
    selectedStripePaymentIntent: {} as StripePaymentIntentsParam,
    showPaymentIntentModal: false
  },
  reducers: {
    selectedStripePaymentIntentChanged: (state, action: PayloadAction<StripePaymentIntentsParam>) => {
      state.selectedStripePaymentIntent = action.payload
    },
    showPaymentIntentModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showPaymentIntentModal = action.payload
    },
  },
})

export const { selectedStripePaymentIntentChanged } = stripePaymentIntentSlice.actions
export const { showPaymentIntentModalChanged } = stripePaymentIntentSlice.actions

export default stripePaymentIntentSlice.reducer
