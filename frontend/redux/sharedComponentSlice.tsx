import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sharedComponentSlice = createSlice({
  name: 'sharedComponent',
  initialState: {
    navbarTitle: '',
    showHeaderEditModal: false,
    showFooterEditModal: false,
  },
  reducers: {
    navbarTitleChanged: (state, action: PayloadAction<string>) => {
      state.navbarTitle = action.payload
    },
    showHeaderEditModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showHeaderEditModal = action.payload
    },
    showFooterEditModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showFooterEditModal = action.payload
    },
  },
})

export const { navbarTitleChanged } = sharedComponentSlice.actions
export const { showHeaderEditModalChanged } = sharedComponentSlice.actions
export const { showFooterEditModalChanged } = sharedComponentSlice.actions

export default sharedComponentSlice.reducer
