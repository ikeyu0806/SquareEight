import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const stripeBusinessInfoSlice = createSlice({
  name: 'alert',
  initialState: {
    mccType: 'popular',
    mcc: '5734'
  },
  reducers: {
    mccTypeChanged: (state, action: PayloadAction<string>) => {
      state.mccType = action.payload
    },
    mccChanged: (state, action: PayloadAction<string>) => {
      state.mcc = action.payload
    },
  },
})

export const { mccTypeChanged } = stripeBusinessInfoSlice.actions
export const { mccChanged } = stripeBusinessInfoSlice.actions

export default stripeBusinessInfoSlice.reducer
