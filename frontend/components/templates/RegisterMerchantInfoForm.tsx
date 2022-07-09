import React, { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import StripeIndividualAccountForm from 'components/organisms/StripeIndividualAccountForm'
import { Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { RootState } from 'redux/store'
import { alertChanged } from 'redux/alertSlice'
import StripeTerm from 'components/organisms/StripeTerm'

const RegisterMerchantInfoForm = () => {
  const [businessType, setBusinessType] = useState('individual')
  const [cookies] = useCookies(['_gybuilder_session'])
  const dispatch = useDispatch()
  const router = useRouter()

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
  const identificationImage = useSelector((state: RootState) => state.stripeIndividualAccount.identificationImage)

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/accounts/register_stripe_business_info`,
    {
      account: {
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
        identification_image: identificationImage
      },
    },
    {
      headers: { 
        'Session-Id': cookies._gybuilder_session
      }
    }).then(response => {
      router.push('/admin/sales_transfer')
    }).catch(error => {
      dispatch(alertChanged({message: '登録失敗しました', show: true, type: 'danger'}))
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
          <Form.Select onChange={(e) => setBusinessType(e.target.value)}>
            <option value='individual'>個人事業主（副業も含む）</option>
            <option value='company'>法人（株式会社/合同会社/NPOなど）</option>
          </Form.Select>
          {businessType === 'individual' && <StripeIndividualAccountForm></StripeIndividualAccountForm>}
          <StripeTerm></StripeTerm>
          <Button onClick={onSubmit} className='mt10'>登録する</Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  )
}


export default RegisterMerchantInfoForm
