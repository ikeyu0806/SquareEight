import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sharedComponentSlice = createSlice({
  name: 'sharedComponent',
  initialState: {
    navbarTitle: ''
  },
  reducers: {
    navbarTitleChanged: (state, action: PayloadAction<string>) => {
      state.navbarTitle = action.payload
    },
  },
})

export const { navbarTitleChanged } = sharedComponentSlice.actions

export default sharedComponentSlice.reducer
