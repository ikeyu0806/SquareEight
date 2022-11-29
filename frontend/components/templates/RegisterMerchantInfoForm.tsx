import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import StripeIndividualAccountForm from 'components/organisms/StripeIndividualAccountForm'
import StripeCompanyAccountForm from 'components/organisms/StripeCompanyAccountForm'
import { Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { RootState } from 'redux/store'
import StripeTerm from 'components/organisms/StripeTerm'
import { getZeroPaddingString } from 'functions/getZeroPaddingString'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import {  individualFirstNameKanjiChanged,
          individualLastNameKanjiChanged,
          individualFirstNameKanaChanged,
          individualLastNameKanaChanged,
          individualBirthDayChanged,
          individualPostalCodeKanjiChanged,
          individualStateKanjiChanged,
          individualCityKanjiChanged,
          individualTownKanjiChanged,
          individualLine1KanjiChanged,
          individualLine2KanjiChanged,
          individualStateKanaChanged,
          individualCityKanaChanged,
          individualTownKanaChanged,
          individualLine1KanaChanged,
          individualLine2KanaChanged,
          individualPhoneNumberChanged,
          individualEmailChanged,
          individualBusinessUrlChanged,
          individualProductDescriptionChanged,
          individualGenderChanged,
          identificationImageChanged,
          individualDocumentFrontChanged,
          individualAdditionalDocumentFrontChanged } from 'redux/stripeIndividualAccountSlice'
import {  companyBusinessNameChanged,
          companyBusinessNameKanaChanged,
          companyBusinessTaxIdChanged,
          companyDescriptionChanged,
          companyPortalCodeChanged,
          companyStateKanjiChanged,
          companyCityKanjiChanged,
          companyTownKanjiChanged,
          companyLine1KanjiChanged,
          companyLine2KanjiChanged,
          companyStateKanaChanged,
          companyCityKanaChanged,
          companyTownKanaChanged,
          companyLine1KanaChanged,
          companyLine2KanaChanged,
          companyPhoneNumberChanged,
          companyBusinessUrlChanged,
          representativeLastNameKanjiChanged,
          representativeFirstNameKanjiChanged,
          representativeLastNameKanaChanged,
          representativeFirstNameKanaChanged,
          representativeGenderChanged,
          representativeBirthDayChanged,
          representativeEmailChanged,
          representativePhoneNumberChanged,
          representativeAddressPostalCodeChanged,
          representativeAddressStateKanjiChanged,
          representativeAddressCityKanjiChanged,
          representativeAddressTownKanjiChanged,
          representativeAddressLine1KanjiChanged,
          representativeAddressLine2KanjiChanged,
          representativeAddressStateKanaChanged,
          representativeAddressCityKanaChanged,
          representativeAddressTownKanaChanged,
          representativeAddressLine1KanaChanged,
          representativeAddressLine2KanaChanged,
          isDirectorRegisterCompleteChanged,
          isDirectorChanged,
          isExecutiveChanged,
          isOwnerChanged,
          percentOwnershipChanged,
          relationshipTitleChanged,
          verificationDocumentImageChanged,
          verificationDocumentFrontChanged,
          representativeVerificationStatusChanged } from 'redux/stripeCompanyAccountSlice'

const RegisterMerchantInfoForm = () => {
  const [businessType, setBusinessType] = useState('individual')
  const [isLoading, setIsLoading] = useState(false)
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const router = useRouter()

  // 個人事業情報
  const businessProfileName = useSelector((state: RootState) => state.stripeExternalAccount.businessProfileName)
  const individualFirstNameKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualFirstNameKanji)
  const individualLastNameKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualLastNameKanji)
  const individualFirstNameKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualFirstNameKana)
  const individualLastNameKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualLastNameKana)
  const individualPostalCodeKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualPostalCodeKanji)
  const individualStateKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualStateKanji)
  const individualCityKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualCityKanji)
  const individualTownKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualTownKanji)
  const individualLine1Kanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualLine1Kanji)
  const individualLine2Kanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualLine2Kanji)
  const individualPosttalCodeKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualPostalCodeKana)
  const individualStateKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualStateKana)
  const individualTownKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualTownKana)
  const individualCityKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualCityKana)
  const individualLine1Kana = useSelector((state: RootState) => state.stripeIndividualAccount.individualLine1Kana)
  const individualLine2Kana = useSelector((state: RootState) => state.stripeIndividualAccount.individualLine2Kana)
  const individualPhoneNumber = useSelector((state: RootState) => state.stripeIndividualAccount.individualPhoneNumber)
  const individualBirthDay = useSelector((state: RootState) => state.stripeIndividualAccount.individualBirthDay)
  const individualGender = useSelector((state: RootState) => state.stripeIndividualAccount.individualGender)
  const individualEmail = useSelector((state: RootState) => state.stripeIndividualAccount.individualEmail)
  const individualBusinessUrl = useSelector((state: RootState) => state.stripeIndividualAccount.individualBusinessUrl)
  const individualProductDescription = useSelector((state: RootState) => state.stripeIndividualAccount.individualProductDescription)
  const individualIdentificationImage = useSelector((state: RootState) => state.stripeIndividualAccount.identificationImage)
  const individualAdditionalImage = useSelector((state: RootState) => state.stripeIndividualAccount.additionalImage)

  // 企業情報
  const companyBusinessName = useSelector((state: RootState) => state.stripeCompanyAccount.companyBusinessName)
  const companyBusinessNameKana = useSelector((state: RootState) => state.stripeCompanyAccount.companyBusinessNameKana)
  const companyBusinessTaxId = useSelector((state: RootState) => state.stripeCompanyAccount.companyBusinessTaxId)
  const companyPortalCode = useSelector((state: RootState) => state.stripeCompanyAccount.companyPortalCode)
  const companyStateKanji = useSelector((state: RootState) => state.stripeCompanyAccount.companyStateKanji)
  const companyCityKanji = useSelector((state: RootState) => state.stripeCompanyAccount.companyCityKanji)
  const companyTownKanji = useSelector((state: RootState) => state.stripeCompanyAccount.companyTownKanji)
  const companyLine1Kanji = useSelector((state: RootState) => state.stripeCompanyAccount.companyLine1Kanji)
  const companyLine2Kanji = useSelector((state: RootState) => state.stripeCompanyAccount.companyLine2Kanji)
  const companyStateKana = useSelector((state: RootState) => state.stripeCompanyAccount.companyStateKana)
  const companyCityKana = useSelector((state: RootState) => state.stripeCompanyAccount.companyCityKana)
  const companyTownKana = useSelector((state: RootState) => state.stripeCompanyAccount.companyTownKana)
  const companyLine1Kana = useSelector((state: RootState) => state.stripeCompanyAccount.companyLine1Kana)
  const companyLine2Kana = useSelector((state: RootState) => state.stripeCompanyAccount.companyLine2Kana)
  const companyPhoneNumber = useSelector((state: RootState) => state.stripeCompanyAccount.companyPhoneNumber)
  const companyBusinessUrl = useSelector((state: RootState) => state.stripeCompanyAccount.companyBusinessUrl)
  const companyDescription = useSelector((state: RootState) => state.stripeCompanyAccount.companyDescription)
  const representativeLastNameKanji = useSelector((state: RootState) => state.stripeCompanyAccount.representativeLastNameKanji)
  const representativeFirstNameKanji = useSelector((state: RootState) => state.stripeCompanyAccount.representativeFirstNameKanji)
  const representativeLastNameKana = useSelector((state: RootState) => state.stripeCompanyAccount.representativeLastNameKana)
  const representativeFirstNameKana = useSelector((state: RootState) => state.stripeCompanyAccount.representativeFirstNameKana)
  const representativeEmail = useSelector((state: RootState) => state.stripeCompanyAccount.representativeEmail)
  const representativePhoneNumber = useSelector((state: RootState) => state.stripeCompanyAccount.representativePhoneNumber)
  const representativeGender = useSelector((state: RootState) => state.stripeCompanyAccount.representativeGender)
  const representativeBirthDay = useSelector((state: RootState) => state.stripeCompanyAccount.representativeBirthDay)
  const isDirector = useSelector((state: RootState) => state.stripeCompanyAccount.isDirector)
  const isExecutive = useSelector((state: RootState) => state.stripeCompanyAccount.isExecutive)
  const isOwner = useSelector((state: RootState) => state.stripeCompanyAccount.isOwner)
  const isRepresentative = useSelector((state: RootState) => state.stripeCompanyAccount.isRepresentative)
  const percentOwnership = useSelector((state: RootState) => state.stripeCompanyAccount.percentOwnership)
  const relationshipTitle = useSelector((state: RootState) => state.stripeCompanyAccount.relationshipTitle)
  const representativeAddressPostalCode = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressPostalCode)
  const representativeAddressStateKanji = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressStateKanji)
  const representativeAddressTownKanji = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressTownKanji)
  const representativeAddressCityKanji = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressCityKanji)
  const representativeAddressLine1Kanji = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressLine1Kanji)
  const representativeAddressLine2Kanji = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressLine2Kanji)
  const representativeAddressStateKana = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressStateKana)
  const representativeAddressTownKana = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressTownKana)
  const representativeAddressCityKana = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressCityKana)
  const representativeAddressLine1Kana = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressLine1Kana)
  const representativeAddressLine2Kana = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressLine2Kana)
  const isDirectorRegisterComplete = useSelector((state: RootState) => state.stripeCompanyAccount.isDirectorRegisterComplete)
  const representativeIdentificationImage = useSelector((state: RootState) => state.stripeCompanyAccount.identificationImage)
  const isTermConfirmed = useSelector((state: RootState) => state.stripeAccount.isTermConfirmed)
  const companyVerificationDocumentImage = useSelector((state: RootState) => state.stripeCompanyAccount.verificationDocumentImage)
  // 業種
  const mccType = useSelector((state: RootState) => state.stripeBusinessInfo.mccType)
  const mcc = useSelector((state: RootState) => state.stripeBusinessInfo.mcc)

  useEffect(() => {
    const fetchStripeBusinessInfo = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/accounts/stripe_account_info`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        if (response.data.stripe_account.business_type === 'company') {
          setBusinessType('company')
          dispatch(companyBusinessNameChanged(response.data.stripe_account.company.name))
          dispatch(companyBusinessNameKanaChanged(response.data.stripe_account.company.name_kana))
          dispatch(companyPortalCodeChanged(response.data.stripe_account.company.address_kana.postal_code))
          dispatch(companyStateKanjiChanged(response.data.stripe_account.company.address_kanji.state))
          dispatch(companyStateKanaChanged(response.data.stripe_account.company.address_kana.state))
          dispatch(companyCityKanjiChanged(response.data.stripe_account.company.address_kanji.city))
          dispatch(companyCityKanaChanged(response.data.stripe_account.company.address_kana.city))
          dispatch(companyTownKanjiChanged(response.data.stripe_account.company.address_kanji.town))
          dispatch(companyTownKanaChanged(response.data.stripe_account.company.address_kana.town))
          dispatch(companyLine1KanjiChanged(response.data.stripe_account.company.address_kanji.line1))
          dispatch(companyLine1KanaChanged(response.data.stripe_account.company.address_kana.line1))
          dispatch(companyLine2KanjiChanged(response.data.stripe_account.company.address_kanji.line2))
          dispatch(companyLine2KanaChanged(response.data.stripe_account.company.address_kana.line2))
          dispatch(companyPhoneNumberChanged(response.data.stripe_account.company.phone))
          dispatch(companyBusinessUrlChanged(response.data.stripe_account.business_profile.url))
          dispatch(companyDescriptionChanged(response.data.stripe_account.business_profile.product_description))      
          dispatch(representativeLastNameKanjiChanged(response.data.representative.last_name_kanji))
          dispatch(representativeFirstNameKanjiChanged(response.data.representative.first_name_kanji))
          dispatch(representativeLastNameKanaChanged(response.data.representative.last_name_kana))
          dispatch(representativeFirstNameKanaChanged(response.data.representative.first_name_kana))
          dispatch(representativeEmailChanged(response.data.representative.email))
          dispatch(representativePhoneNumberChanged(response.data.representative.phone))
          dispatch(representativeBirthDayChanged(String(response.data.representative.dob.year) + '-' + getZeroPaddingString(String(response.data.representative.dob.month)) + '-' + getZeroPaddingString(String(response.data.representative.dob.day))))
          dispatch(representativeGenderChanged(response.data.representative.gender))
          dispatch(representativeAddressPostalCodeChanged(response.data.representative.address_kana.postal_code))
          dispatch(representativeAddressStateKanjiChanged(response.data.representative.address_kanji.state))
          dispatch(representativeAddressCityKanjiChanged(response.data.representative.address_kanji.city))
          dispatch(representativeAddressTownKanjiChanged(response.data.representative.address_kanji.town))
          dispatch(representativeAddressLine1KanjiChanged(response.data.representative.address_kanji.line1))
          dispatch(representativeAddressLine2KanjiChanged(response.data.representative.address_kanji.line2))
          dispatch(representativeAddressStateKanaChanged(response.data.representative.address_kana.state))
          dispatch(representativeAddressCityKanaChanged(response.data.representative.address_kana.city))
          dispatch(representativeAddressTownKanaChanged(response.data.representative.address_kana.town))
          dispatch(representativeAddressLine1KanaChanged(response.data.representative.address_kana.line1))
          dispatch(representativeAddressLine2KanaChanged(response.data.representative.address_kana.line2))
          dispatch(representativeVerificationStatusChanged(response.data.representative.verification.status))
          dispatch(isDirectorChanged(response.data.representative.relationship.director))
          dispatch(isExecutiveChanged(response.data.representative.relationship.executive))
          dispatch(isOwnerChanged(response.data.representative.relationship.owner))
          dispatch(relationshipTitleChanged(response.data.representative.relationship.title))
          dispatch(verificationDocumentFrontChanged(response.data.stripe_account.company.verification.document.front))
        } else if (response.data.stripe_account.business_type === 'individual') {
          dispatch(individualFirstNameKanjiChanged(response.data.stripe_account.individual.first_name_kanji))
          dispatch(individualLastNameKanjiChanged(response.data.stripe_account.individual.last_name_kanji))
          dispatch(individualFirstNameKanaChanged(response.data.stripe_account.individual.first_name_kana))
          dispatch(individualLastNameKanaChanged(response.data.stripe_account.individual.last_name_kana))
          dispatch(individualBirthDayChanged(String(response.data.stripe_account.individual.dob.year) + '-' + getZeroPaddingString(String(response.data.stripe_account.individual.dob.month)) + '-' + getZeroPaddingString(String(response.data.stripe_account.individual.dob.day))))
          dispatch(individualPostalCodeKanjiChanged(response.data.stripe_account.individual.address_kana.postal_code))
          dispatch(individualStateKanjiChanged(response.data.stripe_account.individual.address_kanji.state))
          dispatch(individualCityKanjiChanged(response.data.stripe_account.individual.address_kanji.city))
          dispatch(individualTownKanjiChanged(response.data.stripe_account.individual.address_kanji.town))
          dispatch(individualLine1KanjiChanged(response.data.stripe_account.individual.address_kanji.line1))
          dispatch(individualLine2KanjiChanged(response.data.stripe_account.individual.address_kanji.line2))
          dispatch(individualStateKanaChanged(response.data.stripe_account.individual.address_kana.state))
          dispatch(individualCityKanaChanged(response.data.stripe_account.individual.address_kana.city))
          dispatch(individualTownKanaChanged(response.data.stripe_account.individual.address_kana.town))
          dispatch(individualLine1KanaChanged(response.data.stripe_account.individual.address_kana.line1))
          dispatch(individualLine2KanaChanged(response.data.stripe_account.individual.address_kana.line2))
          dispatch(individualPhoneNumberChanged(response.data.stripe_account.individual.phone))
          dispatch(individualEmailChanged(response.data.stripe_account.individual.email))
          dispatch(individualBusinessUrlChanged(response.data.stripe_account.business_profile.url))
          dispatch(individualProductDescriptionChanged(response.data.stripe_account.business_profile.product_description))
          dispatch(individualGenderChanged(response.data.stripe_account.individual.gender))
          dispatch(individualDocumentFrontChanged(response.data.stripe_account.individual.verification.document.front))
          dispatch(individualAdditionalDocumentFrontChanged(response.data.stripe_account.individual.verification.additional_document.front))
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchStripeBusinessInfo()
  }, [router.query.public_id, cookies._square_eight_merchant_session, dispatch])

  const validateSubmit = () => {
    if (!isTermConfirmed) { return true }
    if (businessType === 'individual') {
      if (!individualFirstNameKanji ||
          !individualLastNameKanji ||
          !individualFirstNameKana ||
          !individualLastNameKana ||
          !individualPostalCodeKanji ||
          !individualStateKanji ||
          !individualCityKanji ||
          !individualTownKanji ||
          !individualLine1Kanji ||
          !individualStateKana ||
          !individualCityKana ||
          !individualTownKana ||
          !individualLine1Kana ||
          !individualPhoneNumber ||
          !individualBirthDay ||
          !individualGender ||
          !individualEmail ||
          !individualBusinessUrl ||
          !individualProductDescription) {
        return true
      }
    } else {
      if (!companyBusinessNameKana ||
          !companyBusinessTaxId ||
          !companyPortalCode ||
          !companyStateKanji ||
          !companyCityKanji ||
          !companyTownKanji ||
          !companyLine1Kanji ||
          !companyStateKana ||
          !companyStateKana ||
          !companyCityKana ||
          !companyTownKana ||
          !companyLine1Kana ||
          !companyPhoneNumber ||
          !companyBusinessUrl ||
          !companyDescription ||
          !representativeLastNameKanji ||
          !representativeFirstNameKanji ||
          !representativeLastNameKana ||
          !representativeFirstNameKana ||
          !representativeEmail ||
          !representativePhoneNumber ||
          !representativeGender ||
          !representativeBirthDay ||
          !representativeAddressPostalCode ||
          !representativeAddressStateKanji ||
          !representativeAddressTownKanji ||
          !representativeAddressCityKanji ||
          !representativeAddressLine1Kanji ||
          !representativeAddressStateKana ||
          !representativeAddressTownKana ||
          !representativeAddressCityKana ||
          !representativeAddressLine1Kana ||
          !relationshipTitle
          ) {
        return true
      }
    }
    return false
  }

  const onSubmit = () => {
    setIsLoading(true)
    axios.post(`${process.env.BACKEND_URL}/api/internal/accounts/register_stripe_business_info`,
    {
      account: {
        business_type: businessType,
        business_profile_name: companyBusinessName,
        individual_first_name_kanji: individualFirstNameKanji,
        individual_first_name_kana: individualFirstNameKana,
        individual_last_name_kanji: individualLastNameKanji,
        individual_last_name_kana: individualLastNameKana,
        individual_postal_code_kanji: individualPostalCodeKanji,
        individual_state_kanji: individualStateKanji,
        individual_city_kanji: individualCityKanji,
        individual_town_kanji: individualTownKanji,
        individual_line1_kanji: individualLine1Kanji,
        individual_line2_kanji: individualLine2Kana,
        individual_state_kana: individualStateKana,
        individual_town_kana: individualTownKana,
        individual_city_kana: individualCityKana,
        individual_line1_kana: individualLine1Kana,
        individual_line2_kana: individualLine2Kana,
        individual_phone_number: individualPhoneNumber,
        individual_birth_day: individualBirthDay,
        individual_gender: individualGender,
        individual_email: individualEmail,
        individual_business_url: individualBusinessUrl,
        individual_product_description: individualProductDescription,
        individual_identification_image: individualIdentificationImage,
        individual_additional_image: individualAdditionalImage,
        company_business_name_kana: companyBusinessNameKana,
        company_business_tax_id: companyBusinessTaxId,
        company_postal_code: companyPortalCode,
        company_state_kanji: companyStateKanji,
        company_city_kanji: companyCityKanji,
        company_town_kanji: companyTownKanji,
        company_line1_kanji: companyLine1Kanji,
        company_line2_kanji: companyLine2Kanji,
        company_state_kana: companyStateKana,
        company_city_kana: companyCityKana,
        company_town_kana: companyTownKana,
        company_line1_kana: companyLine1Kana,
        company_line2_kana: companyLine2Kana,
        company_phone_number: companyPhoneNumber,
        company_business_url: companyBusinessUrl,
        company_description: companyDescription,
        company_verification_document_image: companyVerificationDocumentImage,
        representative_last_name_kanji: representativeLastNameKanji,
        representative_first_name_kanji: representativeFirstNameKanji,
        representative_last_name_kana: representativeLastNameKana,
        representative_first_name_kana: representativeFirstNameKana,
        representative_email: representativeEmail,
        representative_phone_number: representativePhoneNumber,
        representative_birth_day: representativeBirthDay,
        representative_gender: representativeGender,
        representative_address_postal_code: representativeAddressPostalCode,
        representative_address_state_kanji: representativeAddressStateKanji,
        representative_address_city_kanji: representativeAddressCityKanji,
        representative_address_town_kanji: representativeAddressTownKanji,
        representative_address_line1_kanji: representativeAddressLine1Kanji,
        representative_address_line2_kanji: representativeAddressLine2Kanji,
        representative_address_state_kana: representativeAddressStateKana,
        representative_address_city_kana: representativeAddressCityKana,
        representative_address_town_kana: representativeAddressTownKana,
        representative_address_line1_kana: representativeAddressLine1Kana,
        representative_address_line2_kana: representativeAddressLine2Kana,
        representative_identification_image: representativeIdentificationImage,
        is_director_register_complete: isDirectorRegisterComplete,
        is_director: isDirector,
        is_executive: isExecutive,
        is_owner: isOwner,
        is_representative: isRepresentative,
        percent_ownership: percentOwnership,
        relationship_title: relationshipTitle,
        mcc: mcc,
        mcc_type: mccType
      },
    },
    {
      headers: { 
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      setIsLoading(false)
      router.push('/admin/sales_transfer')
    }).catch(error => {
      setIsLoading(false)
      swalWithBootstrapButtons.fire({
        title: '登録失敗しました',
        text: error.response.data.error,
        icon: 'error'
      })
    })
  }
  return (
    <>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
          <h4 className='mb20'>事業情報を入力してください</h4>
          <h5>決済機能の有効化に必要となります</h5>
          <Form.Label className='mt20'>事業形態</Form.Label>
          <Form.Select onChange={(e) => setBusinessType(e.target.value)} value={businessType}>
            <option value='individual'>個人事業主（副業も含む）</option>
            <option value='company'>法人（株式会社/合同会社/NPOなど）</option>
          </Form.Select>
          {businessType === 'individual' && <StripeIndividualAccountForm></StripeIndividualAccountForm>}
          {businessType === 'company' && <StripeCompanyAccountForm></StripeCompanyAccountForm>}
          <StripeTerm></StripeTerm>
          <Button onClick={onSubmit} className='mt10' disabled={validateSubmit()}>
            {isLoading && <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>}
            登録する
          </Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  )
}


export default RegisterMerchantInfoForm
