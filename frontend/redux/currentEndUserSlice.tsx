import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginStatus } from '../interfaces/LoginStatus'

export const currentEndUserSlice = createSlice({
  name: 'currentEndUser',
  initialState: {
    id: '',
    email: '',
    loginStatus: 'Unconfirmed' as LoginStatus
  },
  reducers: {
    idChanged: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    emailChanged: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    loginStatusChanged: (state, action: PayloadAction<LoginStatus>) => {
      state.loginStatus = action.payload
    },
  },
})

export const { idChanged } = currentEndUserSlice.actions
export const { emailChanged } = currentEndUserSlice.actions
export const { loginStatusChanged } = currentEndUserSlice.actions

export default currentEndUserSlice.reducer
