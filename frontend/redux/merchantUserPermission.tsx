import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const merchantUserPermissionSlice = createSlice({
  name: 'merchantUserPermission',
  initialState: {
    allowReadMerchantUser: false
  },
  reducers: {
    allowReadMerchantUserChanged: (state, action: PayloadAction<boolean>) => {
      state.allowReadMerchantUser = action.payload
    },
  },
})

export const { allowReadMerchantUserChanged } = merchantUserPermissionSlice.actions

export default merchantUserPermissionSlice.reducer
