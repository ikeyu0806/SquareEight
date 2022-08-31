import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    weekDays: [] as string[],
    transferAmountArray: [] as number[],
    feeAmountArray: [] as number[],
    customerCountArray: [] as number[],
  },
  reducers: {
    weekDaysChanged: (state, action: PayloadAction<string[]>) => {
      state.weekDays = action.payload
    },
    transferAmountArrayChanged: (state, action: PayloadAction<number[]>) => {
      state.transferAmountArray = action.payload
    },
    feeAmountArrayChanged: (state, action: PayloadAction<number[]>) => {
      state.feeAmountArray = action.payload
    },
    customerCountArrayChanged: (state, action: PayloadAction<number[]>) => {
      state.customerCountArray = action.payload
    },
  },
})

export const { weekDaysChanged } = dashboardSlice.actions
export const { transferAmountArrayChanged } = dashboardSlice.actions
export const { feeAmountArrayChanged } = dashboardSlice.actions
export const { customerCountArrayChanged } = dashboardSlice.actions

export default dashboardSlice.reducer
