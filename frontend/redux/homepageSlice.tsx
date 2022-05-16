import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const homepageSlice = createSlice({
  name: 'company',
  initialState: {
    blockType: '',
    headerTitle: '',
    footerCopyright: '',
  },
  reducers: {
    blockTypeChanged: (state, action: PayloadAction<string>) => {
      state.blockType = action.payload
    },
    headerTitleChanged: (state, action: PayloadAction<string>) => {
      state.headerTitle = action.payload
    },
    footerCopyrightChanged: (state, action: PayloadAction<string>) => {
      state.footerCopyright = action.payload
    },
  },
})

export const { blockTypeChanged } = homepageSlice.actions
export const { headerTitleChanged } = homepageSlice.actions
export const { footerCopyrightChanged } = homepageSlice.actions

export default homepageSlice.reducer
