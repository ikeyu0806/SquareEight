import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reserveFrameId: 0,
    reserveFramePublicId: '',
    reservationDate: '',
    startTime: '',
    endTime: '',
    numberOfPeople: 1,
    price: 0,
    showRegisterReservationModal: false,
    viewableKey: ''
  },
  reducers: {
    reserveFrameIdChanged: (state, action: PayloadAction<number>) => {
      state.reserveFrameId = action.payload
    },
    reserveFramePublicIdChanged: (state, action: PayloadAction<string>) => {
      state.reserveFramePublicId = action.payload
    },
    reservationDateChanged: (state, action: PayloadAction<string>) => {
      state.reservationDate = action.payload
    },
    startTimeChanged: (state, action: PayloadAction<string>) => {
      state.startTime = action.payload
    },
    endTimeChanged: (state, action: PayloadAction<string>) => {
      state.endTime = action.payload
    },
    numberOfPeopleChanged: (state, action: PayloadAction<number>) => {
      state.numberOfPeople = action.payload
    },
    priceChanged: (state, action: PayloadAction<number>) => {
      state.price = action.payload
    },
    showRegisterReservationModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showRegisterReservationModal = action.payload
    },
    viewableKeyChanged: (state, action: PayloadAction<string>) => {
      state.viewableKey = action.payload
    },
  },
})

export const { reserveFrameIdChanged } = reservationSlice.actions
export const { reserveFramePublicIdChanged } = reservationSlice.actions
export const { reservationDateChanged } = reservationSlice.actions
export const { startTimeChanged } = reservationSlice.actions
export const { endTimeChanged } = reservationSlice.actions
export const { numberOfPeopleChanged } = reservationSlice.actions
export const { priceChanged } = reservationSlice.actions
export const { showRegisterReservationModalChanged } = reservationSlice.actions
export const { viewableKeyChanged } = reservationSlice.actions

export default reservationSlice.reducer
