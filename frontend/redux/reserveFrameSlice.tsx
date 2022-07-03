import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const reserveFrameSlice = createSlice({
  name: 'alert',
  initialState: {
    showeserveFrameModal: false,
    startAt: '',
    endAt: '',
    title: '',
    description: '',
    isRepeat: false,
    repeatInterval: 1,
    capacity: 1,
    localPaymentPrice: 1000,
    publishStatus: 'Unpublish',
    receptionType: 'Immediate',
    receptionStartDayBefore: 1,
    cancelReception: 'OnlyOnTheDay',
    cancelReseptionDayBefore: 1,
  },
  reducers: {
    showReserveFrameModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showeserveFrameModal = action.payload
    },
    startAtChanged: (state, action: PayloadAction<string>) => {
      state.startAt = action.payload
    },
    endAtChanged: (state, action: PayloadAction<string>) => {
      state.endAt = action.payload
    },
    titleChanged: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    descriptionChanged: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    isRepeatChanged: (state, action: PayloadAction<boolean>) => {
      state.isRepeat = action.payload
    },
    repeatIntervalChanged: (state, action: PayloadAction<number>) => {
      state.repeatInterval = action.payload
    },
    capacityChanged: (state, action: PayloadAction<number>) => {
      state.capacity = action.payload
    },
    localPaymentPriceChanged: (state, action: PayloadAction<number>) => {
      state.localPaymentPrice = action.payload
    },
    publishStatusChanged: (state, action: PayloadAction<string>) => {
      state.publishStatus = action.payload
    },
    receptionTypeChanged: (state, action: PayloadAction<string>) => {
      state.receptionType = action.payload
    },
    receptionStartDayBeforeChanged: (state, action: PayloadAction<number>) => {
      state.receptionStartDayBefore = action.payload
    },
    cancelReceptionChanged: (state, action: PayloadAction<string>) => {
      state.cancelReception = action.payload
    },
    cancelStartDayBeforeChanged: (state, action: PayloadAction<number>) => {
      state.cancelReseptionDayBefore = action.payload
    },
  },
})

export const { showReserveFrameModalChanged } = reserveFrameSlice.actions
export const { startAtChanged } = reserveFrameSlice.actions
export const { endAtChanged } = reserveFrameSlice.actions
export const { titleChanged } = reserveFrameSlice.actions
export const { descriptionChanged } = reserveFrameSlice.actions
export const { isRepeatChanged } = reserveFrameSlice.actions
export const { repeatIntervalChanged } = reserveFrameSlice.actions
export const { capacityChanged } = reserveFrameSlice.actions
export const { localPaymentPriceChanged } = reserveFrameSlice.actions
export const { publishStatusChanged } = reserveFrameSlice.actions
export const { receptionTypeChanged } = reserveFrameSlice.actions
export const { receptionStartDayBeforeChanged } = reserveFrameSlice.actions
export const { cancelReceptionChanged } = reserveFrameSlice.actions
export const { cancelStartDayBeforeChanged } = reserveFrameSlice.actions

export default reserveFrameSlice.reducer
