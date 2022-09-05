import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sharedComponentSlice = createSlice({
  name: 'sharedComponent',
  initialState: {
    navbarBrandText: '',
    navbarBrandImage: null,
    navbarBrandImageWidth: 100,
    navbarBrandImageHeight: 100,
    navbarBrandType: '',
    navbarBrandColorVariant: '',
    showHeaderEditModal: false,
    showFooterEditModal: false,
  },
  reducers: {
    navbarBrandTextChanged: (state, action: PayloadAction<string>) => {
      state.navbarBrandText = action.payload
    },
    navbarBrandImageChanged: (state, action: PayloadAction<any>) => {
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
    navbarBrandColorVariantChanged: (state, action: PayloadAction<string>) => {
      state.navbarBrandColorVariant = action.payload
    },
    showHeaderEditModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showHeaderEditModal = action.payload
    },
    showFooterEditModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showFooterEditModal = action.payload
    },
  },
})

export const { navbarBrandTextChanged } = sharedComponentSlice.actions
export const { navbarBrandImageChanged } = sharedComponentSlice.actions
export const { navbarBrandImageWidthChanged } = sharedComponentSlice.actions
export const { navbarBrandImageHeightChanged } = sharedComponentSlice.actions
export const { navbarBrandTypeChanged } = sharedComponentSlice.actions
export const { navbarBrandColorVariantChanged } = sharedComponentSlice.actions
export const { showHeaderEditModalChanged } = sharedComponentSlice.actions
export const { showFooterEditModalChanged } = sharedComponentSlice.actions

export default sharedComponentSlice.reducer
