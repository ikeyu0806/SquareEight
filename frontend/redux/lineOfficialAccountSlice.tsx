import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const lineOfficialAccountSlice = createSlice({
  name: 'lineOfficialAccount',
  initialState: {
    name: '',
    channelId: '',
    channelSecret: '',
    channelToken: '',
    showPushMessageModal: false,
    isSendPaymentRequest: false,
    publicId: '',
    message: '',
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    channelIdChanged: (state, action: PayloadAction<string>) => {
      state.channelId = action.payload
    },
    channelSecretChanged: (state, action: PayloadAction<string>) => {
      state.channelSecret = action.payload
    },
    channelTokenChanged: (state, action: PayloadAction<string>) => {
      state.channelToken = action.payload
    },
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

export const { nameChanged } = lineOfficialAccountSlice.actions
export const { channelIdChanged } = lineOfficialAccountSlice.actions
export const { channelSecretChanged } = lineOfficialAccountSlice.actions
export const { channelTokenChanged } = lineOfficialAccountSlice.actions
export const { showPushMessageModalChanged } = lineOfficialAccountSlice.actions
export const { isSendPaymentRequestChanged } = lineOfficialAccountSlice.actions
export const { publicIdChanged } = lineOfficialAccountSlice.actions
export const { messageChanged } = lineOfficialAccountSlice.actions

export default lineOfficialAccountSlice.reducer
