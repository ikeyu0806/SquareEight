import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    monStart: '10:00',
    monEnd: '19:00',
    tueStart: '10:00',
    tueEnd: '19:00',
    wedStart: '10:00',
    wedEnd: '19:00',
    thuStart: '10:00',
    thuEnd: '19:00',
    friStart: '10:00',
    friEnd: '19:00',
    satStart: '10:00',
    satEnd: '19:00',
    sunStart: '10:00',
    sunEnd: '19:00',
    holidayStart: '10:00',
    holidayEnd: '19:00',
  },
  reducers: {
    monStartChanged: (state, action: PayloadAction<string>) => {
      state.monStart = action.payload
    },
    monEndChanged: (state, action: PayloadAction<string>) => {
      state.monEnd = action.payload
    },
    tueStartChanged: (state, action: PayloadAction<string>) => {
      state.tueStart = action.payload
    },
    tueEndChanged: (state, action: PayloadAction<string>) => {
      state.tueEnd = action.payload
    },
    wedStartChanged: (state, action: PayloadAction<string>) => {
      state.wedStart = action.payload
    },
    wedEndChanged: (state, action: PayloadAction<string>) => {
      state.wedEnd = action.payload
    },
    thuStartChanged: (state, action: PayloadAction<string>) => {
      state.thuStart = action.payload
    },
    thuEndChanged: (state, action: PayloadAction<string>) => {
      state.thuEnd = action.payload
    },
    friStartChanged: (state, action: PayloadAction<string>) => {
      state.friStart = action.payload
    },
    friEndChanged: (state, action: PayloadAction<string>) => {
      state.friEnd = action.payload
    },
    satStartChanged: (state, action: PayloadAction<string>) => {
      state.satStart = action.payload
    },
    satEndChanged: (state, action: PayloadAction<string>) => {
      state.satEnd = action.payload
    },
    sunStartChanged: (state, action: PayloadAction<string>) => {
      state.sunStart = action.payload
    },
    sunEndChanged: (state, action: PayloadAction<string>) => {
      state.sunEnd = action.payload
    },
    holidayStartChanged: (state, action: PayloadAction<string>) => {
      state.holidayStart = action.payload
    },
    holidayEndChanged: (state, action: PayloadAction<string>) => {
      state.holidayEnd = action.payload
    },
  },
})

export const { monStartChanged } = alertSlice.actions
export const { monEndChanged } = alertSlice.actions
export const { tueStartChanged } = alertSlice.actions
export const { tueEndChanged } = alertSlice.actions
export const { wedStartChanged } = alertSlice.actions
export const { wedEndChanged } = alertSlice.actions
export const { thuStartChanged } = alertSlice.actions
export const { thuEndChanged } = alertSlice.actions
export const { friStartChanged } = alertSlice.actions
export const { friEndChanged } = alertSlice.actions
export const { satStartChanged } = alertSlice.actions
export const { satEndChanged } = alertSlice.actions
export const { sunStartChanged } = alertSlice.actions
export const { sunEndChanged } = alertSlice.actions
export const { holidayStartChanged } = alertSlice.actions
export const { holidayEndChanged } = alertSlice.actions

export default alertSlice.reducer
