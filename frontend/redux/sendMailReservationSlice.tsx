import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sendMailReservationSlice = createSlice({
  name: 'sendMailReservation',
  initialState: {
    showSendMailReservationModal: false,
    scheduledDate: '',
    scheduledTime: '',
  },
  reducers: {
    showSendMailReservationModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showSendMailReservationModal = action.payload
    },
    scheduledDateChanged: (state, action: PayloadAction<string>) => {
      state.scheduledDate = action.payload
    },
    scheduledTimeChanged: (state, action: PayloadAction<string>) => {
      state.scheduledTime = action.payload
    },
  },
})

export const { showSendMailReservationModalChanged } = sendMailReservationSlice.actions
export const { scheduledDateChanged } = sendMailReservationSlice.actions
export const { scheduledTimeChanged } = sendMailReservationSlice.actions

export default sendMailReservationSlice.reducer
