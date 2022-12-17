import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HtmlMailTemplate } from 'interfaces/HtmlMailTemplate'

export const htmlMailTemplateSlice = createSlice({
  name: 'htmlMailTemplate',
  initialState: {
    name: '',
    mailTitle: '',
    htmlMailTemplate: {} as HtmlMailTemplate,
    currentMaxSortOrder: 0,
    selectedBlockID: '',
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    mailTitleChanged: (state, action: PayloadAction<string>) => {
      state.mailTitle = action.payload
    },
    htmlMailTemplateChanged: (state, action: PayloadAction<HtmlMailTemplate>) => {
      state.htmlMailTemplate = action.payload
    },
    currentMaxSortOrderChanged: (state, action: PayloadAction<number>) => {
      state.currentMaxSortOrder = action.payload
    },
    selectedBlockIDChanged: (state, action: PayloadAction<string>) => {
      state.selectedBlockID = action.payload
    },
  },
})

export const { nameChanged } = htmlMailTemplateSlice.actions
export const { mailTitleChanged } = htmlMailTemplateSlice.actions
export const { htmlMailTemplateChanged } = htmlMailTemplateSlice.actions
export const { currentMaxSortOrderChanged } = htmlMailTemplateSlice.actions
export const { selectedBlockIDChanged } = htmlMailTemplateSlice.actions

export default htmlMailTemplateSlice.reducer
