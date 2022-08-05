import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginStatus } from '../interfaces/LoginStatus'

export const currentSystemAdminUserSlice = createSlice({
  name: 'currentSystemAdminUser',
  initialState: {
    id: '',
    email: '',
    loginStatus: 'Unconfirmed' as LoginStatus,
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

export const { idChanged } = currentSystemAdminUserSlice.actions
export const { emailChanged } = currentSystemAdminUserSlice.actions
export const { loginStatusChanged } = currentSystemAdminUserSlice.actions

export default currentSystemAdminUserSlice.reducer
