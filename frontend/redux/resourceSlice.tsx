import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShopParam } from 'interfaces/ShopParam'

export const resourceSlice = createSlice({
  name: 'alert',
  initialState: {
    name: '',
    resourceImage1File: null as File | unknown,
    quantity: 1,
    resourceType: '',
    shops: [] as ShopParam[],
    isShowReservePage: false
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    resourceImage1FileChanged: (state, action: PayloadAction<File>) => {
      state.resourceImage1File = action.payload
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
    isShowReservePageChanged: (state, action: PayloadAction<boolean>) => {
      state.isShowReservePage = action.payload
    },
  },
})

export const { nameChanged } = resourceSlice.actions
export const { resourceImage1FileChanged } = resourceSlice.actions
export const { quantityChanged } = resourceSlice.actions
export const { resourceTypeChanged } = resourceSlice.actions
export const { isShowReservePageChanged } = resourceSlice.actions

export default resourceSlice.reducer
