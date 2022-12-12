import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageTemplateParam } from 'interfaces/MessageTemplateParam'

export const lineOfficialAccountSlice = createSlice({
  name: 'lineOfficialAccount',
  initialState: {
    showPushMessageModal: false,
    isSendPaymentRequest: false,
    publicId: '',
    message: '',
    messageTemplates: [] as MessageTemplateParam[]
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
    messageTemplatesChanged: (state, action: PayloadAction<MessageTemplateParam[]>) => {
      state.messageTemplates = action.payload
    },
  },
})

export const { showPushMessageModalChanged } = lineOfficialAccountSlice.actions
export const { isSendPaymentRequestChanged } = lineOfficialAccountSlice.actions
export const { publicIdChanged } = lineOfficialAccountSlice.actions
export const { messageChanged } = lineOfficialAccountSlice.actions
export const { messageTemplatesChanged } = lineOfficialAccountSlice.actions

export default lineOfficialAccountSlice.reducer
