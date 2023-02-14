import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShopParam } from 'interfaces/ShopParam'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'

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
    monthlyPaymentPlanImage1File: null as File | unknown,
    monthlyPaymentPlanImage2File:  null as File | unknown,
    monthlyPaymentPlanImage3File:  null as File | unknown,
    monthlyPaymentPlanImage4File:  null as File | unknown,
    monthlyPaymentPlanImage5File:  null as File | unknown,
    monthlyPaymentPlanImage1ImagePublicUrl: '',
    monthlyPaymentPlanImage2ImagePublicUrl: '',
    monthlyPaymentPlanImage3ImagePublicUrl: '',
    monthlyPaymentPlanImage4ImagePublicUrl: '',
    monthlyPaymentPlanImage5ImagePublicUrl: '',
    shops: [] as ShopParam[],
    selectedShopIds: [] as number[],
    selectableReserveFrames: []  as ReserveFrameParam[],
    selectedReserveFrameIds: [] as number[],
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
    monthlyPaymentPlanImage1FileChanged: (state, action: PayloadAction<File>) => {
      state.monthlyPaymentPlanImage1File = action.payload
    },
    monthlyPaymentPlanImage2FileChanged: (state, action: PayloadAction<File>) => {
      state.monthlyPaymentPlanImage2File = action.payload
    },
    monthlyPaymentPlanImage3FileChanged: (state, action: PayloadAction<File>) => {
      state.monthlyPaymentPlanImage3File = action.payload
    },
    monthlyPaymentPlanImage4FileChanged: (state, action: PayloadAction<File>) => {
      state.monthlyPaymentPlanImage4File = action.payload
    },
    monthlyPaymentPlanImage5FileChanged: (state, action: PayloadAction<File>) => {
      state.monthlyPaymentPlanImage5File = action.payload
    },
    monthlyPaymentPlanImage1ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.monthlyPaymentPlanImage1ImagePublicUrl = action.payload
    },
    monthlyPaymentPlanImage2ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.monthlyPaymentPlanImage2ImagePublicUrl = action.payload
    },
    monthlyPaymentPlanImage3ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.monthlyPaymentPlanImage3ImagePublicUrl = action.payload
    },
    monthlyPaymentPlanImage4ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.monthlyPaymentPlanImage4ImagePublicUrl = action.payload
    },
    monthlyPaymentPlanImage5ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.monthlyPaymentPlanImage5ImagePublicUrl = action.payload
    },
    shopsChanged: (state, action: PayloadAction<ShopParam[]>) => {
      state.shops = action.payload
    },
    selectedShopIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.selectedShopIds = action.payload
    },
    selectableReserveFramesChanged: (state, action: PayloadAction<ReserveFrameParam[]>) => {
      state.selectableReserveFrames = action.payload
    },
    selectedReserveFrameIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.selectedReserveFrameIds = action.payload
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
export const { monthlyPaymentPlanImage1FileChanged } = monthlyPaymentPlanSlice.actions
export const { monthlyPaymentPlanImage2FileChanged } = monthlyPaymentPlanSlice.actions
export const { monthlyPaymentPlanImage3FileChanged } = monthlyPaymentPlanSlice.actions
export const { monthlyPaymentPlanImage4FileChanged } = monthlyPaymentPlanSlice.actions
export const { monthlyPaymentPlanImage5FileChanged } = monthlyPaymentPlanSlice.actions
export const { monthlyPaymentPlanImage1ImagePublicUrlChanged } = monthlyPaymentPlanSlice.actions
export const { monthlyPaymentPlanImage2ImagePublicUrlChanged } = monthlyPaymentPlanSlice.actions
export const { monthlyPaymentPlanImage3ImagePublicUrlChanged } = monthlyPaymentPlanSlice.actions
export const { monthlyPaymentPlanImage4ImagePublicUrlChanged } = monthlyPaymentPlanSlice.actions
export const { monthlyPaymentPlanImage5ImagePublicUrlChanged } = monthlyPaymentPlanSlice.actions
export const { shopsChanged } = monthlyPaymentPlanSlice.actions
export const { selectedShopIdsChanged } = monthlyPaymentPlanSlice.actions
export const { selectedReserveFrameIdsChanged } = monthlyPaymentPlanSlice.actions
export const { selectableReserveFramesChanged } = monthlyPaymentPlanSlice.actions

export default monthlyPaymentPlanSlice.reducer
