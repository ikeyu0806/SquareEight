import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShopParam } from 'interfaces/ShopParam'

export const ticketMasterSlice = createSlice({
  name: 'ticketMaster',
  initialState: {
    name: '',
    price: 1000,
    issueNumber: 100,
    effectiveMonth: 12,
    description: '',
    publishStatus: '',
    ticketMasterImage1File: null as File | unknown,
    ticketMasterImage2File:  null as File | unknown,
    ticketMasterImage3File:  null as File | unknown,
    ticketMasterImage4File:  null as File | unknown,
    ticketMasterImage5File:  null as File | unknown,
    ticketMasterImage1ImagePublicUrl: '',
    ticketMasterImage2ImagePublicUrl: '',
    ticketMasterImage3ImagePublicUrl: '',
    ticketMasterImage4ImagePublicUrl: '',
    ticketMasterImage5ImagePublicUrl: '',
    shops: [] as ShopParam[],
    selectedShopIds: [] as number[]
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    priceChanged: (state, action: PayloadAction<number>) => {
      state.price = action.payload
    },
    effectiveMonthChanged: (state, action: PayloadAction<number>) => {
      state.effectiveMonth = action.payload
    },
    issueNumberChanged: (state, action: PayloadAction<number>) => {
      state.issueNumber = action.payload
    },
    descriptionChanged: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    publishStatusChanged: (state, action: PayloadAction<string>) => {
      state.publishStatus = action.payload
    },
    ticketMasterImage1FileChanged: (state, action: PayloadAction<File>) => {
      state.ticketMasterImage1File = action.payload
    },
    ticketMasterImage2FileChanged: (state, action: PayloadAction<File>) => {
      state.ticketMasterImage2File = action.payload
    },
    ticketMasterImage3FileChanged: (state, action: PayloadAction<File>) => {
      state.ticketMasterImage3File = action.payload
    },
    ticketMasterImage4FileChanged: (state, action: PayloadAction<File>) => {
      state.ticketMasterImage4File = action.payload
    },
    ticketMasterImage5FileChanged: (state, action: PayloadAction<File>) => {
      state.ticketMasterImage5File = action.payload
    },
    ticketMasterImage1ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.ticketMasterImage1ImagePublicUrl = action.payload
    },
    ticketMasterImage2ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.ticketMasterImage2ImagePublicUrl = action.payload
    },
    ticketMasterImage3ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.ticketMasterImage3ImagePublicUrl = action.payload
    },
    ticketMasterImage4ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.ticketMasterImage4ImagePublicUrl = action.payload
    },
    ticketMasterImage5ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.ticketMasterImage5ImagePublicUrl = action.payload
    },
    shopsChanged: (state, action: PayloadAction<ShopParam[]>) => {
      state.shops = action.payload
    },
    selectedShopIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.selectedShopIds = action.payload
    },
  },
})

export const { nameChanged } = ticketMasterSlice.actions
export const { priceChanged } = ticketMasterSlice.actions
export const { issueNumberChanged } = ticketMasterSlice.actions
export const { effectiveMonthChanged } = ticketMasterSlice.actions
export const { descriptionChanged } = ticketMasterSlice.actions
export const { publishStatusChanged } = ticketMasterSlice.actions
export const { ticketMasterImage1FileChanged } = ticketMasterSlice.actions
export const { ticketMasterImage2FileChanged } = ticketMasterSlice.actions
export const { ticketMasterImage3FileChanged } = ticketMasterSlice.actions
export const { ticketMasterImage4FileChanged } = ticketMasterSlice.actions
export const { ticketMasterImage5FileChanged } = ticketMasterSlice.actions
export const { ticketMasterImage1ImagePublicUrlChanged } = ticketMasterSlice.actions
export const { ticketMasterImage2ImagePublicUrlChanged } = ticketMasterSlice.actions
export const { ticketMasterImage3ImagePublicUrlChanged } = ticketMasterSlice.actions
export const { ticketMasterImage4ImagePublicUrlChanged } = ticketMasterSlice.actions
export const { ticketMasterImage5ImagePublicUrlChanged } = ticketMasterSlice.actions
export const { shopsChanged } = ticketMasterSlice.actions
export const { selectedShopIdsChanged } = ticketMasterSlice.actions

export default ticketMasterSlice.reducer
