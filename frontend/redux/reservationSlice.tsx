import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reserveFrameId: 0,
    reserveFrames: [] as ReserveFrameParam[],
    startAt: '',
    endAt: '',
    numberOfPeople: 1,
    title: '',
    representativeFirstName: '',
    representativeLastName: ''
  },
  reducers: {
    reserveFrameIdChanged: (state, action: PayloadAction<number>) => {
      state.reserveFrameId = action.payload
    },
    reserveFramesChanged: (state, action: PayloadAction<ReserveFrameParam[]>) => {
      state.reserveFrames = action.payload
    },
    startAtChanged: (state, action: PayloadAction<string>) => {
      state.startAt = action.payload
    },
    endAtChanged: (state, action: PayloadAction<string>) => {
      state.endAt = action.payload
    },
    numberOfPeopleChanged: (state, action: PayloadAction<number>) => {
      state.numberOfPeople = action.payload
    },
    titleChanged: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    representativeFirstNameChanged: (state, action: PayloadAction<string>) => {
      state.representativeFirstName = action.payload
    },
    representativeLastNameChanged: (state, action: PayloadAction<string>) => {
      state.representativeLastName = action.payload
    },
  },
})

export const { reserveFrameIdChanged } = reservationSlice.actions
export const { reserveFramesChanged } = reservationSlice.actions
export const { startAtChanged } = reservationSlice.actions
export const { endAtChanged } = reservationSlice.actions
export const { numberOfPeopleChanged } = reservationSlice.actions
export const { titleChanged } = reservationSlice.actions
export const { representativeFirstNameChanged } = reservationSlice.actions
export const { representativeLastNameChanged } = reservationSlice.actions

export default reservationSlice.reducer
