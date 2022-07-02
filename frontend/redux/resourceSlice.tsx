import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const resourceSlice = createSlice({
  name: 'alert',
  initialState: {
    name: '',
    quantity: 1,
    receptionTimeSetting: 'NotSet'
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    quantityChanged: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload
    },
    receptionTimeSettingChanged: (state, action: PayloadAction<string>) => {
      state.receptionTimeSetting = action.payload
    },
  },
})

export const { nameChanged } = resourceSlice.actions
export const { quantityChanged } = resourceSlice.actions
export const { receptionTimeSettingChanged } = resourceSlice.actions

export default resourceSlice.reducer
