import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HtmlMailTemplate } from 'interfaces/HtmlMailTemplate'

export const htmlMailTemplateSlice = createSlice({
  name: 'htmlMailTemplate',
  initialState: {
    htmlMailTemplate: {} as HtmlMailTemplate
  },
  reducers: {
    htmlMailTemplateChanged: (state, action: PayloadAction<HtmlMailTemplate>) => {
      state.htmlMailTemplate = action.payload
    },
  },
})

export const { htmlMailTemplateChanged } = htmlMailTemplateSlice.actions

export default htmlMailTemplateSlice.reducer
