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
    holidayStart: '12:00',
    holidayEnd: '13:00',
    monBreakStart: '12:00',
    monBreakEnd: '13:00',
    tueBreakStart: '12:00',
    tueBreakEnd: '13:00',
    wedBreakStart: '12:00',
    wedBreakEnd: '13:00',
    thuBreakStart: '12:00',
    thuBreakEnd: '13:00',
    friBreakStart: '12:00',
    friBreakEnd: '13:00',
    satBreakStart: '12:00',
    satBreakEnd: '13:00',
    sunBreakStart: '12:00',
    sunBreakEnd: '13:00',
    holidayBreakStart: '12:00',
    holidayBreakEnd: '13:00',
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
    monBreakStartChanged: (state, action: PayloadAction<string>) => {
      state.monBreakStart = action.payload
    },
    monBreakEndChanged: (state, action: PayloadAction<string>) => {
      state.monBreakEnd = action.payload
    },
    tueBreakStartChanged: (state, action: PayloadAction<string>) => {
      state.tueBreakStart = action.payload
    },
    tueBreakEndChanged: (state, action: PayloadAction<string>) => {
      state.tueBreakEnd = action.payload
    },
    wedBreakStartChanged: (state, action: PayloadAction<string>) => {
      state.wedStart = action.payload
    },
    wedBreakEndChanged: (state, action: PayloadAction<string>) => {
      state.wedBreakEnd = action.payload
    },
    thuBreakStartChanged: (state, action: PayloadAction<string>) => {
      state.thuBreakStart = action.payload
    },
    thuBreakEndChanged: (state, action: PayloadAction<string>) => {
      state.thuBreakEnd = action.payload
    },
    friBreakStartChanged: (state, action: PayloadAction<string>) => {
      state.friBreakStart = action.payload
    },
    friBreakEndChanged: (state, action: PayloadAction<string>) => {
      state.friBreakEnd = action.payload
    },
    satBreakStartChanged: (state, action: PayloadAction<string>) => {
      state.satBreakStart = action.payload
    },
    satBreakEndChanged: (state, action: PayloadAction<string>) => {
      state.satBreakEnd = action.payload
    },
    sunBreakStartChanged: (state, action: PayloadAction<string>) => {
      state.sunBreakStart = action.payload
    },
    sunBreakEndChanged: (state, action: PayloadAction<string>) => {
      state.sunBreakEnd = action.payload
    },
    holidayBreakStartChanged: (state, action: PayloadAction<string>) => {
      state.holidayBreakStart = action.payload
    },
    holidayBreakEndChanged: (state, action: PayloadAction<string>) => {
      state.holidayBreakEnd = action.payload
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
export const { monBreakStartChanged } = alertSlice.actions
export const { monBreakEndChanged } = alertSlice.actions
export const { tueBreakStartChanged } = alertSlice.actions
export const { tueBreakEndChanged } = alertSlice.actions
export const { wedBreakStartChanged } = alertSlice.actions
export const { wedBreakEndChanged } = alertSlice.actions
export const { thuBreakStartChanged } = alertSlice.actions
export const { thuBreakEndChanged } = alertSlice.actions
export const { friBreakStartChanged } = alertSlice.actions
export const { friBreakEndChanged } = alertSlice.actions
export const { satBreakStartChanged } = alertSlice.actions
export const { satBreakEndChanged } = alertSlice.actions
export const { sunBreakStartChanged } = alertSlice.actions
export const { sunBreakEndChanged } = alertSlice.actions
export const { holidayBreakStartChanged } = alertSlice.actions
export const { holidayBreakEndChanged } = alertSlice.actions

export default alertSlice.reducer
