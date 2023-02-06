import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShopParam } from 'interfaces/ShopParam'

export const resourceSlice = createSlice({
  name: 'alert',
  initialState: {
    name: '',
    description: '',
    resourceImage1File: null as File | unknown,
    resourceImage1PublicUrl: '',
    quantity: 1,
    resourceType: '',
    shops: [] as ShopParam[],
    selectedShopIds: [] as number[],
    isShowReservePage: false
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    descriptionChanged: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    resourceImage1FileChanged: (state, action: PayloadAction<File>) => {
      state.resourceImage1File = action.payload
    },
    resourceImage1PublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.resourceImage1PublicUrl = action.payload
    },
    quantityChanged: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload
    },
    resourceTypeChanged: (state, action: PayloadAction<string>) => {
      state.resourceType = action.payload
    },
    shopsChanged: (state, action: PayloadAction<ShopParam[]>) => {
      state.shops = action.payload
    },
    selectedShopIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.selectedShopIds = action.payload
    },
    isShowReservePageChanged: (state, action: PayloadAction<boolean>) => {
      state.isShowReservePage = action.payload
    },
  },
})

export const { nameChanged } = resourceSlice.actions
export const { descriptionChanged } = resourceSlice.actions
export const { resourceImage1FileChanged } = resourceSlice.actions
export const { resourceImage1PublicUrlChanged } = resourceSlice.actions
export const { quantityChanged } = resourceSlice.actions
export const { resourceTypeChanged } = resourceSlice.actions
export const { shopsChanged } = resourceSlice.actions
export const { selectedShopIdsChanged } = resourceSlice.actions
export const { isShowReservePageChanged } = resourceSlice.actions

export default resourceSlice.reducer
