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
    representativeLastNameKanji: '',
    representativeFirstNameKanji: '',
    representativeLastNameKana: '',
    representativeFirstNameKana: '',
    representativeGender: 'male',
    representativeEmail: '',
    representativeBirthDay: '2000-01-01',
    representativePhoneNumber: '',
    representativeAddressPostalCode: '',
    representativeAddressStateKanji: '',
    representativeAddressCityKanji: '',
    representativeAddressTownKanji: '',
    representativeAddressLine1Kanji: '',
    representativeAddressLine2Kanji: '',
    representativeAddressStateKana: '',
    representativeAddressCityKana: '',
    representativeAddressTownKana: '',
    representativeAddressLine1Kana: '',
    representativeAddressLine2Kana: '',
    representativeVerificationStatus: '',
    isDirectorRegisterComplete: false,
    isDirector: false, // Whether the person is a director of the account’s legal entity. Directors are typically members of the governing board of the company, or responsible for ensuring the company meets its regulatory obligations.
    isExecutive: false, // Whether the person has significant responsibility to control, manage, or direct the organization.
    isOwner: false, // Whether the person is an owner of the account’s legal entity.
    isRepresentative: false, // The percent owned by the person of the account’s legal entity.
    percentOwnership: 100,
    relationshipTitle: '', // CEOなど,
    verificationDocumentImage: '',
    verificationDocumentFront: '',
    verificationDocumentImageFile:  null as File | unknown,
    representativeIdentificationImage: null as File | unknown,
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
    representativeAddressPostalCodeChanged: (state, action: PayloadAction<string>) => {
      state.representativeAddressPostalCode = action.payload
    },
    representativeAddressStateKanjiChanged: (state, action: PayloadAction<string>) => {
      state.representativeAddressStateKanji = action.payload
    },
    representativeAddressCityKanjiChanged: (state, action: PayloadAction<string>) => {
      state.representativeAddressCityKanji = action.payload
    },
    representativeAddressTownKanjiChanged: (state, action: PayloadAction<string>) => {
      state.representativeAddressTownKanji = action.payload
    },
    representativeAddressLine1KanjiChanged: (state, action: PayloadAction<string>) => {
      state.representativeAddressLine1Kanji = action.payload
    },
    representativeAddressLine2KanjiChanged: (state, action: PayloadAction<string>) => {
      state.representativeAddressLine2Kanji = action.payload
    },
    representativeAddressStateKanaChanged: (state, action: PayloadAction<string>) => {
      state.representativeAddressStateKana = action.payload
    },
    representativeAddressCityKanaChanged: (state, action: PayloadAction<string>) => {
      state.representativeAddressCityKana = action.payload
    },
    representativeAddressTownKanaChanged: (state, action: PayloadAction<string>) => {
      state.representativeAddressTownKana = action.payload
    },
    representativeAddressLine1KanaChanged: (state, action: PayloadAction<string>) => {
      state.representativeAddressLine1Kana = action.payload
    },
    representativeAddressLine2KanaChanged: (state, action: PayloadAction<string>) => {
      state.representativeAddressLine2Kana = action.payload
    },
    representativeVerificationStatusChanged: (state, action: PayloadAction<string>) => {
      state.representativeVerificationStatus = action.payload
    },
    isDirectorRegisterCompleteChanged: (state, action: PayloadAction<boolean>) => {
      state.isDirectorRegisterComplete = action.payload
    },
    isDirectorChanged: (state, action: PayloadAction<boolean>) => {
      state.isDirector = action.payload
    },
    isExecutiveChanged: (state, action: PayloadAction<boolean>) => {
      state.isExecutive = action.payload
    },
    isOwnerChanged: (state, action: PayloadAction<boolean>) => {
      state.isOwner = action.payload
    },
    isRepresentativeChanged: (state, action: PayloadAction<boolean>) => {
      state.isRepresentative = action.payload
    },
    percentOwnershipChanged: (state, action: PayloadAction<number>) => {
      state.percentOwnership = action.payload
    },
    relationshipTitleChanged: (state, action: PayloadAction<string>) => {
      state.relationshipTitle = action.payload
    },
    verificationDocumentImageChanged: (state, action: PayloadAction<any>) => {
      state.verificationDocumentImage = action.payload
    },
    verificationDocumentFrontChanged: (state, action: PayloadAction<string>) => {
      state.verificationDocumentFront = action.payload
    },
    verificationDocumentImageFileChanged: (state, action: PayloadAction<File>) => {
      state.verificationDocumentImageFile = action.payload
    },
    representativeIdentificationImageChanged: (state, action: PayloadAction<File>) => {
      state.representativeIdentificationImage = action.payload
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
export const { representativeBirthDayChanged } = stripeCompanyAccountSlice.actions
export const { representativePhoneNumberChanged } = stripeCompanyAccountSlice.actions
export const { representativeAddressPostalCodeChanged } = stripeCompanyAccountSlice.actions
export const { representativeAddressStateKanjiChanged } = stripeCompanyAccountSlice.actions
export const { representativeAddressCityKanjiChanged } = stripeCompanyAccountSlice.actions
export const { representativeAddressTownKanjiChanged } = stripeCompanyAccountSlice.actions
export const { representativeAddressLine1KanjiChanged } = stripeCompanyAccountSlice.actions
export const { representativeAddressLine2KanjiChanged } = stripeCompanyAccountSlice.actions
export const { representativeAddressStateKanaChanged } = stripeCompanyAccountSlice.actions
export const { representativeAddressCityKanaChanged } = stripeCompanyAccountSlice.actions
export const { representativeAddressTownKanaChanged } = stripeCompanyAccountSlice.actions
export const { representativeAddressLine1KanaChanged } = stripeCompanyAccountSlice.actions
export const { representativeAddressLine2KanaChanged } = stripeCompanyAccountSlice.actions
export const { representativeVerificationStatusChanged } = stripeCompanyAccountSlice.actions
export const { isDirectorRegisterCompleteChanged } = stripeCompanyAccountSlice.actions
export const { isDirectorChanged } = stripeCompanyAccountSlice.actions
export const { isExecutiveChanged } = stripeCompanyAccountSlice.actions
export const { isOwnerChanged } = stripeCompanyAccountSlice.actions
export const { isRepresentativeChanged } = stripeCompanyAccountSlice.actions
export const { percentOwnershipChanged } = stripeCompanyAccountSlice.actions
export const { relationshipTitleChanged } = stripeCompanyAccountSlice.actions
export const { verificationDocumentImageChanged } = stripeCompanyAccountSlice.actions
export const { verificationDocumentFrontChanged } = stripeCompanyAccountSlice.actions
export const { verificationDocumentImageFileChanged } = stripeCompanyAccountSlice.actions
export const { representativeIdentificationImageChanged } = stripeCompanyAccountSlice.actions

export default stripeCompanyAccountSlice.reducer
