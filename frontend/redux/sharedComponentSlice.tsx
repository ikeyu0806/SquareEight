import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sharedComponentSlice = createSlice({
  name: 'sharedComponent',
  initialState: {
    navbarBrandText: '',
    navbarBrandImage: null,
    navbarBrandType: '',
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
    navbarBrandTypeChanged: (state, action: PayloadAction<any>) => {
      state.navbarBrandImage = action.payload
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
export const { navbarBrandTypeChanged } = sharedComponentSlice.actions
export const { showHeaderEditModalChanged } = sharedComponentSlice.actions
export const { showFooterEditModalChanged } = sharedComponentSlice.actions

export default sharedComponentSlice.reducer
