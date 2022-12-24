import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LineUserParam } from 'interfaces/LineUserParam'
import { LineOfficialAccountParam } from 'interfaces/LineOfficialAccountParam'

export const sendLineScheduleSlice = createSlice({
  name: 'sendLineSchedule',
  initialState: {
    scheduledDate: '',
    scheduledTime: '13:00',
    showSendLineScheduleModal: false,
    sendTargetType: 'lineUser',
    selectedLineOfficialAccountPublicId: '',
    selectedLineUser: {} as LineUserParam,
    selectedLineOfficialAccount: {} as LineOfficialAccountParam
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
    sendTargetTypeChanged: (state, action: PayloadAction<string>) => {
      state.sendTargetType = action.payload
    },
    selectedLineOfficialAccountPublicIdChanged: (state, action: PayloadAction<string>) => {
      state.selectedLineOfficialAccountPublicId = action.payload
    },
    selectedLineUserChanged: (state, action: PayloadAction<LineUserParam>) => {
      state.selectedLineUser = action.payload
    },
    selectedLineOfficialAccountChanged: (state, action: PayloadAction<LineOfficialAccountParam>) => {
      state.selectedLineOfficialAccount = action.payload
    },
  },
})

export const { scheduledDateChanged } = sendLineScheduleSlice.actions
export const { scheduledTimeChanged } = sendLineScheduleSlice.actions
export const { showSendLineScheduleModalChanged } = sendLineScheduleSlice.actions
export const { sendTargetTypeChanged } = sendLineScheduleSlice.actions
export const { selectedLineOfficialAccountPublicIdChanged } = sendLineScheduleSlice.actions
export const { selectedLineUserChanged } = sendLineScheduleSlice.actions
export const { selectedLineOfficialAccountChanged } = sendLineScheduleSlice.actions

export default sendLineScheduleSlice.reducer
