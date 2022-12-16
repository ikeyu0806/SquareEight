import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HtmlMailTemplate } from 'interfaces/HtmlMailTemplate'
import internal from 'stream'

export const htmlMailTemplateSlice = createSlice({
  name: 'htmlMailTemplate',
  initialState: {
    htmlMailTemplate: {} as HtmlMailTemplate,
    currentMaxSortOrder: 0,
    selectedBlockID: '',
  },
  reducers: {
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

export const { htmlMailTemplateChanged } = htmlMailTemplateSlice.actions
export const { currentMaxSortOrderChanged } = htmlMailTemplateSlice.actions
export const { selectedBlockIDChanged } = htmlMailTemplateSlice.actions

export default htmlMailTemplateSlice.reducer
