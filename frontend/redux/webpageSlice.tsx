import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PageContentState } from '../interfaces/PageContentState'
import { WebsiteHeaderType } from '../interfaces/WebsiteHeaderType'
import { WebsiteFooterType } from '../interfaces/WebsiteFooterType'

export const webpageSlice = createSlice({
  name: 'webpage',
  initialState: {
    pageContent: {blockContent: []} as PageContentState,
    selectedAtomType: '',
    selectedBlockType: '',
    // 要素追加モーダルで新しくブロックを追加するか選択ブロックに列として追加するか
    addAtomSelectedBlock: false,
    showBlockSample: true,
    blockType: '',
    atomType: '',
    headerTitle: '',
    footerCopyright: '',
    showBlockModal: false,
    showAtomModal: false,
    currentMaxSortOrder: 0,
    webpageTag: '',
    showEditHeaderModal: false,
    showEditFooterModal: false,
    websiteHeader: {} as WebsiteHeaderType,
    websiteFooter: {} as WebsiteFooterType,
  },
  reducers: {
    pageContentChanged: (state, action: PayloadAction<PageContentState>) => {
      state.pageContent = action.payload
    },
    showBlockSampleChanged: (state, action: PayloadAction<boolean>) => {
      state.showBlockSample = action.payload
    },
    selectedAtomTypeChanged: (state, action: PayloadAction<string>) => {
      state.selectedAtomType = action.payload
    },
    selectedBlockTypeChanged: (state, action: PayloadAction<string>) => {
      state.selectedBlockType = action.payload
    },
    blockTypeChanged: (state, action: PayloadAction<string>) => {
      state.blockType = action.payload
    },
    atomTypeChanged: (state, action: PayloadAction<string>) => {
      state.atomType = action.payload
    },
    headerTitleChanged: (state, action: PayloadAction<string>) => {
      state.headerTitle = action.payload
    },
    footerCopyrightChanged: (state, action: PayloadAction<string>) => {
      state.footerCopyright = action.payload
    },
    addAtomSelectedBlockChanged: (state, action: PayloadAction<boolean>) => {
      state.addAtomSelectedBlock = action.payload
    },
    showBlockModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showBlockModal = action.payload
    },
    currentMaxSortOrderChanged: (state, action: PayloadAction<number>) => {
      state.currentMaxSortOrder = action.payload
    },
    webpageTagChanged: (state, action: PayloadAction<string>) => {
      state.webpageTag = action.payload
    },
    showEditHeaderModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showEditHeaderModal = action.payload
    },
    showEditFooterModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showEditFooterModal = action.payload
    },
    websiteHeaderChanged: (state, action: PayloadAction<WebsiteHeaderType>) => {
      state.websiteHeader = action.payload
    },
    websiteFooterChanged: (state, action: PayloadAction<WebsiteFooterType>) => {
      state.websiteFooter = action.payload
    },
  },
})

export const { pageContentChanged } = webpageSlice.actions
export const { showBlockSampleChanged } = webpageSlice.actions
export const { selectedAtomTypeChanged } = webpageSlice.actions
export const { selectedBlockTypeChanged } = webpageSlice.actions
export const { blockTypeChanged } = webpageSlice.actions
export const { atomTypeChanged } = webpageSlice.actions
export const { headerTitleChanged } = webpageSlice.actions
export const { footerCopyrightChanged } = webpageSlice.actions
export const { addAtomSelectedBlockChanged } = webpageSlice.actions
export const { showBlockModalChanged } = webpageSlice.actions
export const { currentMaxSortOrderChanged } = webpageSlice.actions
export const { webpageTagChanged } = webpageSlice.actions
export const { showEditHeaderModalChanged } = webpageSlice.actions
export const { showEditFooterModalChanged } = webpageSlice.actions
export const { websiteHeaderChanged } = webpageSlice.actions
export const { websiteFooterChanged } = webpageSlice.actions

export default webpageSlice.reducer
