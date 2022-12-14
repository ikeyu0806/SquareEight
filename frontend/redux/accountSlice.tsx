import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageTemplateParam } from 'interfaces/MessageTemplateParam'
import { CustomerParam } from 'interfaces/CustomerParam'

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    customers: [] as CustomerParam[],
    messageTemplates: [] as MessageTemplateParam[]
  },
  reducers: {
    customersChanged: (state, action: PayloadAction<CustomerParam[]>) => {
      state.customers = action.payload
    },
    messageTemplatesChanged: (state, action: PayloadAction<MessageTemplateParam[]>) => {
      state.messageTemplates = action.payload
    },
  },
})

export const { customersChanged } = accountSlice.actions
export const { messageTemplatesChanged } = accountSlice.actions

export default accountSlice.reducer
