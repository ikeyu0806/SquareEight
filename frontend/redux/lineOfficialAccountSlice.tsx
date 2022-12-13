import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const lineOfficialAccountSlice = createSlice({
  name: 'lineOfficialAccount',
  initialState: {
    showPushMessageModal: false,
    isSendPaymentRequest: false,
    publicId: '',
    message: '',
  },
  reducers: {
    showPushMessageModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showPushMessageModal = action.payload
    },
    isSendPaymentRequestChanged: (state, action: PayloadAction<boolean>) => {
      state.isSendPaymentRequest = action.payload
    },
    publicIdChanged: (state, action: PayloadAction<string>) => {
      state.publicId = action.payload
    },
    messageChanged: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
  },
})

export const { showPushMessageModalChanged } = lineOfficialAccountSlice.actions
export const { isSendPaymentRequestChanged } = lineOfficialAccountSlice.actions
export const { publicIdChanged } = lineOfficialAccountSlice.actions
export const { messageChanged } = lineOfficialAccountSlice.actions

export default lineOfficialAccountSlice.reducer
