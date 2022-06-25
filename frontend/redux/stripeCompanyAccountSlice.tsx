import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const stripeCompanyAccountSlice = createSlice({
  name: 'stripeCompanyAccount',
  initialState: {
    companyBusinessName: '',
    companyBusinessNameKana: '',
    companyBusinessNameKanji: '',
    companyBusinessTaxId: '',
    companyPortalCode: '',
    companyState: '',
    companyCity: '',
    companyTown: '',
    companyLine1: '',
    companyLine2: '',
    companyManagerFirstNameKanji: '',
    companyManagerLastNameKanji: '',
    companyManagerFirstNameKana: '',
    companyManagerLastNameKana: '',
    companyManagerSex: '',
    companyManagerPortalCodeKanji: '',
    companyManagerStateKanji: '',
    companyManagerCityKanji: '',
    companyManagerTownKanji: '',
    companyManagerLine1Kanji: '',
    companyManagerLine2Kanji: '',
    companyManagerPortalCodeKana: '',
    companyManagerStateKana: '',
    companyManagerCityKana: '',
    companyManagerTownKana: '',
    companyManagerLine1Kana: '',
    companyManagerLine2Kana: '',
    companyManagerDobYear: '',
    companyManagerDobMonth: '',
    companyManagerDobDay: '',
    companyManagerPhoneNumber: '',
  },
  reducers: {
    companyBusinessNameChanged: (state, action: PayloadAction<string>) => {
      state.companyBusinessName = action.payload
    },
    companyBusinessNameKanaChanged: (state, action: PayloadAction<string>) => {
      state.companyBusinessNameKana = action.payload
    },
    companyBusinessNameKanjiChanged: (state, action: PayloadAction<string>) => {
      state.companyBusinessNameKanji = action.payload
    },
    companyBusinessTaxIdChanged: (state, action: PayloadAction<string>) => {
      state.companyBusinessTaxId = action.payload
    },
    companyPortalCodeChanged: (state, action: PayloadAction<string>) => {
      state.companyPortalCode = action.payload
    },
    companyStateChanged: (state, action: PayloadAction<string>) => {
      state.companyState = action.payload
    },
    companyCityChanged: (state, action: PayloadAction<string>) => {
      state.companyCity = action.payload
    },
    companyTownChanged: (state, action: PayloadAction<string>) => {
      state.companyTown = action.payload
    },
    companyLine1Changed: (state, action: PayloadAction<string>) => {
      state.companyLine1 = action.payload
    },
    companyLine2Changed: (state, action: PayloadAction<string>) => {
      state.companyLine2 = action.payload
    },
    companyManagerFirstNameKanjiChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerFirstNameKanji = action.payload
    },
    companyManagerLastNameKanjiChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerLastNameKanji = action.payload
    },
    companyManagerFirstNameKanaChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerFirstNameKana = action.payload
    },
    companyManagerLastNameKanaChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerLastNameKana = action.payload
    },
    companyManagerSexChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerSex = action.payload
    },
    companyManagerPortalCodeKanjiChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerPortalCodeKanji = action.payload
    },
    companyManagerStateKanjiChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerStateKanji = action.payload
    },
    companyManagerCityKanjiChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerCityKanji = action.payload
    },
    companyManagerTownKanjiChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerTownKanji = action.payload
    },
    companyManagerLine1KanjiChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerLine1Kanji = action.payload
    },
    companyManagerLine2KanjiChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerLine2Kanji = action.payload
    },
    companyManagerPortalCodeKanaChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerPortalCodeKana = action.payload
    },
    companyManagerStateKanaChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerStateKana = action.payload
    },
    companyManagerCityKanaChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerCityKana = action.payload
    },
    companyManagerTownKanaChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerTownKana = action.payload
    },
    companyManagerLine1KanaChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerLine1Kana = action.payload
    },
    companyManagerLine2KanaChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerLine2Kana = action.payload
    },
    companyManagerDobYearChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerDobYear = action.payload
    },
    companyManagerDobMonthChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerDobMonth = action.payload
    },
    companyManagerDobDayChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerDobDay = action.payload
    },
    companyManagerPhoneNumberChanged: (state, action: PayloadAction<string>) => {
      state.companyManagerPhoneNumber = action.payload
    },

  },
})

export const { companyBusinessNameChanged } = stripeCompanyAccountSlice.actions
export const { companyBusinessNameKanaChanged } = stripeCompanyAccountSlice.actions
export const { companyBusinessNameKanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyBusinessTaxIdChanged } = stripeCompanyAccountSlice.actions
export const { companyPortalCodeChanged } = stripeCompanyAccountSlice.actions
export const { companyStateChanged } = stripeCompanyAccountSlice.actions
export const { companyCityChanged } = stripeCompanyAccountSlice.actions
export const { companyTownChanged } = stripeCompanyAccountSlice.actions
export const { companyLine1Changed } = stripeCompanyAccountSlice.actions
export const { companyLine2Changed } = stripeCompanyAccountSlice.actions
export const { companyManagerFirstNameKanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerLastNameKanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerFirstNameKanaChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerLastNameKanaChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerPortalCodeKanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerStateKanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerCityKanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerTownKanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerLine1KanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerLine2KanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerPortalCodeKanaChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerStateKanaChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerCityKanaChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerTownKanaChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerLine1KanaChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerLine2KanaChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerDobYearChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerDobMonthChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerDobDayChanged } = stripeCompanyAccountSlice.actions
export const { companyManagerPhoneNumberChanged } = stripeCompanyAccountSlice.actions

export default stripeCompanyAccountSlice.reducer
