import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PageContentState } from '../interfaces/PageContentState'

export const homepageSlice = createSlice({
  name: 'homepage',
  initialState: {
    pageContent: [] as PageContentState[],
    selectedBlockType: '',
    showBlockSample: true,
    blockType: '',
    headerTitle: '',
    footerCopyright: '',
    showBlockModal: false,
    currentMaxSortOrder: 0,
    websiteTag: '',
    webpageTag: ''
  },
  reducers: {
    pageContentChanged: (state, action: PayloadAction<PageContentState[]>) => {
      state.pageContent = action.payload
    },
    showBlockSampleChanged: (state, action: PayloadAction<boolean>) => {
      state.showBlockSample = action.payload
    },
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
    currentMaxSortOrderChanged: (state, action: PayloadAction<number>) => {
      state.currentMaxSortOrder = action.payload
    },
    websiteTagChanged: (state, action: PayloadAction<string>) => {
      state.websiteTag = action.payload
    },
    webpageTagChanged: (state, action: PayloadAction<string>) => {
      state.webpageTag = action.payload
    },
  },
})

export const { pageContentChanged } = homepageSlice.actions
export const { showBlockSampleChanged } = homepageSlice.actions
export const { selectedBlockTypeChanged } = homepageSlice.actions
export const { blockTypeChanged } = homepageSlice.actions
export const { headerTitleChanged } = homepageSlice.actions
export const { footerCopyrightChanged } = homepageSlice.actions
export const { showBlockModalChanged } = homepageSlice.actions
export const { currentMaxSortOrderChanged } = homepageSlice.actions
export const { websiteTagChanged } = homepageSlice.actions
export const { webpageTagChanged } = homepageSlice.actions

export default homepageSlice.reducer
