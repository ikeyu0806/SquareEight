import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const stripeIndividualAccountSlice = createSlice({
  name: 'stripeIndividualAccount',
  initialState: {
    individualFirstNameKanji: '',
    individualLastNameKanji: '',
    individualFirstNameKana: '',
    individualLastNameKana: '',
    individualPortalCodeKanji: '',
    individualStateKanji: '',
    individualCityKanji: '',
    individualTownKanji: '',
    individualLine1Kanji: '',
    individualLine2Kanji: '',
    individualPorttalCodeKana: '',
    individualStateKana: '',
    individualCityKana: '',
    individualTownKana: '',
    individualLine1Kana: '',
    individualLine2Kana: '',
    individualPhoneNumber: '',
  },
  reducers: {
    individualFirstNameKanjiChanged: (state, action: PayloadAction<string>) => {
      state.individualFirstNameKanji = action.payload
    },
    individualLastNameKanjiChanged: (state, action: PayloadAction<string>) => {
      state.individualLastNameKanji = action.payload
    },
    individualFirstNameKanaChanged: (state, action: PayloadAction<string>) => {
      state.individualFirstNameKana = action.payload
    },
    individualLastNameKanaChanged: (state, action: PayloadAction<string>) => {
      state.individualLastNameKana = action.payload
    },
    individualPortalCodeKanjiChanged: (state, action: PayloadAction<string>) => {
      state.individualPortalCodeKanji = action.payload
    },
    individualStateKanjiChanged: (state, action: PayloadAction<string>) => {
      state.individualStateKanji = action.payload
    },
    individualCityKanjiChanged: (state, action: PayloadAction<string>) => {
      state.individualCityKanji = action.payload
    },
    individualTownKanjiChanged: (state, action: PayloadAction<string>) => {
      state.individualTownKanji = action.payload
    },
    individualLine1KanjiChanged: (state, action: PayloadAction<string>) => {
      state.individualLine1Kanji = action.payload
    },
    individualLine2KanjiChanged: (state, action: PayloadAction<string>) => {
      state.individualLine2Kanji = action.payload
    },
    individualPorttalCodeKanaChanged: (state, action: PayloadAction<string>) => {
      state.individualPorttalCodeKana = action.payload
    },
    individualStateKanaChanged: (state, action: PayloadAction<string>) => {
      state.individualStateKana = action.payload
    },
    individualCityKanaChanged: (state, action: PayloadAction<string>) => {
      state.individualCityKana = action.payload
    },
    individualTownKanaChanged: (state, action: PayloadAction<string>) => {
      state.individualTownKana = action.payload
    },
    individualLine1KanaChanged: (state, action: PayloadAction<string>) => {
      state.individualLine1Kana = action.payload
    },
    individualLine2KanaChanged: (state, action: PayloadAction<string>) => {
      state.individualLine2Kana = action.payload
    },
    individualPhoneNumberChanged: (state, action: PayloadAction<string>) => {
      state.individualPhoneNumber = action.payload
    },
  },
})

export const { individualFirstNameKanjiChanged } = stripeIndividualAccountSlice.actions
export const { individualLastNameKanjiChanged } = stripeIndividualAccountSlice.actions
export const { individualFirstNameKanaChanged } = stripeIndividualAccountSlice.actions
export const { individualPortalCodeKanjiChanged } = stripeIndividualAccountSlice.actions
export const { individualStateKanjiChanged } = stripeIndividualAccountSlice.actions
export const { individualCityKanjiChanged } = stripeIndividualAccountSlice.actions
export const { individualTownKanjiChanged } = stripeIndividualAccountSlice.actions
export const { individualLine1KanjiChanged } = stripeIndividualAccountSlice.actions
export const { individualLine2KanjiChanged } = stripeIndividualAccountSlice.actions
export const { individualPorttalCodeKanaChanged } = stripeIndividualAccountSlice.actions
export const { individualStateKanaChanged } = stripeIndividualAccountSlice.actions
export const { individualCityKanaChanged } = stripeIndividualAccountSlice.actions
export const { individualTownKanaChanged } = stripeIndividualAccountSlice.actions
export const { individualLine1KanaChanged } = stripeIndividualAccountSlice.actions
export const { individualLine2KanaChanged } = stripeIndividualAccountSlice.actions
export const { individualPhoneNumberChanged } = stripeIndividualAccountSlice.actions

export default stripeIndividualAccountSlice.reducer
