import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShopParam } from 'interfaces/ShopParam'

export const monthlyPaymentPlanSlice = createSlice({
  name: 'alert',
  initialState: {
    name: '',
    price: 1000,
    reserveIsUnlimited: true,
    reserveIntervalNumber: 1,
    reserveIntervalUnit: 'Day',
    enableReserveCount: 1,
    description: '',
    publishStatus: '',
    base64Image: null,
    s3ObjectPublicUrl: '',
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
    reserveIsUnlimitedChanged: (state, action: PayloadAction<boolean>) => {
      state.reserveIsUnlimited = action.payload
    },
    reserveIntervalNumberChanged: (state, action: PayloadAction<number>) => {
      state.reserveIntervalNumber = action.payload
    },
    reserveIntervalUnitChanged: (state, action: PayloadAction<string>) => {
      state.reserveIntervalUnit = action.payload
    },
    enableReserveCountChanged: (state, action: PayloadAction<number>) => {
      state.enableReserveCount = action.payload
    },
    descriptionChanged: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    publishStatusChanged: (state, action: PayloadAction<string>) => {
      state.publishStatus = action.payload
    },
    base64ImageChanged: (state, action: PayloadAction<any>) => {
      state.base64Image = action.payload
    },
    s3ObjectPublicUrlChanged: (state, action: PayloadAction<any>) => {
      state.s3ObjectPublicUrl = action.payload
    },
    shopsChanged: (state, action: PayloadAction<ShopParam[]>) => {
      state.shops = action.payload
    },
    selectedShopIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.selectedShopIds = action.payload
    },
  },
})

export const { nameChanged } = monthlyPaymentPlanSlice.actions
export const { priceChanged } = monthlyPaymentPlanSlice.actions
export const { reserveIsUnlimitedChanged } = monthlyPaymentPlanSlice.actions
export const { reserveIntervalNumberChanged } = monthlyPaymentPlanSlice.actions
export const { reserveIntervalUnitChanged } = monthlyPaymentPlanSlice.actions
export const { enableReserveCountChanged } = monthlyPaymentPlanSlice.actions
export const { descriptionChanged } = monthlyPaymentPlanSlice.actions
export const { publishStatusChanged } = monthlyPaymentPlanSlice.actions
export const { base64ImageChanged } = monthlyPaymentPlanSlice.actions
export const { s3ObjectPublicUrlChanged } = monthlyPaymentPlanSlice.actions
export const { shopsChanged } = monthlyPaymentPlanSlice.actions
export const { selectedShopIdsChanged } = monthlyPaymentPlanSlice.actions

export default monthlyPaymentPlanSlice.reducer
