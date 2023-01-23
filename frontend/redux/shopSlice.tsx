import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReserveFrameInfo } from 'interfaces/ShopParam'
import { MonthlyPatmentPlanInfo } from 'interfaces/ShopParam'

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    name: '',
    description1: '',
    description2: '',
    postalCode: '',
    state: '',
    city: '',
    town: '',
    line1: '',
    line2: '',
    accessInfo: '',
    parkingLotDisplayStatus: '',
    remarks: '',
    brandImageFile: null as File | unknown,
    shopImage1File: null as File | unknown,
    shopImage2File:  null as File | unknown,
    shopImage3File:  null as File | unknown,
    shopImage4File:  null as File | unknown,
    shopImage5File:  null as File | unknown,
    shopImage6File:  null as File | unknown,
    shopImage1ImagePublicUrl: '',
    shopImage2ImagePublicUrl: '',
    shopImage3ImagePublicUrl: '',
    shopImage4ImagePublicUrl: '',
    shopImage5ImagePublicUrl: '',
    shopImage6ImagePublicUrl: '',
    businessType: '',
    reserveFrameInfo: [] as ReserveFrameInfo[],
    monthlyPatmentPlanInfo: [] as MonthlyPatmentPlanInfo[]
  },
  reducers: {
    nameChanged: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    description1Changed: (state, action: PayloadAction<string>) => {
      state.description1 = action.payload
    },
    description2Changed: (state, action: PayloadAction<string>) => {
      state.description2 = action.payload
    },
    postalCodeChanged: (state, action: PayloadAction<string>) => {
      state.postalCode = action.payload
    },
    stateChanged: (state, action: PayloadAction<string>) => {
      state.state = action.payload
    },
    cityChanged: (state, action: PayloadAction<string>) => {
      state.city = action.payload
    },
    townChanged: (state, action: PayloadAction<string>) => {
      state.town = action.payload
    },
    line1Changed: (state, action: PayloadAction<string>) => {
      state.line1 = action.payload
    },
    line2Changed: (state, action: PayloadAction<string>) => {
      state.line2 = action.payload
    },
    accessInfoChanged: (state, action: PayloadAction<string>) => {
      state.accessInfo = action.payload
    },
    parkingLotDisplayStatusChanged: (state, action: PayloadAction<string>) => {
      state.parkingLotDisplayStatus = action.payload
    },
    remarksChanged: (state, action: PayloadAction<string>) => {
      state.remarks = action.payload
    },
    brandImageFileChanged: (state, action: PayloadAction<File>) => {
      state.brandImageFile = action.payload
    },
    shopImage1FileChanged: (state, action: PayloadAction<File>) => {
      state.shopImage1File = action.payload
    },
    shopImage2FileChanged: (state, action: PayloadAction<File>) => {
      state.shopImage2File = action.payload
    },
    shopImage3FileChanged: (state, action: PayloadAction<File>) => {
      state.shopImage3File = action.payload
    },
    shopImage4FileChanged: (state, action: PayloadAction<File>) => {
      state.shopImage4File = action.payload
    },
    shopImage5FileChanged: (state, action: PayloadAction<File>) => {
      state.shopImage5File = action.payload
    },
    shopImage6FileChanged: (state, action: PayloadAction<File>) => {
      state.shopImage6File = action.payload
    },
    shopImage1ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage1ImagePublicUrl = action.payload
    },
    shopImage2ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage2ImagePublicUrl = action.payload
    },
    shopImage3ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage3ImagePublicUrl = action.payload
    },
    shopImage4ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage4ImagePublicUrl = action.payload
    },
    shopImage5ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage5ImagePublicUrl = action.payload
    },
    shopImage6ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage6ImagePublicUrl = action.payload
    },
    businessTypeChanged: (state, action: PayloadAction<string>) => {
      state.businessType = action.payload
    },
    reserveFrameInfoChanged: (state, action: PayloadAction<ReserveFrameInfo[]>) => {
      state.reserveFrameInfo = action.payload
    },
    monthlyPatmentPlanInfoChanged: (state, action: PayloadAction<MonthlyPatmentPlanInfo[]>) => {
      state.monthlyPatmentPlanInfo = action.payload
    },
  },
})

export const { nameChanged } = shopSlice.actions
export const { description1Changed } = shopSlice.actions
export const { description2Changed } = shopSlice.actions
export const { postalCodeChanged } = shopSlice.actions
export const { stateChanged } = shopSlice.actions
export const { cityChanged } = shopSlice.actions
export const { townChanged } = shopSlice.actions
export const { line1Changed } = shopSlice.actions
export const { line2Changed } = shopSlice.actions
export const { accessInfoChanged } = shopSlice.actions
export const { parkingLotDisplayStatusChanged } = shopSlice.actions
export const { remarksChanged } = shopSlice.actions
export const { brandImageFileChanged } = shopSlice.actions
export const { shopImage1FileChanged } = shopSlice.actions
export const { shopImage2FileChanged } = shopSlice.actions
export const { shopImage3FileChanged } = shopSlice.actions
export const { shopImage4FileChanged } = shopSlice.actions
export const { shopImage5FileChanged } = shopSlice.actions
export const { shopImage6FileChanged } = shopSlice.actions
export const { shopImage1ImagePublicUrlChanged } = shopSlice.actions
export const { shopImage2ImagePublicUrlChanged } = shopSlice.actions
export const { shopImage3ImagePublicUrlChanged } = shopSlice.actions
export const { shopImage4ImagePublicUrlChanged } = shopSlice.actions
export const { shopImage5ImagePublicUrlChanged } = shopSlice.actions
export const { shopImage6ImagePublicUrlChanged } = shopSlice.actions
export const { businessTypeChanged } = shopSlice.actions
export const { reserveFrameInfoChanged } = shopSlice.actions
export const { monthlyPatmentPlanInfoChanged } = shopSlice.actions

export default shopSlice.reducer
