import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reserveFrameId: 0,
    reservationDate: '',
    startTime: '',
    endTime: '',
    numberOfPeople: 1,
    representativeFirstName: '',
    representativeLastName: '',
    showRegisterReservationModal: false
  },
  reducers: {
    reserveFrameIdChanged: (state, action: PayloadAction<number>) => {
      state.reserveFrameId = action.payload
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
    representativeFirstNameChanged: (state, action: PayloadAction<string>) => {
      state.representativeFirstName = action.payload
    },
    representativeLastNameChanged: (state, action: PayloadAction<string>) => {
      state.representativeLastName = action.payload
    },
    showRegisterReservationModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showRegisterReservationModal = action.payload
    },
  },
})

export const { reserveFrameIdChanged } = reservationSlice.actions
export const { reservationDateChanged } = reservationSlice.actions
export const { startTimeChanged } = reservationSlice.actions
export const { endTimeChanged } = reservationSlice.actions
export const { numberOfPeopleChanged } = reservationSlice.actions
export const { representativeFirstNameChanged } = reservationSlice.actions
export const { representativeLastNameChanged } = reservationSlice.actions
export const { showRegisterReservationModalChanged } = reservationSlice.actions

export default reservationSlice.reducer
