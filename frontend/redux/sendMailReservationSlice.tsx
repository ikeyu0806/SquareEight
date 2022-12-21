import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sendMailReservationSlice = createSlice({
  name: 'sendMailReservation',
  initialState: {
    showSendMailReservationModal: false,
  },
  reducers: {
    showSendMailReservationModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showSendMailReservationModal = action.payload
    },
  },
})

export const { showSendMailReservationModalChanged } = sendMailReservationSlice.actions

export default sendMailReservationSlice.reducer
