import { NextPage } from 'next'
import { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import StripePersonForm from 'components/molecules/StripePersonForm'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const RegisterStripePerson: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

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
  const allowUpdateStripeBusinessInfo = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateStripeBusinessInfo)

  const onSubmit = () => {
    setIsLoading(true)
    axios.post(`${process.env.BACKEND_URL}/api/internal/accounts/register_stripe_person`,
    {
      account: {
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
        relationship_title: relationshipTitle
      }
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
    <MerchantUserAdminLayout>
      {allowUpdateStripeBusinessInfo === 'Allow' && <Container>
        <Row>
          <Col lg={3} md={1}></Col>
          <Col lg={6} md={10}>
            <StripePersonForm></StripePersonForm>
            <Button
              className='mt20'
              onClick={() => onSubmit()}>
                {isLoading && <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>}
                登録する
              </Button>
          </Col>
        </Row>
      </Container>}
    </MerchantUserAdminLayout>
  )
}

export default RegisterStripePerson
