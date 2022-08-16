import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const stripeAccountSlice = createSlice({
  name: 'stripeAccount',
  initialState: {
    isTermConfirmed: false
  },
  reducers: {
    isTermConfirmedChanged: (state, action: PayloadAction<boolean>) => {
      state.isTermConfirmed = action.payload
    },
  },
})

export const { isTermConfirmedChanged } = stripeAccountSlice.actions

export default stripeAccountSlice.reducer
