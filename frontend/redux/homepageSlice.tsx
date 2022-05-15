import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const homepageSlice = createSlice({
  name: 'company',
  initialState: {
    blockType: '',
  },
  reducers: {
    blockTypeChanged: (state, action: PayloadAction<string>) => {
      state.blockType = action.payload
    },
  },
})

export const { blockTypeChanged } = homepageSlice.actions

export default homepageSlice.reducer
