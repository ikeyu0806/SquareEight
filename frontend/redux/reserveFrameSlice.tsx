import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UnreservableFrameParam } from 'interfaces/UnreservableFrameParam'
import { ReservableFrameTicketMasterParam } from 'interfaces/ReservableFrameTicketMasterParam'
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
    repeatIntervalType: 'Day',
    repeatIntervalNumberDay: 1,
    repeatIntervalNumberWeek: 1,
    repeatIntervalNumberMonth: 1,
    repeatIntervalMonthDate: 1,
    capacity: 1,
    repeatEndDate: getZeroPaddingDate(),
    localPaymentPrice: 1000,
    publishStatus: 'Unpublish',
    receptionType: 'Immediate',
    receptionStartDayBefore: 1,
    cancelReception: 'OnlyOnTheDay',
    cancelReceptionHourBefore: 1,
    cancelReceptionDayBefore: 1,
    unreservableFrames: [] as UnreservableFrameParam[],
    resourceIds: [] as number[],
    reserveEvents: [],
    monthlyPaymentPlans: [],
    reservableFrameTicketMaster: [] as ReservableFrameTicketMasterParam[]
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
    repeatIntervalTypeChanged: (state, action: PayloadAction<string>) => {
      state.repeatIntervalType = action.payload
    },
    repeatIntervalNumberDayChanged: (state, action: PayloadAction<number>) => {
      state.repeatIntervalNumberDay = action.payload
    },
    repeatIntervalNumberWeekChanged: (state, action: PayloadAction<number>) => {
      state.repeatIntervalNumberWeek = action.payload
    },
    repeatIntervalNumberMonthChanged: (state, action: PayloadAction<number>) => {
      state.repeatIntervalNumberMonth = action.payload
    },
    repeatIntervalMonthDateChanged: (state, action: PayloadAction<number>) => {
      state.repeatIntervalMonthDate = action.payload
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
    resourceIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.resourceIds = action.payload
    },
    reserveEventsChanged: (state, action: PayloadAction<[]>) => {
      state.reserveEvents = action.payload
    },
    monthlyPaymentPlansChanged: (state, action: PayloadAction<[]>) => {
      state.monthlyPaymentPlans = action.payload
    },
    reservableFrameTicketMasterChanged: (state, action: PayloadAction<[]>) => {
      state.reservableFrameTicketMaster = action.payload
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
export const { repeatIntervalTypeChanged } = reserveFrameSlice.actions
export const { repeatIntervalNumberDayChanged } = reserveFrameSlice.actions
export const { repeatIntervalNumberWeekChanged } = reserveFrameSlice.actions
export const { repeatIntervalNumberMonthChanged } = reserveFrameSlice.actions
export const { repeatIntervalMonthDateChanged } = reserveFrameSlice.actions
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
export const { resourceIdsChanged } = reserveFrameSlice.actions
export const { reserveEventsChanged } = reserveFrameSlice.actions
export const { monthlyPaymentPlansChanged } = reserveFrameSlice.actions
export const { reservableFrameTicketMasterChanged } = reserveFrameSlice.actions

export default reserveFrameSlice.reducer
