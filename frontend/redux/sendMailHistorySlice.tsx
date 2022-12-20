import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sendMailHistorySlice = createSlice({
  name: 'sendMailHistory',
  initialState: {
    showMessageBodyModal: false,
    selectedMessageBody: '',
    selectedMessageType: '',
  },
  reducers: {
    showMessageBodyModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showMessageBodyModal = action.payload
    },
    selectedMessageBodyChanged: (state, action: PayloadAction<string>) => {
      state.selectedMessageBody = action.payload
    },
    selectedMessageTypeChanged: (state, action: PayloadAction<string>) => {
      state.selectedMessageType = action.payload
    },
  },
})

export const { showMessageBodyModalChanged } = sendMailHistorySlice.actions
export const { selectedMessageBodyChanged } = sendMailHistorySlice.actions
export const { selectedMessageTypeChanged } = sendMailHistorySlice.actions

export default sendMailHistorySlice.reducer
