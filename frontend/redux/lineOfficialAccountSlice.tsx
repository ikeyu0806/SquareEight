import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const lineOfficialAccountSlice = createSlice({
  name: 'lineOfficialAccount',
  initialState: {
    showPushMessageModal: false,
    message: ''
  },
  reducers: {
    showPushMessageModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showPushMessageModal = action.payload
    },
    messageChanged: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
  },
})

export const { showPushMessageModalChanged } = lineOfficialAccountSlice.actions
export const { messageChanged } = lineOfficialAccountSlice.actions

export default lineOfficialAccountSlice.reducer
