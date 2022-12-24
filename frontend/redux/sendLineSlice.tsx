import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sendLineSlice = createSlice({
  name: 'sendLine',
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

export const { selectedMessageChanged } = sendLineSlice.actions
export const { showLineMessageModalChanged } = sendLineSlice.actions

export default sendLineSlice.reducer
