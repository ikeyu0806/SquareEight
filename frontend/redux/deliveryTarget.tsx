import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const deliveryTargetSlice = createSlice({
  name: 'deliveryTarget',
  initialState: {
    firstName: '',
    lastName: '',
    state: '',
    city: '',
    town: '',
    line1: '',
    line2: '',
    phoneNumber: '',
  },
  reducers: {
    firstNameChanged: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload
    },
    lastNameChanged: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload
    },
    stateChanged: (state, action: PayloadAction<string>) => {
      state.state = action.payload
    },
    cityhanged: (state, action: PayloadAction<string>) => {
      state.city = action.payload
    },
    townChanged: (state, action: PayloadAction<string>) => {
      state.town = action.payload
    },
    line1Changed: (state, action: PayloadAction<string>) => {
      state.line1 = action.payload
    },
    line2Changed: (state, action: PayloadAction<string>) => {
      state.line2 = action.payload
    },
    phoneNumberChanged: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload
    },
  },
})

export const { firstNameChanged } = deliveryTargetSlice.actions
export const { lastNameChanged } = deliveryTargetSlice.actions
export const { stateChanged } = deliveryTargetSlice.actions
export const { cityhanged } = deliveryTargetSlice.actions
export const { townChanged } = deliveryTargetSlice.actions
export const { line1Changed } = deliveryTargetSlice.actions
export const { line2Changed } = deliveryTargetSlice.actions
export const { phoneNumberChanged } = deliveryTargetSlice.actions

export default deliveryTargetSlice.reducer
