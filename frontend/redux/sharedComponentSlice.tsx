import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sharedComponentSlice = createSlice({
  name: 'sharedComponent',
  initialState: {
    navbarBrandText: '',
    navbarBrandImage: null as File | unknown,
    navbarBrandImagePublicUrl: '',
    navbarBrandImageWidth: 100,
    navbarBrandImageHeight: 100,
    navbarBrandType: '',
    navbarBrandColor: '',
    navbarBrandBackgroundColor: '',
    navbarBrandVariantColor: '',
    isUpdateNavbarBrandImage: false,
    footerCopyRightText: '',
    hideShareButton: false,
  },
  reducers: {
    navbarBrandTextChanged: (state, action: PayloadAction<string>) => {
      state.navbarBrandText = action.payload
    },
    navbarBrandImageChanged: (state, action: PayloadAction<File>) => {
      state.navbarBrandImage = action.payload
    },
    navbarBrandImageWidthChanged: (state, action: PayloadAction<number>) => {
      state.navbarBrandImageWidth = action.payload
    },
    navbarBrandImageHeightChanged: (state, action: PayloadAction<number>) => {
      state.navbarBrandImageHeight = action.payload
    },
    navbarBrandTypeChanged: (state, action: PayloadAction<string>) => {
      state.navbarBrandType = action.payload
    },
    navbarBrandBackgroundColorChanged: (state, action: PayloadAction<string>) => {
      state.navbarBrandBackgroundColor = action.payload
    },
    navbarBrandVariantColorChanged: (state, action: PayloadAction<string>) => {
      state.navbarBrandVariantColor = action.payload
    },
    isUpdateNavbarBrandImageChanged: (state, action: PayloadAction<boolean>) => {
      state.isUpdateNavbarBrandImage = action.payload
    },
    footerCopyRightTextChanged: (state, action: PayloadAction<string>) => {
      state.footerCopyRightText = action.payload
    },
    hideShareButtonChanged: (state, action: PayloadAction<boolean>) => {
      state.hideShareButton = action.payload
    },
  },
})

export const { navbarBrandTextChanged } = sharedComponentSlice.actions
export const { navbarBrandImageChanged } = sharedComponentSlice.actions
export const { navbarBrandImageWidthChanged } = sharedComponentSlice.actions
export const { navbarBrandImageHeightChanged } = sharedComponentSlice.actions
export const { navbarBrandTypeChanged } = sharedComponentSlice.actions
export const { navbarBrandBackgroundColorChanged } = sharedComponentSlice.actions
export const { navbarBrandVariantColorChanged } = sharedComponentSlice.actions
export const { isUpdateNavbarBrandImageChanged } = sharedComponentSlice.actions
export const { footerCopyRightTextChanged } = sharedComponentSlice.actions
export const { hideShareButtonChanged } = sharedComponentSlice.actions

export default sharedComponentSlice.reducer
