import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const ticketMasterSlice = createSlice({
  name: 'alert',
  initialState: {
    name: '',
    price: 1000,
    issueNumber: 100,
    effectiveMonth: 12,
    description: '',
    base64Image: null,
    s3ObjectPublicUrl: ''
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    priceChanged: (state, action: PayloadAction<number>) => {
      state.price = action.payload
    },
    effectiveMonthChanged: (state, action: PayloadAction<number>) => {
      state.effectiveMonth = action.payload
    },
    issueNumberChanged: (state, action: PayloadAction<number>) => {
      state.issueNumber = action.payload
    },
    descriptionChanged: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    base64ImageChanged: (state, action: PayloadAction<any>) => {
      state.base64Image = action.payload
    },
    s3ObjectPublicUrlChanged: (state, action: PayloadAction<any>) => {
      state.s3ObjectPublicUrl = action.payload
    },
  },
})

export const { nameChanged } = ticketMasterSlice.actions
export const { priceChanged } = ticketMasterSlice.actions
export const { issueNumberChanged } = ticketMasterSlice.actions
export const { effectiveMonthChanged } = ticketMasterSlice.actions
export const { descriptionChanged } = ticketMasterSlice.actions
export const { base64ImageChanged } = ticketMasterSlice.actions
export const { s3ObjectPublicUrlChanged } = ticketMasterSlice.actions

export default ticketMasterSlice.reducer
