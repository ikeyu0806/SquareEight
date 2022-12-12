import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const lineOfficialAccountSlice = createSlice({
  name: 'lineOfficialAccount',
  initialState: {
    showPushMessageModal: false
  },
  reducers: {
    showPushMessageModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showPushMessageModal = action.payload
    },
  },
})

export const { showPushMessageModalChanged } = lineOfficialAccountSlice.actions

export default lineOfficialAccountSlice.reducer
