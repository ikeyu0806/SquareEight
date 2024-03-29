import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PageLinksParam } from 'interfaces/PageLinksParam'
import { PagenationState } from 'interfaces/PagenationState'
import { CustomerParam } from 'interfaces/CustomerParam'
import { CustomerGroupParam } from 'interfaces/CustomerGroupParam'

export const messageTemplateSlice = createSlice({
  name: 'messageTemplate',
  initialState: {
    id: '',
    publicId: '',
    showCreateMessageTemplateModal: false,
    showEditMessageTemplateModal: false,
    name: '',
    title: '',
    content: '',
    targetType: 'Customer',
    targetEmails: '',
    targetCustomers: [] as CustomerParam[],
    customers: [] as CustomerParam[],
    customerGroups: [] as CustomerGroupParam[],
    targetCustomerGroups: [] as CustomerGroupParam[],
    pageLinks: [] as PageLinksParam[]
  },
  reducers: {
    idChanged: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    publicIdChanged: (state, action: PayloadAction<string>) => {
      state.publicId = action.payload
    },
    showCreateMessageTemplateModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showCreateMessageTemplateModal = action.payload
    },
    showEditMessageTemplateModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showEditMessageTemplateModal = action.payload
    },
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    titleChanged: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    contentChanged: (state, action: PayloadAction<string>) => {
      state.content = action.payload
    },
    targetTypeChanged: (state, action: PayloadAction<string>) => {
      state.targetType = action.payload
    },
    targetEmailsChanged: (state, action: PayloadAction<string>) => {
      state.targetEmails = action.payload
    },
    targetCustomersChanged: (state, action: PayloadAction<CustomerParam[]>) => {
      state.targetCustomers = action.payload
    },
    customersChanged: (state, action: PayloadAction<CustomerParam[]>) => {
      state.customers = action.payload
    },
    customerGroupsChanged: (state, action: PayloadAction<CustomerGroupParam[]>) => {
      state.customerGroups = action.payload
    },
    targetCustomerGroupsChanged: (state, action: PayloadAction<CustomerGroupParam[]>) => {
      state.targetCustomerGroups = action.payload
    },
    pageLinksChanged: (state, action: PayloadAction<PageLinksParam[]>) => {
      state.pageLinks = action.payload
    },
  },
})

export const { idChanged } = messageTemplateSlice.actions
export const { publicIdChanged } = messageTemplateSlice.actions
export const { showCreateMessageTemplateModalChanged } = messageTemplateSlice.actions
export const { showEditMessageTemplateModalChanged } = messageTemplateSlice.actions
export const { nameChanged } = messageTemplateSlice.actions
export const { titleChanged } = messageTemplateSlice.actions
export const { contentChanged } = messageTemplateSlice.actions
export const { targetTypeChanged } = messageTemplateSlice.actions
export const { targetEmailsChanged } = messageTemplateSlice.actions
export const { targetCustomersChanged } = messageTemplateSlice.actions
export const { customersChanged } = messageTemplateSlice.actions
export const { customerGroupsChanged } = messageTemplateSlice.actions
export const { targetCustomerGroupsChanged } = messageTemplateSlice.actions
export const { pageLinksChanged } = messageTemplateSlice.actions

export default messageTemplateSlice.reducer
