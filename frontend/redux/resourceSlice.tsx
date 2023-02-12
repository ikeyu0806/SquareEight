import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShopParam } from 'interfaces/ShopParam'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'
import { ReserveFrameInfo } from 'interfaces/ResourceParam'

export const resourceSlice = createSlice({
  name: 'resource',
  initialState: {
    name: '',
    description: '',
    resourceImage1File: null as File | unknown,
    resourceImage1PublicUrl: '',
    resourceImage2File: null as File | unknown,
    resourceImage2PublicUrl: '',
    resourceImage3File: null as File | unknown,
    resourceImage3PublicUrl: '',
    resourceImage4File: null as File | unknown,
    resourceImage4PublicUrl: '',
    resourceImage5File: null as File | unknown,
    resourceImage5PublicUrl: '',
    quantity: 1,
    resourceType: 'Staff',
    shops: [] as ShopParam[],
    selectedShopIds: [] as number[],
    selectableReserveFrames: []  as ReserveFrameParam[],
    selectedReserveFrameIds: [] as number[],
    isShowReservePage: false,
    reserveFrameInfo: [] as ReserveFrameInfo[],
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
    resourceImage2FileChanged: (state, action: PayloadAction<File>) => {
      state.resourceImage2File = action.payload
    },
    resourceImage2PublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.resourceImage2PublicUrl = action.payload
    },
    resourceImage3FileChanged: (state, action: PayloadAction<File>) => {
      state.resourceImage3File = action.payload
    },
    resourceImage3PublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.resourceImage3PublicUrl = action.payload
    },
    resourceImage4FileChanged: (state, action: PayloadAction<File>) => {
      state.resourceImage4File = action.payload
    },
    resourceImage4PublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.resourceImage4PublicUrl = action.payload
    },
    resourceImage5FileChanged: (state, action: PayloadAction<File>) => {
      state.resourceImage5File = action.payload
    },
    resourceImage5PublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.resourceImage5PublicUrl = action.payload
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
    selectableReserveFramesChanged: (state, action: PayloadAction<ReserveFrameParam[]>) => {
      state.selectableReserveFrames = action.payload
    },
    selectedReserveFrameIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.selectedReserveFrameIds = action.payload
    },
    isShowReservePageChanged: (state, action: PayloadAction<boolean>) => {
      state.isShowReservePage = action.payload
    },
    reserveFrameInfoChanged: (state, action: PayloadAction<ReserveFrameInfo[]>) => {
      state.reserveFrameInfo = action.payload
    },
  },
})

export const { nameChanged } = resourceSlice.actions
export const { descriptionChanged } = resourceSlice.actions
export const { resourceImage1FileChanged } = resourceSlice.actions
export const { resourceImage1PublicUrlChanged } = resourceSlice.actions
export const { resourceImage2FileChanged } = resourceSlice.actions
export const { resourceImage2PublicUrlChanged } = resourceSlice.actions
export const { resourceImage3FileChanged } = resourceSlice.actions
export const { resourceImage3PublicUrlChanged } = resourceSlice.actions
export const { resourceImage4FileChanged } = resourceSlice.actions
export const { resourceImage4PublicUrlChanged } = resourceSlice.actions
export const { resourceImage5FileChanged } = resourceSlice.actions
export const { resourceImage5PublicUrlChanged } = resourceSlice.actions
export const { quantityChanged } = resourceSlice.actions
export const { resourceTypeChanged } = resourceSlice.actions
export const { shopsChanged } = resourceSlice.actions
export const { selectedReserveFrameIdsChanged } = resourceSlice.actions
export const { selectableReserveFramesChanged } = resourceSlice.actions
export const { selectedShopIdsChanged } = resourceSlice.actions
export const { isShowReservePageChanged } = resourceSlice.actions
export const { reserveFrameInfoChanged } = resourceSlice.actions

export default resourceSlice.reducer
