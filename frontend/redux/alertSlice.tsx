import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlertType } from '../interfaces/AlertType'

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alert: {} as AlertType
  },
  reducers: {
    alertChanged: (state, action: PayloadAction<AlertType>) => {
      state.alert = action.payload
    },
  },
})

export const { alertChanged } = alertSlice.actions

export default alertSlice.reducer
