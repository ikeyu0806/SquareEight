import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const resourceSlice = createSlice({
  name: 'alert',
  initialState: {
    name: '',
    quantity: 1
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    quantityChanged: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload
    },
  },
})

export const { nameChanged } = resourceSlice.actions
export const { quantityChanged } = resourceSlice.actions

export default resourceSlice.reducer
