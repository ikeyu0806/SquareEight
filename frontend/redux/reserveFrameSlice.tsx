import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReserveFrameReceptionTimeParam } from 'interfaces/ReserveFrameReceptionTimeParam'
import { ReservableFrameTicketMasterParam } from 'interfaces/ReservableFrameTicketMasterParam'
import { MultiPaymentMethod } from 'interfaces/MultiPaymentMethod'
import { getZeroPaddingDate } from 'functions/getZeroPaddingDatetime'

export const reserveFrameSlice = createSlice({
  name: 'reserveFrame',
  initialState: {
    reserveFrameId: 0,
    publicId: '',
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
    receptionStartDayBefore: 30,
    receptionDeadline: 'OnlyOnTheDay',
    receptionDeadlineHourBefore: 1,
    receptionDeadlineDayBefore: 1,
    isLocalPaymentEnable: false,
    isCreditCardPaymentEnable: false,
    isTicketPaymentEnable: false,
    isMonthlyPlanPaymentEnable: false,
    applyMultiLocalPaymentPrice: false,
    applyMultiCreditCardPaymentPrice: false,
    questionnaireMasterId: '',
    multiLocalPaymentPrices: [{name: '大人', price: 1000}, {name: '子供', price: 500}] as MultiPaymentMethod[],
    multiCreditCardPaymentPrices: [{name: '大人', price: 1000}, {name: '子供', price: 500}] as MultiPaymentMethod[],
    reserveFrameImage1File: null as File | unknown,
    reserveFrameImage2File:  null as File | unknown,
    reserveFrameImage3File:  null as File | unknown,
    reserveFrameImage4File:  null as File | unknown,
    reserveFrameImage5File:  null as File | unknown,
    reserveFrameImage1ImagePublicUrl: '',
    reserveFrameImage2ImagePublicUrl: '',
    reserveFrameImage3ImagePublicUrl: '',
    reserveFrameImage4ImagePublicUrl: '',
    reserveFrameImage5ImagePublicUrl: '',
    s3ObjectPublicUrl: '',
    isAcceptCancel: false,
    isAcceptCancelOnTheDay: false,
    cancelReceptionDayBefore: 1,
    cancelReceptionHourBefore: 1,
    lotteryConfirmedDayBefore: 1,
    reserveFrameReceptionTimes: [] as ReserveFrameReceptionTimeParam[],
    outOfRangeFrames: [] as string[],
    unreservableFrames: [] as string[],
    resourceIds: [] as number[],
    shopIds: [] as number[],
    reserveEvents: [],
    monthlyPaymentPlanIds: [] as number[],
    reservableFrameTicketMaster: [] as ReservableFrameTicketMasterParam[]
  },
  reducers: {
    reserveFrameIdChanged: (state, action: PayloadAction<number>) => {
      state.reserveFrameId = action.payload
    },
    publicIdChanged: (state, action: PayloadAction<string>) => {
      state.publicId = action.payload
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
    applyMultiLocalPaymentPriceChanged: (state, action: PayloadAction<boolean>) => {
      state.applyMultiLocalPaymentPrice = action.payload
    },
    applyMultiCreditCardPaymentPriceChanged: (state, action: PayloadAction<boolean>) => {
      state.applyMultiCreditCardPaymentPrice = action.payload
    },
    multiLocalPaymentPricesChanged: (state, action: PayloadAction<MultiPaymentMethod[]>) => {
      state.multiLocalPaymentPrices = action.payload
    },
    multiCreditCardPaymentPricesChanged: (state, action: PayloadAction<MultiPaymentMethod[]>) => {
      state.multiCreditCardPaymentPrices = action.payload
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
    receptionDeadlineChanged: (state, action: PayloadAction<string>) => {
      state.receptionDeadline = action.payload
    },
    receptionDeadlineHourBeforeChanged: (state, action: PayloadAction<number>) => {
      state.receptionDeadlineHourBefore = action.payload
    },
    receptionDeadlineDayBeforeChanged: (state, action: PayloadAction<number>) => {
      state.receptionDeadlineDayBefore = action.payload
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
    reserveFrameImage1FileChanged: (state, action: PayloadAction<File>) => {
      state.reserveFrameImage1File = action.payload
    },
    reserveFrameImage2FileChanged: (state, action: PayloadAction<File>) => {
      state.reserveFrameImage2File = action.payload
    },
    reserveFrameImage3FileChanged: (state, action: PayloadAction<File>) => {
      state.reserveFrameImage3File = action.payload
    },
    reserveFrameImage4FileChanged: (state, action: PayloadAction<File>) => {
      state.reserveFrameImage4File = action.payload
    },
    reserveFrameImage5FileChanged: (state, action: PayloadAction<File>) => {
      state.reserveFrameImage5File = action.payload
    },
    reserveFrameImage1ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.reserveFrameImage1ImagePublicUrl = action.payload
    },
    reserveFrameImage2ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.reserveFrameImage2ImagePublicUrl = action.payload
    },
    reserveFrameImage3ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.reserveFrameImage3ImagePublicUrl = action.payload
    },
    reserveFrameImage4ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.reserveFrameImage4ImagePublicUrl = action.payload
    },
    reserveFrameImage5ImagePublicUrlChanged: (state, action: PayloadAction<string>) => {
      state.reserveFrameImage5ImagePublicUrl = action.payload
    },
    s3ObjectPublicUrlChanged: (state, action: PayloadAction<any>) => {
      state.s3ObjectPublicUrl = action.payload
    },
    isAcceptCancelChanged: (state, action: PayloadAction<boolean>) => {
      state.isAcceptCancel = action.payload
    },
    isAcceptCancelOnTheDayChanged: (state, action: PayloadAction<boolean>) => {
      state.isAcceptCancelOnTheDay = action.payload
    },
    cancelReceptionDayBeforeChanged: (state, action: PayloadAction<number>) => {
      state.cancelReceptionDayBefore = action.payload
    },
    cancelReceptionHourBeforeChanged: (state, action: PayloadAction<number>) => {
      state.cancelReceptionHourBefore = action.payload
    },
    lotteryConfirmedDayBeforeChanged: (state, action: PayloadAction<number>) => {
      state.lotteryConfirmedDayBefore = action.payload
    },
    reserveFrameReceptionTimesChanged: (state, action: PayloadAction<ReserveFrameReceptionTimeParam[]>) => {
      state.reserveFrameReceptionTimes = action.payload
    },
    outOfRangeFramesChanged: (state, action: PayloadAction<string[]>) => {
      state.outOfRangeFrames = action.payload
    },
    unreservableFramesChanged: (state, action: PayloadAction<string[]>) => {
      state.unreservableFrames = action.payload
    },
    resourceIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.resourceIds = action.payload
    },
    shopIdsChanged: (state, action: PayloadAction<number[]>) => {
      state.shopIds = action.payload
    },
    questionnaireMasterIdChanged: (state, action: PayloadAction<string>) => {
      state.questionnaireMasterId = action.payload
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
export const { publicIdChanged } = reserveFrameSlice.actions
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
export const { applyMultiLocalPaymentPriceChanged } = reserveFrameSlice.actions
export const { applyMultiCreditCardPaymentPriceChanged } = reserveFrameSlice.actions
export const { multiLocalPaymentPricesChanged } = reserveFrameSlice.actions
export const { multiCreditCardPaymentPricesChanged } = reserveFrameSlice.actions
export const { capacityChanged } = reserveFrameSlice.actions
export const { repeatEndDateChanged } = reserveFrameSlice.actions
export const { localPaymentPriceChanged } = reserveFrameSlice.actions
export const { creditCardPaymentPriceChanged } = reserveFrameSlice.actions
export const { publishStatusChanged } = reserveFrameSlice.actions
export const { receptionTypeChanged } = reserveFrameSlice.actions
export const { receptionPhoneNumberChanged } = reserveFrameSlice.actions
export const { receptionStartDayBeforeChanged } = reserveFrameSlice.actions
export const { receptionDeadlineChanged } = reserveFrameSlice.actions
export const { receptionDeadlineHourBeforeChanged } = reserveFrameSlice.actions
export const { receptionDeadlineDayBeforeChanged } = reserveFrameSlice.actions
export const { isLocalPaymentEnableChanged } = reserveFrameSlice.actions
export const { isCreditCardPaymentEnableChanged } = reserveFrameSlice.actions
export const { isTicketPaymentEnableChanged } = reserveFrameSlice.actions
export const { isMonthlyPlanPaymentEnableChanged } = reserveFrameSlice.actions
export const { reserveFrameImage1FileChanged } = reserveFrameSlice.actions
export const { reserveFrameImage2FileChanged } = reserveFrameSlice.actions
export const { reserveFrameImage3FileChanged } = reserveFrameSlice.actions
export const { reserveFrameImage4FileChanged } = reserveFrameSlice.actions
export const { reserveFrameImage5FileChanged } = reserveFrameSlice.actions
export const { reserveFrameImage1ImagePublicUrlChanged } = reserveFrameSlice.actions
export const { reserveFrameImage2ImagePublicUrlChanged } = reserveFrameSlice.actions
export const { reserveFrameImage3ImagePublicUrlChanged } = reserveFrameSlice.actions
export const { reserveFrameImage4ImagePublicUrlChanged } = reserveFrameSlice.actions
export const { reserveFrameImage5ImagePublicUrlChanged } = reserveFrameSlice.actions
export const { isAcceptCancelChanged } = reserveFrameSlice.actions
export const { isAcceptCancelOnTheDayChanged } = reserveFrameSlice.actions
export const { cancelReceptionDayBeforeChanged } = reserveFrameSlice.actions
export const { cancelReceptionHourBeforeChanged } = reserveFrameSlice.actions
export const { lotteryConfirmedDayBeforeChanged } = reserveFrameSlice.actions
export const { s3ObjectPublicUrlChanged } = reserveFrameSlice.actions
export const { reserveFrameReceptionTimesChanged } = reserveFrameSlice.actions
export const { outOfRangeFramesChanged } = reserveFrameSlice.actions
export const { unreservableFramesChanged } = reserveFrameSlice.actions
export const { resourceIdsChanged } = reserveFrameSlice.actions
export const { shopIdsChanged } = reserveFrameSlice.actions
export const { questionnaireMasterIdChanged } = reserveFrameSlice.actions
export const { reserveEventsChanged } = reserveFrameSlice.actions
export const { monthlyPaymentPlanIdsChanged } = reserveFrameSlice.actions
export const { reservableFrameTicketMasterChanged } = reserveFrameSlice.actions

export default reserveFrameSlice.reducer
