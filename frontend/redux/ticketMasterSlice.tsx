import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const ticketMasterSlice = createSlice({
  name: 'alert',
  initialState: {
    name: '',
    price: 1000,
    issueNumber: 100
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    priceChanged: (state, action: PayloadAction<number>) => {
      state.price = action.payload
    },
    issueNumberChanged: (state, action: PayloadAction<number>) => {
      state.issueNumber = action.payload
    },
  },
})

export const { nameChanged } = ticketMasterSlice.actions
export const { priceChanged } = ticketMasterSlice.actions
export const { issueNumberChanged } = ticketMasterSlice.actions

export default ticketMasterSlice.reducer
