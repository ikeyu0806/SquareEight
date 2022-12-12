import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const lineUserSlice = createSlice({
  name: 'lineUser',
  initialState: {
    lineUserPublicId: '',
    lineUserId: '',
  },
  reducers: {
    lineUserPublicIdChanged: (state, action: PayloadAction<string>) => {
      state.lineUserPublicId = action.payload
    },
    lineUserIdChanged: (state, action: PayloadAction<string>) => {
      state.lineUserId = action.payload
    },
  },
})

export const { lineUserPublicIdChanged } = lineUserSlice.actions
export const { lineUserIdChanged } = lineUserSlice.actions

export default lineUserSlice.reducer
