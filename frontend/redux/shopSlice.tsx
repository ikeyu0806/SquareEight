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
    pageCoverSlide1File: null as File | unknown,
    pageCoverSlide2File:  null as File | unknown,
    pageCoverSlide3File:  null as File | unknown,
    brandImageFile: null as File | unknown,
    shopImage1File: null as File | unknown,
    shopImage2File:  null as File | unknown,
    shopImage3File:  null as File | unknown,
    pageCoverSlide1ImagePublicUrl: '',
    pageCoverSlide2ImagePublicUrl: '',
    pageCoverSlide3ImagePublicUrl: '',
    brandImagePublicUrl: '',
    shopImage1ImagePublicUrl: '',
    shopImage2ImagePublicUrl: '',
    shopImage3ImagePublicUrl: '',
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
    pageCoverSlide1FileChanged: (state, action: PayloadAction<File>) => {
      state.pageCoverSlide1File = action.payload
    },
    pageCoverSlide2FileChanged: (state, action: PayloadAction<File>) => {
      state.pageCoverSlide2File = action.payload
    },
    pageCoverSlide3FileChanged: (state, action: PayloadAction<File>) => {
      state.pageCoverSlide3File = action.payload
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
    pageCoverSlide1ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.pageCoverSlide1ImagePublicUrl = action.payload
    },
    pageCoverSlide2ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.pageCoverSlide1ImagePublicUrl = action.payload
    },
    pageCoverSlide3ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.pageCoverSlide1ImagePublicUrl = action.payload
    },
    brandImageImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.brandImagePublicUrl = action.payload
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
export const { pageCoverSlide1FileChanged } = shopSlice.actions
export const { pageCoverSlide2FileChanged } = shopSlice.actions
export const { pageCoverSlide3FileChanged } = shopSlice.actions
export const { brandImageFileChanged } = shopSlice.actions
export const { shopImage1FileChanged } = shopSlice.actions
export const { shopImage2FileChanged } = shopSlice.actions
export const { shopImage3FileChanged } = shopSlice.actions
export const { pageCoverSlide1ImagePublicUrlChanged } = shopSlice.actions
export const { pageCoverSlide2ImagePublicUrlChanged } = shopSlice.actions
export const { pageCoverSlide3ImagePublicUrlChanged } = shopSlice.actions
export const { brandImageImagePublicUrlChanged } = shopSlice.actions
export const { shopImage1ImagePublicUrlChanged } = shopSlice.actions
export const { shopImage2ImagePublicUrlChanged } = shopSlice.actions
export const { shopImage3ImagePublicUrlChanged } = shopSlice.actions
export const { businessTypeChanged } = shopSlice.actions

export default shopSlice.reducer
