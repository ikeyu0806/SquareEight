import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const stripeCompanyAccountSlice = createSlice({
  name: 'stripeCompanyAccount',
  initialState: {
    companyBusinessName: '',
    companyBusinessNameKana: '',
    companyBusinessNameKanji: '',
    companyBusinessTaxId: '',
    businessTaxId: '',
    companyPortalCode: '',
    companyStateKanji: '',
    companyCityKanji: '',
    companyTownKanji: '',
    companyLine1Kanji: '',
    companyLine2Kanji: '',
    companyStateKana: '',
    companyCityKana: '',
    companyTownKana: '',
    companyLine1Kana: '',
    companyLine2Kana: '',
    companyPhoneNumber: '',
    companyBusinessUrl: '',
    companyDescription: '',
    identificationImage: '',
    representativeLastNameKanji: '',
    representativeFirstNameKanji: '',
    representativeLastNameKana: '',
    representativeFirstNameKana: '',
    representativeGender: 'male',
    representativeEmail: '',
    representativeBirthDay: '',
    representativePhoneNumber: ''
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
    companyStateKanjiChanged: (state, action: PayloadAction<string>) => {
      state.companyStateKanji = action.payload
    },
    companyCityKanjiChanged: (state, action: PayloadAction<string>) => {
      state.companyCityKanji = action.payload
    },
    companyTownKanjiChanged: (state, action: PayloadAction<string>) => {
      state.companyTownKanji = action.payload
    },
    companyLine1KanjiChanged: (state, action: PayloadAction<string>) => {
      state.companyLine1Kanji = action.payload
    },
    companyLine2KanjiChanged: (state, action: PayloadAction<string>) => {
      state.companyLine2Kanji = action.payload
    },
    companyStateKanaChanged: (state, action: PayloadAction<string>) => {
      state.companyStateKana = action.payload
    },
    companyCityKanaChanged: (state, action: PayloadAction<string>) => {
      state.companyCityKana = action.payload
    },
    companyTownKanaChanged: (state, action: PayloadAction<string>) => {
      state.companyTownKana = action.payload
    },
    companyLine1KanaChanged: (state, action: PayloadAction<string>) => {
      state.companyLine1Kana = action.payload
    },
    companyLine2KanaChanged: (state, action: PayloadAction<string>) => {
      state.companyLine2Kana = action.payload
    },
    companyPhoneNumberChanged: (state, action: PayloadAction<string>) => {
      state.companyPhoneNumber = action.payload
    },
    companyBusinessUrlChanged: (state, action: PayloadAction<string>) => {
      state.companyBusinessUrl = action.payload
    },
    companyDescriptionChanged: (state, action: PayloadAction<string>) => {
      state.companyDescription = action.payload
    },
    identificationImageChanged: (state, action: PayloadAction<any>) => {
      state.identificationImage = action.payload
    },
    representativeLastNameKanjiChanged: (state, action: PayloadAction<any>) => {
      state.representativeLastNameKanji = action.payload
    },
    representativeFirstNameKanjiChanged: (state, action: PayloadAction<string>) => {
      state.representativeFirstNameKanji = action.payload
    },
    representativeLastNameKanaChanged: (state, action: PayloadAction<any>) => {
      state.representativeLastNameKana = action.payload
    },
    representativeFirstNameKanaChanged: (state, action: PayloadAction<string>) => {
      state.representativeFirstNameKana = action.payload
    },
    representativeGenderChanged: (state, action: PayloadAction<string>) => {
      state.representativeGender = action.payload
    },
    representativeEmailChanged: (state, action: PayloadAction<string>) => {
      state.representativeEmail = action.payload
    },
    representativeBirthDayChanged: (state, action: PayloadAction<string>) => {
      state.representativeBirthDay = action.payload
    },
    representativePhoneNumberChanged: (state, action: PayloadAction<string>) => {
      state.representativePhoneNumber = action.payload
    },
  },
})

export const { companyBusinessNameChanged } = stripeCompanyAccountSlice.actions
export const { companyBusinessNameKanaChanged } = stripeCompanyAccountSlice.actions
export const { companyBusinessNameKanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyBusinessTaxIdChanged } = stripeCompanyAccountSlice.actions
export const { companyPortalCodeChanged } = stripeCompanyAccountSlice.actions
export const { companyStateKanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyCityKanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyTownKanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyLine1KanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyLine2KanjiChanged } = stripeCompanyAccountSlice.actions
export const { companyStateKanaChanged } = stripeCompanyAccountSlice.actions
export const { companyCityKanaChanged } = stripeCompanyAccountSlice.actions
export const { companyTownKanaChanged } = stripeCompanyAccountSlice.actions
export const { companyLine1KanaChanged } = stripeCompanyAccountSlice.actions
export const { companyLine2KanaChanged } = stripeCompanyAccountSlice.actions
export const { companyPhoneNumberChanged } = stripeCompanyAccountSlice.actions
export const { companyBusinessUrlChanged } = stripeCompanyAccountSlice.actions
export const { companyDescriptionChanged } = stripeCompanyAccountSlice.actions
export const { representativeLastNameKanjiChanged } = stripeCompanyAccountSlice.actions
export const { representativeFirstNameKanjiChanged } = stripeCompanyAccountSlice.actions
export const { representativeLastNameKanaChanged } = stripeCompanyAccountSlice.actions
export const { representativeFirstNameKanaChanged } = stripeCompanyAccountSlice.actions
export const { representativeGenderChanged } = stripeCompanyAccountSlice.actions
export const { representativeEmailChanged } = stripeCompanyAccountSlice.actions
export const { identificationImageChanged } = stripeCompanyAccountSlice.actions
export const { representativeBirthDayChanged } = stripeCompanyAccountSlice.actions
export const { representativePhoneNumberChanged } = stripeCompanyAccountSlice.actions

export default stripeCompanyAccountSlice.reducer
