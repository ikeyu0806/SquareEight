import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    pageCoverSlide1s3ObjectPublicUrl: '',
    pageCoverSlide2s3ObjectPublicUrl: '',
    pageCoverSlide3s3ObjectPublicUrl: '',
    brandImage3s3ObjectPublicUrl: '',
    shopImage13s3ObjectPublicUrl: '',
    shopImage23s3ObjectPublicUrl: '',
    shopImage33s3ObjectPublicUrl: '',
    businessType: ''
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
    pageCoverSlide1s3ObjectPublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.pageCoverSlide1s3ObjectPublicUrl = action.payload
    },
    pageCoverSlide2s3ObjectPublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.pageCoverSlide1s3ObjectPublicUrl = action.payload
    },
    pageCoverSlide3s3ObjectPublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.pageCoverSlide1s3ObjectPublicUrl = action.payload
    },
    brandImage3s3ObjectPublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.brandImage3s3ObjectPublicUrl = action.payload
    },
    shopImage13s3ObjectPublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage13s3ObjectPublicUrl = action.payload
    },
    shopImage23s3ObjectPublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage23s3ObjectPublicUrl = action.payload
    },
    shopImage33s3ObjectPublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.shopImage33s3ObjectPublicUrl = action.payload
    },
    businessTypeChanged: (state, action: PayloadAction<string>) => {
      state.businessType = action.payload
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
export const { pageCoverSlide1s3ObjectPublicUrlChanged } = shopSlice.actions
export const { pageCoverSlide2s3ObjectPublicUrlChanged } = shopSlice.actions
export const { pageCoverSlide3s3ObjectPublicUrlChanged } = shopSlice.actions
export const { brandImage3s3ObjectPublicUrlChanged } = shopSlice.actions
export const { shopImage13s3ObjectPublicUrlChanged } = shopSlice.actions
export const { shopImage23s3ObjectPublicUrlChanged } = shopSlice.actions
export const { shopImage33s3ObjectPublicUrlChanged } = shopSlice.actions
export const { businessTypeChanged } = shopSlice.actions

export default shopSlice.reducer
