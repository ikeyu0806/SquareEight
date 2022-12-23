import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sendLineScheduleSlice = createSlice({
  name: 'sendLineSchedule',
  initialState: {
    scheduledDate: '',
    scheduledTime: '13:00',
    showSendLineScheduleModal: false
  },
  reducers: {
    scheduledDateChanged: (state, action: PayloadAction<string>) => {
      state.scheduledDate = action.payload
    },
    scheduledTimeChanged: (state, action: PayloadAction<string>) => {
      state.scheduledTime = action.payload
    },
    showSendLineScheduleModalChanged: (state, action: PayloadAction<boolean>) => {
      state.showSendLineScheduleModal = action.payload
    },
  },
})

export const { scheduledDateChanged } = sendLineScheduleSlice.actions
export const { scheduledTimeChanged } = sendLineScheduleSlice.actions
export const { showSendLineScheduleModalChanged } = sendLineScheduleSlice.actions

export default sendLineScheduleSlice.reducer
