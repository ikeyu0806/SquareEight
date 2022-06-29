import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const monthlyPaymentPlanSlice = createSlice({
  name: 'alert',
  initialState: {
    price: 0,
    reserveIsUnlimited: true,
    reserveIntervalNumber: 0,
    reserveIntervalUnit: 0,
    enableReserveCount: 0

  },
  reducers: {
    priceChanged: (state, action: PayloadAction<number>) => {
      state.price = action.payload
    },
    reserveIsUnlimitedChanged: (state, action: PayloadAction<boolean>) => {
      state.reserveIsUnlimited = action.payload
    },
    reserveIntervalNumberChanged: (state, action: PayloadAction<number>) => {
      state.reserveIntervalNumber = action.payload
    },
    reserveIntervalUnitChanged: (state, action: PayloadAction<number>) => {
      state.reserveIntervalUnit = action.payload
    },
    enableReserveCountChanged: (state, action: PayloadAction<number>) => {
      state.enableReserveCount = action.payload
    },
  },
})

export const { priceChanged } = monthlyPaymentPlanSlice.actions
export const { reserveIsUnlimitedChanged } = monthlyPaymentPlanSlice.actions
export const { reserveIntervalNumberChanged } = monthlyPaymentPlanSlice.actions
export const { reserveIntervalUnitChanged } = monthlyPaymentPlanSlice.actions
export const { enableReserveCountChanged } = monthlyPaymentPlanSlice.actions

export default monthlyPaymentPlanSlice.reducer
