import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageTemplateParam } from 'interfaces/MessageTemplateParam'
import { CustomerParam } from 'interfaces/CustomerParam'
import { LineOfficialAccountParam } from 'interfaces/LineOfficialAccountParam'
import { HtmlMailTemplateParam } from 'interfaces/HtmlMailTemplateParam'
import { ShopParam } from 'interfaces/ShopParam'

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    showLineOfficialAccountModal: false,
    showSubscriptionDescribeModal: false,
    showSystemPlanDescribeModal: false,
    registeredCustomersCount: 0,
    lineOfficialAccounts: [] as LineOfficialAccountParam[],
    customers: [] as CustomerParam[],
    messageTemplates: [] as MessageTemplateParam[],
    htmlMailTemplate: [] as HtmlMailTemplateParam[],
    shops: [] as ShopParam[],
    showStripeSalesTransferGuideModal: false
  },
  reducers: {
    showLineOfficialAccountModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showLineOfficialAccountModal = action.payload
    },
    showSubscriptionDescribeModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showSubscriptionDescribeModal = action.payload
    },
    showshowSystemPlanDescribeModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showSystemPlanDescribeModal = action.payload
    },
    registeredCustomersCountChanged: (state, action: PayloadAction<number>) => {
      state.registeredCustomersCount = action.payload
    },
    lineOfficialAccountsChanged: (state, action: PayloadAction<LineOfficialAccountParam[]>) => {
      state.lineOfficialAccounts = action.payload
    },
    customersChanged: (state, action: PayloadAction<CustomerParam[]>) => {
      state.customers = action.payload
    },
    messageTemplatesChanged: (state, action: PayloadAction<MessageTemplateParam[]>) => {
      state.messageTemplates = action.payload
    },
    htmlMailTemplateChanged: (state, action: PayloadAction<HtmlMailTemplateParam[]>) => {
      state.htmlMailTemplate = action.payload
    },
    shopsChanged: (state, action: PayloadAction<ShopParam[]>) => {
      state.shops = action.payload
    },
    showStripeSalesTransferGuideModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showStripeSalesTransferGuideModal = action.payload
    },
  },
})

export const { showLineOfficialAccountModalChanged } = accountSlice.actions
export const { showSubscriptionDescribeModalChanged } = accountSlice.actions
export const { showshowSystemPlanDescribeModalChanged } = accountSlice.actions
export const { registeredCustomersCountChanged } = accountSlice.actions
export const { lineOfficialAccountsChanged } = accountSlice.actions
export const { customersChanged } = accountSlice.actions
export const { messageTemplatesChanged } = accountSlice.actions
export const { htmlMailTemplateChanged } = accountSlice.actions
export const { shopsChanged } = accountSlice.actions
export const { showStripeSalesTransferGuideModalChanged } = accountSlice.actions

export default accountSlice.reducer
