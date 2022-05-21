import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const homepageSlice = createSlice({
  name: 'homepage',
  initialState: {
    selectedBlockType: '',
    blockType: '',
    headerTitle: '',
    footerCopyright: '',
    showBlockModal: false,
  },
  reducers: {
    selectedBlockTypeChanged: (state, action: PayloadAction<string>) => {
      state.selectedBlockType = action.payload
    },
    blockTypeChanged: (state, action: PayloadAction<string>) => {
      state.blockType = action.payload
    },
    headerTitleChanged: (state, action: PayloadAction<string>) => {
      state.headerTitle = action.payload
    },
    footerCopyrightChanged: (state, action: PayloadAction<string>) => {
      state.footerCopyright = action.payload
    },
    showBlockModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showBlockModal = action.payload
    },
  },
})

export const { selectedBlockTypeChanged } = homepageSlice.actions
export const { blockTypeChanged } = homepageSlice.actions
export const { headerTitleChanged } = homepageSlice.actions
export const { footerCopyrightChanged } = homepageSlice.actions
export const { showBlockModalChanged } = homepageSlice.actions

export default homepageSlice.reducer
