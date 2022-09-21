import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReserveFrameReceptionTimeParam } from 'interfaces/ReserveFrameReceptionTimeParam'
import { UnreservableFrameParam } from 'interfaces/UnreservableFrameParam'
import { ReservableFrameTicketMasterParam } from 'interfaces/ReservableFrameTicketMasterParam'
import { OutOfRepeatReservableFrameParam } from 'interfaces/OutOfRepeatReservableFrameParam'
import { getZeroPaddingDate } from 'functions/getZeroPaddingDatetime'

export const reserveFrameSlice = createSlice({
  name: 'reserveFrame',
  initialState: {
    reserveFrameId: 0,
    showCreateReserveFrameModal: false,
    showEditReserveFrameModal: false,
    startDate: getZeroPaddingDate(),
    title: '',
    description: '',
    isRepeat: false,
    isSetPrice: true,
    repeatIntervalType: 'Day',
    repeatIntervalNumberDay: 1,
    repeatIntervalNumberWeek: 1,
    repeatIntervalNumberMonth: 1,
    repeatIntervalMonthDate: 1,
    repeatWDays: [] as string[],
    isEveryDayRepeat: true,
    isEveryWeekRepeat: true,
    isEveryMonthRepeat: true,
    capacity: 1,
    repeatEndDate: getZeroPaddingDate(),
    localPaymentPrice: 1000,
    creditCardPaymentPrice: 1000,
    publishStatus: '',
    receptionType: 'Immediate',
    receptionPhoneNumber: '',
    receptionStartDayBefore: 1,
    cancelReception: 'OnlyOnTheDay',
    cancelReceptionHourBefore: 1,
    cancelReceptionDayBefore: 1,
    isLocalPaymentEnable: false,
    isCreditCardPaymentEnable: false,
    isTicketPaymentEnable: false,
    isMonthlyPlanPaymentEnable: false,
    base64Image: null,
    s3ObjectPublicUrl: '',
    reserveFrameReceptionTimes: [] as ReserveFrameReceptionTimeParam[],
    outOfRepeatReservableFrames: [] as OutOfRepeatReservableFrameParam[],
    unreservableFrames: [] as UnreservableFrameParam[],
    resourceIds: [] as number[],
    reserveEvents: [],
    monthlyPaymentPlanIds: [] as number[],
    reservableFrameTicketMaster: [] as ReservableFrameTicketMasterParam[]
  },
  reducers: {
    reserveFrameIdChanged: (state, action: PayloadAction<number>) => {
      state.reserveFrameId = action.payload
    },
    showCreateReserveFrameModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showCreateReserveFrameModal = action.payload
    },
    showEditReserveFrameModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showEditReserveFrameModal = action.payload
    },
    startDateChanged: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload
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
    isSetPriceChanged: (state, action: PayloadAction<boolean>) => {
      state.isSetPrice = action.payload
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
    repeatWDaysChanged: (state, action: PayloadAction<string[]>) => {
      state.repeatWDays = action.payload
    },
    isEveryDayRepeatChanged: (state, action: PayloadAction<boolean>) => {
      state.isEveryDayRepeat = action.payload
    },
    isEveryWeekRepeatChanged: (state, action: PayloadAction<boolean>) => {
      state.isEveryWeekRepeat = action.payload
    },
    isEveryMonthRepeatChanged: (state, action: PayloadAction<boolean>) => {
      state.isEveryMonthRepeat = action.payload
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
    creditCardPaymentPriceChanged: (state, action: PayloadAction<number>) => {
      state.creditCardPaymentPrice = action.payload
    },
    publishStatusChanged: (state, action: PayloadAction<string>) => {
      state.publishStatus = action.payload
    },
    receptionTypeChanged: (state, action: PayloadAction<string>) => {
      state.receptionType = action.payload
    },
    receptionPhoneNumberChanged: (state, action: PayloadAction<string>) => {
      state.receptionPhoneNumber = action.payload
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
    isLocalPaymentEnableChanged: (state, action: PayloadAction<boolean>) => {
      state.isLocalPaymentEnable = action.payload
    },
    isCreditCardPaymentEnableChanged: (state, action: PayloadAction<boolean>) => {
      state.isCreditCardPaymentEnable = action.payload
    },
    isTicketPaymentEnableChanged: (state, action: PayloadAction<boolean>) => {
      state.isTicketPaymentEnable = action.payload
    },
    isMonthlyPlanPaymentEnableChanged: (state, action: PayloadAction<boolean>) => {
      state.isMonthlyPlanPaymentEnable = action.payload
    },
    base64ImageChanged: (state, action: PayloadAction<any>) => {
      state.base64Image = action.payload
    },
    s3ObjectPublicUrlChanged: (state, action: PayloadAction<any>) => {
      state.s3ObjectPublicUrl = action.payload
    },
    reserveFrameReceptionTimesChanged: (state, action: PayloadAction<ReserveFrameReceptionTimeParam[]>) => {
      state.reserveFrameReceptionTimes = action.payload
    },
    outOfRepeatReservableFramesChanged: (state, action: PayloadAction<OutOfRepeatReservableFrameParam[]>) => {
      state.outOfRepeatReservableFrames = action.payload
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
    monthlyPaymentPlanIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.monthlyPaymentPlanIds = action.payload
    },
    reservableFrameTicketMasterChanged: (state, action: PayloadAction<ReservableFrameTicketMasterParam[]>) => {
      state.reservableFrameTicketMaster = action.payload
    },
  },
})

export const { reserveFrameIdChanged } = reserveFrameSlice.actions
export const { showCreateReserveFrameModalChanged } = reserveFrameSlice.actions
export const { showEditReserveFrameModalChanged } = reserveFrameSlice.actions
export const { startDateChanged } = reserveFrameSlice.actions
export const { titleChanged } = reserveFrameSlice.actions
export const { descriptionChanged } = reserveFrameSlice.actions
export const { isRepeatChanged } = reserveFrameSlice.actions
export const { isSetPriceChanged } = reserveFrameSlice.actions
export const { repeatIntervalTypeChanged } = reserveFrameSlice.actions
export const { repeatIntervalNumberDayChanged } = reserveFrameSlice.actions
export const { repeatIntervalNumberWeekChanged } = reserveFrameSlice.actions
export const { repeatIntervalNumberMonthChanged } = reserveFrameSlice.actions
export const { repeatIntervalMonthDateChanged } = reserveFrameSlice.actions
export const { repeatWDaysChanged } = reserveFrameSlice.actions
export const { isEveryDayRepeatChanged } = reserveFrameSlice.actions
export const { isEveryWeekRepeatChanged } = reserveFrameSlice.actions
export const { isEveryMonthRepeatChanged } = reserveFrameSlice.actions
export const { capacityChanged } = reserveFrameSlice.actions
export const { repeatEndDateChanged } = reserveFrameSlice.actions
export const { localPaymentPriceChanged } = reserveFrameSlice.actions
export const { creditCardPaymentPriceChanged } = reserveFrameSlice.actions
export const { publishStatusChanged } = reserveFrameSlice.actions
export const { receptionTypeChanged } = reserveFrameSlice.actions
export const { receptionPhoneNumberChanged } = reserveFrameSlice.actions
export const { receptionStartDayBeforeChanged } = reserveFrameSlice.actions
export const { cancelReceptionChanged } = reserveFrameSlice.actions
export const { cancelReceptionHourBeforeChanged } = reserveFrameSlice.actions
export const { cancelReceptionDayBeforeChanged } = reserveFrameSlice.actions
export const { isLocalPaymentEnableChanged } = reserveFrameSlice.actions
export const { isCreditCardPaymentEnableChanged } = reserveFrameSlice.actions
export const { isTicketPaymentEnableChanged } = reserveFrameSlice.actions
export const { isMonthlyPlanPaymentEnableChanged } = reserveFrameSlice.actions
export const { base64ImageChanged } = reserveFrameSlice.actions
export const { s3ObjectPublicUrlChanged } = reserveFrameSlice.actions
export const { reserveFrameReceptionTimesChanged } = reserveFrameSlice.actions
export const { outOfRepeatReservableFramesChanged } = reserveFrameSlice.actions
export const { unreservableFramesChanged } = reserveFrameSlice.actions
export const { resourceIdsChanged } = reserveFrameSlice.actions
export const { reserveEventsChanged } = reserveFrameSlice.actions
export const { monthlyPaymentPlanIdsChanged } = reserveFrameSlice.actions
export const { reservableFrameTicketMasterChanged } = reserveFrameSlice.actions

export default reserveFrameSlice.reducer
