import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UnreservableFrameParam } from 'interfaces/UnreservableFrameParam'
import { getZeroPaddingDate, getZeroPaddingTime } from 'functions/getZeroPaddingDatetime'


export const reserveFrameSlice = createSlice({
  name: 'alert',
  initialState: {
    showeserveFrameModal: false,
    startDate: getZeroPaddingDate(),
    startTime: getZeroPaddingTime(),
    endDate: getZeroPaddingDate(),
    endTime: getZeroPaddingTime(),
    title: '',
    description: '',
    isRepeat: false,
    repeatInterval: '',
    repeatIntervalNumber: 1,
    capacity: 1,
    repeatEndDate: '',
    localPaymentPrice: 1000,
    publishStatus: 'Unpublish',
    receptionType: 'Immediate',
    receptionStartDayBefore: 1,
    cancelReception: 'OnlyOnTheDay',
    cancelReceptionHourBefore: 1,
    cancelReceptionDayBefore: 1,
    unreservableFrames: [] as UnreservableFrameParam[]
  },
  reducers: {
    showReserveFrameModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showeserveFrameModal = action.payload
    },
    startDateChanged: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload
    },
    startTimeChanged: (state, action: PayloadAction<string>) => {
      state.startTime = action.payload
    },
    endDateChanged: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload
    },
    endTimeChanged: (state, action: PayloadAction<string>) => {
      state.endTime = action.payload
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
    repeatIntervalChanged: (state, action: PayloadAction<string>) => {
      state.repeatInterval = action.payload
    },
    repeatIntervalNumberChanged: (state, action: PayloadAction<number>) => {
      state.repeatIntervalNumber = action.payload
    },
    capacityChanged: (state, action: PayloadAction<number>) => {
      state.capacity = action.payload
    },
    repeatEndDateChanged: (state, action: PayloadAction<string>) => {
      state.repeatEndDate = action.payload
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
    cancelReceptionHourBeforeChanged: (state, action: PayloadAction<number>) => {
      state.cancelReceptionHourBefore = action.payload
    },
    cancelReceptionDayBeforeChanged: (state, action: PayloadAction<number>) => {
      state.cancelReceptionDayBefore = action.payload
    },
    unreservableFramesChanged: (state, action: PayloadAction<UnreservableFrameParam[]>) => {
      state.unreservableFrames = action.payload
    },
  },
})

export const { showReserveFrameModalChanged } = reserveFrameSlice.actions
export const { startDateChanged } = reserveFrameSlice.actions
export const { startTimeChanged } = reserveFrameSlice.actions
export const { endDateChanged } = reserveFrameSlice.actions
export const { endTimeChanged } = reserveFrameSlice.actions
export const { titleChanged } = reserveFrameSlice.actions
export const { descriptionChanged } = reserveFrameSlice.actions
export const { isRepeatChanged } = reserveFrameSlice.actions
export const { repeatIntervalChanged } = reserveFrameSlice.actions
export const { repeatIntervalNumberChanged } = reserveFrameSlice.actions
export const { capacityChanged } = reserveFrameSlice.actions
export const { repeatEndDateChanged } = reserveFrameSlice.actions
export const { localPaymentPriceChanged } = reserveFrameSlice.actions
export const { publishStatusChanged } = reserveFrameSlice.actions
export const { receptionTypeChanged } = reserveFrameSlice.actions
export const { receptionStartDayBeforeChanged } = reserveFrameSlice.actions
export const { cancelReceptionChanged } = reserveFrameSlice.actions
export const { cancelReceptionHourBeforeChanged } = reserveFrameSlice.actions
export const { cancelReceptionDayBeforeChanged } = reserveFrameSlice.actions
export const { unreservableFramesChanged } = reserveFrameSlice.actions

export default reserveFrameSlice.reducer
