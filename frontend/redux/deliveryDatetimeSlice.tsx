import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AdditionalDeliveryDays } from 'interfaces/AdditionalDeliveryDays'
import { DeliveryTimes } from 'interfaces/DeliveryTimes'
import { initAdditionalDeliveryDays } from 'constants/initAdditionalDeliveryDays'
import { ProductParam } from 'interfaces/ProductParam'

export const deliveryDatetimeSlice = createSlice({
  name: 'deliveryDatetime',
  initialState: {
    shortestDeliveryDay: 1,
    longestDeliveryDay: 1,
    deadlineTime: '00:00',
    isSetPerAreaDeliveryDate: false,
    isHolidaySun: false,
    isHolidayMon: false,
    isHolidayTue: false,
    isHolidayWed: false,
    isHolidayThu: false,
    isHolidayFri: false,
    isHolidaySat: false,
    temporaryHolidays: [] as string[],
    deliveryTimeType: '',
    showSetTargetProductModal: false,
    additionalDeliveryDays: initAdditionalDeliveryDays as AdditionalDeliveryDays[],
    deliveryTimes: [] as DeliveryTimes[],
    products: [] as ProductParam[]
  },
  reducers: {
    shortestDeliveryDayChanged: (state, action: PayloadAction<number>) => {
      state.shortestDeliveryDay = action.payload
    },
    longestDeliveryDayChanged: (state, action: PayloadAction<number>) => {
      state.longestDeliveryDay = action.payload
    },
    deadlineTimeChanged: (state, action: PayloadAction<string>) => {
      state.deadlineTime = action.payload
    },
    isSetPerAreaDeliveryDateChanged: (state, action: PayloadAction<boolean>) => {
      state.isSetPerAreaDeliveryDate = action.payload
    },
    isHolidaySunChanged: (state, action: PayloadAction<boolean>) => {
      state.isHolidaySun = action.payload
    },
    isHolidayMonChanged: (state, action: PayloadAction<boolean>) => {
      state.isHolidayMon = action.payload
    },
    isHolidayTueChanged: (state, action: PayloadAction<boolean>) => {
      state.isHolidayTue = action.payload
    },
    isHolidayWedChanged: (state, action: PayloadAction<boolean>) => {
      state.isHolidayWed = action.payload
    },
    isHolidayThuChanged: (state, action: PayloadAction<boolean>) => {
      state.isHolidayThu = action.payload
    },
    isHolidayFriChanged: (state, action: PayloadAction<boolean>) => {
      state.isHolidayFri = action.payload
    },
    isHolidaySatChanged: (state, action: PayloadAction<boolean>) => {
      state.isHolidaySat = action.payload
    },
    temporaryHolidaysChanged: (state, action: PayloadAction<string[]>) => {
      state.temporaryHolidays = action.payload
    },
    deliveryTimeTypeChanged: (state, action: PayloadAction<string>) => {
      state.deliveryTimeType = action.payload
    },
    showSetTargetProductModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showSetTargetProductModal = action.payload
    },
    additionalDeliveryDaysChanged: (state, action: PayloadAction<AdditionalDeliveryDays[]>) => {
      state.additionalDeliveryDays = action.payload
    },
    deliveryTimesChanged: (state, action: PayloadAction<DeliveryTimes[]>) => {
      state.deliveryTimes = action.payload
    },
    productsChanged: (state, action: PayloadAction<ProductParam[]>) => {
      state.products = action.payload
    },
  },
})

export const { shortestDeliveryDayChanged } = deliveryDatetimeSlice.actions
export const { longestDeliveryDayChanged } = deliveryDatetimeSlice.actions
export const { deadlineTimeChanged } = deliveryDatetimeSlice.actions
export const { isSetPerAreaDeliveryDateChanged } = deliveryDatetimeSlice.actions
export const { isHolidaySunChanged } = deliveryDatetimeSlice.actions
export const { isHolidayMonChanged } = deliveryDatetimeSlice.actions
export const { isHolidayTueChanged } = deliveryDatetimeSlice.actions
export const { isHolidayWedChanged } = deliveryDatetimeSlice.actions
export const { isHolidayThuChanged } = deliveryDatetimeSlice.actions
export const { isHolidayFriChanged } = deliveryDatetimeSlice.actions
export const { isHolidaySatChanged } = deliveryDatetimeSlice.actions
export const { temporaryHolidaysChanged } = deliveryDatetimeSlice.actions
export const { deliveryTimeTypeChanged } = deliveryDatetimeSlice.actions
export const { showSetTargetProductModalChanged } = deliveryDatetimeSlice.actions
export const { additionalDeliveryDaysChanged } = deliveryDatetimeSlice.actions
export const { deliveryTimesChanged } = deliveryDatetimeSlice.actions
export const { productsChanged } = deliveryDatetimeSlice.actions

export default deliveryDatetimeSlice.reducer
