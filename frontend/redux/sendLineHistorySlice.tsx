import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sendLineHistorySlice = createSlice({
  name: 'sendLineHistory',
  initialState: {
    selectedMessage: '',
    showLineMessageModal: false
  },
  reducers: {
    selectedMessageChanged: (state, action: PayloadAction<string>) => {
      state.selectedMessage = action.payload
    },
    showLineMessageModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showLineMessageModal = action.payload
    },
  },
})

export const { selectedMessageChanged } = sendLineHistorySlice.actions
export const { showLineMessageModalChanged } = sendLineHistorySlice.actions

export default sendLineHistorySlice.reducer
