import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sendMailReservationSlice = createSlice({
  name: 'sendMailReservation',
  initialState: {
    scheduledDate: '',
    scheduledTime: '13:00',
    showSendMailScheduleModal: false
  },
  reducers: {
    scheduledDateChanged: (state, action: PayloadAction<string>) => {
      state.scheduledDate = action.payload
    },
    scheduledTimeChanged: (state, action: PayloadAction<string>) => {
      state.scheduledTime = action.payload
    },
    showSendMailScheduleModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showSendMailScheduleModal = action.payload
    },
  },
})

export const { scheduledDateChanged } = sendMailReservationSlice.actions
export const { scheduledTimeChanged } = sendMailReservationSlice.actions
export const { showSendMailScheduleModalChanged } = sendMailReservationSlice.actions

export default sendMailReservationSlice.reducer
