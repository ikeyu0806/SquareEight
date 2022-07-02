import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const resourceSlice = createSlice({
  name: 'alert',
  initialState: {
    name: '',
    price: 1000,
    receptionTimeSetting: 'NotSet'
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    priceChanged: (state, action: PayloadAction<number>) => {
      state.price = action.payload
    },
    receptionTimeSettingChanged: (state, action: PayloadAction<string>) => {
      state.receptionTimeSetting = action.payload
    },
  },
})

export const { nameChanged } = resourceSlice.actions
export const { priceChanged } = resourceSlice.actions
export const { receptionTimeSettingChanged } = resourceSlice.actions

export default resourceSlice.reducer
