import { configureStore } from '@reduxjs/toolkit'
import homepageReducer from './homepageSlice'

export const store = configureStore({
  reducer: {
    homepage: homepageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
