import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const monthlyPaymentPlanSlice = createSlice({
  name: 'alert',
  initialState: {
    name: '',
    price: 1000,
    reserveIsUnlimited: true,
    reserveIntervalNumber: 1,
    reserveIntervalUnit: 'Day',
    enableReserveCount: 1,
    description: '',
    base64Image: null,

  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    priceChanged: (state, action: PayloadAction<number>) => {
      state.price = action.payload
    },
    reserveIsUnlimitedChanged: (state, action: PayloadAction<boolean>) => {
      state.reserveIsUnlimited = action.payload
    },
    reserveIntervalNumberChanged: (state, action: PayloadAction<number>) => {
      state.reserveIntervalNumber = action.payload
    },
    reserveIntervalUnitChanged: (state, action: PayloadAction<string>) => {
      state.reserveIntervalUnit = action.payload
    },
    enableReserveCountChanged: (state, action: PayloadAction<number>) => {
      state.enableReserveCount = action.payload
    },
    descriptionChanged: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    base64ImageChanged: (state, action: PayloadAction<any>) => {
      state.base64Image = action.payload
    },
  },
})

export const { nameChanged } = monthlyPaymentPlanSlice.actions
export const { priceChanged } = monthlyPaymentPlanSlice.actions
export const { reserveIsUnlimitedChanged } = monthlyPaymentPlanSlice.actions
export const { reserveIntervalNumberChanged } = monthlyPaymentPlanSlice.actions
export const { reserveIntervalUnitChanged } = monthlyPaymentPlanSlice.actions
export const { enableReserveCountChanged } = monthlyPaymentPlanSlice.actions
export const { descriptionChanged } = monthlyPaymentPlanSlice.actions
export const { base64ImageChanged } = monthlyPaymentPlanSlice.actions

export default monthlyPaymentPlanSlice.reducer
