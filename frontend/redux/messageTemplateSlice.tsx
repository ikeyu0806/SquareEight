import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PageLinksParam } from 'interfaces/PageLinksParam'
import { PagenationState } from 'interfaces/PagenationState'

export const messageTemplateSlice = createSlice({
  name: 'messageTemplate',
  initialState: {
    id: '',
    showCreateMessageTemplateModal: false,
    showEditMessageTemplateModal: false,
    showSendMessageTemplateModal: false,
    name: '',
    content: '',
    pageLinks: [] as PageLinksParam[],
    pageLinkPaginationState: {
      currentPage: 1,
      totalPage: 0,
      maxPerPage: 7
    } as PagenationState
  },
  reducers: {
    idChanged: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    showCreateMessageTemplateModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showCreateMessageTemplateModal = action.payload
    },
    showEditMessageTemplateModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showEditMessageTemplateModal = action.payload
    },
    showSendMessageTemplateModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showSendMessageTemplateModal = action.payload
    },
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    contentChanged: (state, action: PayloadAction<string>) => {
      state.content = action.payload
    },
    pageLinksChanged: (state, action: PayloadAction<PageLinksParam[]>) => {
      state.pageLinks = action.payload
    },
    pageLinkPaginationStateChanged: (state, action: PayloadAction<PagenationState>) => {
      state.pageLinkPaginationState = action.payload
    },
  },
})

export const { idChanged } = messageTemplateSlice.actions
export const { showCreateMessageTemplateModalChanged } = messageTemplateSlice.actions
export const { showEditMessageTemplateModalChanged } = messageTemplateSlice.actions
export const { showSendMessageTemplateModalChanged } = messageTemplateSlice.actions
export const { nameChanged } = messageTemplateSlice.actions
export const { contentChanged } = messageTemplateSlice.actions
export const { pageLinksChanged } = messageTemplateSlice.actions
export const { pageLinkPaginationStateChanged } = messageTemplateSlice.actions

export default messageTemplateSlice.reducer
