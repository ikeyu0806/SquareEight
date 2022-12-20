import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ImageWithTextListTypeTemplateContent, ImageWithTextTemplateContent } from 'interfaces/HtmlMailTemplate'

export const sendMailHistorySlice = createSlice({
  name: 'sendMailHistory',
  initialState: {
    showMessageBodyModal: false,
    selectedMessageBody: '',
    selectedMessageType: '',
    selectedHtmlTemplateType: '',
    selectedParsedMessageBody: [] as ImageWithTextListTypeTemplateContent[] | ImageWithTextTemplateContent[]
  },
  reducers: {
    showMessageBodyModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showMessageBodyModal = action.payload
    },
    selectedMessageBodyChanged: (state, action: PayloadAction<string>) => {
      state.selectedMessageBody = action.payload
    },
    selectedMessageTypeChanged: (state, action: PayloadAction<string>) => {
      state.selectedMessageType = action.payload
    },
    selectedHtmlTemplateTypeChanged: (state, action: PayloadAction<string>) => {
      state.selectedHtmlTemplateType = action.payload
    },
    selectedParsedMessageBodyChanged: (state, action: PayloadAction<ImageWithTextListTypeTemplateContent[] | ImageWithTextTemplateContent[]>) => {
      state.selectedParsedMessageBody = action.payload
    },
  },
})

export const { showMessageBodyModalChanged } = sendMailHistorySlice.actions
export const { selectedMessageBodyChanged } = sendMailHistorySlice.actions
export const { selectedMessageTypeChanged } = sendMailHistorySlice.actions
export const { selectedHtmlTemplateTypeChanged } = sendMailHistorySlice.actions
export const { selectedParsedMessageBodyChanged } = sendMailHistorySlice.actions

export default sendMailHistorySlice.reducer
