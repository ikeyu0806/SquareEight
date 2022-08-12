import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import RequireBadge from 'components/atoms/RequireBadge'
import { RootState } from 'redux/store'
import {  companyBusinessNameChanged,
          companyBusinessNameKanaChanged,
          companyRegistrationNumberChanged,
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
          companyBusinessUrlChanged
        } from "redux/stripeCompanyAccountSlice"

const StripeCompanyAccountForm = (): JSX.Element => {
  const dispatch = useDispatch()

  const companyBusinessName = useSelector((state: RootState) => state.stripeCompanyAccount.companyBusinessName)
  const companyBusinessNameKana = useSelector((state: RootState) => state.stripeCompanyAccount.companyBusinessNameKana)
  const companyRegistrationNumber = useSelector((state: RootState) => state.stripeCompanyAccount.companyRegistrationNumber)
  const companyPortalCode = useSelector((state: RootState) => state.stripeCompanyAccount.companyPortalCode)
  const companyStateKanji = useSelector((state: RootState) => state.stripeCompanyAccount.companyStateKanji)
  const companyCityKanji = useSelector((state: RootState) => state.stripeCompanyAccount.companyCityKanji)
  const companyTownKanji = useSelector((state: RootState) => state.stripeCompanyAccount.companyTownKanji)
  const companyLine1Kanji = useSelector((state: RootState) => state.stripeCompanyAccount.companyLine1Kanji)
  const companyLine2Kanji = useSelector((state: RootState) => state.stripeCompanyAccount.companyLine2Kanji)
  const companyStateKana = useSelector((state: RootState) => state.stripeCompanyAccount.companyStateKanji)
  const companyCityKana = useSelector((state: RootState) => state.stripeCompanyAccount.companyCityKana)
  const companyTownKana = useSelector((state: RootState) => state.stripeCompanyAccount.companyTownKana)
  const companyLine1Kana = useSelector((state: RootState) => state.stripeCompanyAccount.companyLine1Kana)
  const companyLine2Kana = useSelector((state: RootState) => state.stripeCompanyAccount.companyLine2Kana)
  const companyPhoneNumber = useSelector((state: RootState) => state.stripeCompanyAccount.companyPhoneNumber)
  const companyBusinessUrl = useSelector((state: RootState) => state.stripeCompanyAccount.companyBusinessUrl)
  const companyDescription = useSelector((state: RootState) => state.stripeCompanyAccount.companyDescription)

  return (
    <>
      <Form.Label className='mt10'>法人名、商号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch((companyBusinessNameChanged(e.target.value)))}
                    value={companyBusinessName}></Form.Control>
      <Form.Label className='mt10'>法人名、商号（カナ）</Form.Label>
      <Form.Control onChange={(e) => dispatch((companyBusinessNameKanaChanged(e.target.value)))}
                    value={companyBusinessNameKana}></Form.Control>
      <Form.Label className='mt10'>郵便番号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyPortalCodeChanged(e.target.value))}
                    value={companyPortalCode}></Form.Control>
      <Form.Label className='mt10'>都道府県（漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyStateKanjiChanged(e.target.value))}
                    value={companyStateKanji}></Form.Control>
      <Form.Label className='mt10'>都道府県（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyStateKanaChanged(e.target.value))}
                    value={companyStateKana}></Form.Control>
      <Form.Label className='mt10'>区市町村（漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyCityKanjiChanged(e.target.value))}
                    value={companyCityKanji}></Form.Control>
      <Form.Label className='mt10'>区市町村（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyCityKanaChanged(e.target.value))}
                    value={companyCityKana}></Form.Control>
      <Form.Label className='mt10'>町名（丁目まで、漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyTownKanjiChanged(e.target.value))}
                    value={companyTownKanji}></Form.Control>
      <Form.Label className='mt10'>町名（丁目まで、カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyTownKanaChanged(e.target.value))}
                    value={companyTownKana}></Form.Control>
      <Form.Label className='mt10'>番地、号（漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyLine1KanjiChanged(e.target.value))}
                    value={companyLine1Kanji}></Form.Control>
      <Form.Label className='mt10'>番地、号（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyLine1KanaChanged(e.target.value))}
                    value={companyLine1Kana}></Form.Control>
      <Form.Label className='mt10'>建物・部屋番号・その他（漢字）</Form.Label>
      <Form.Control onChange={(e) => dispatch(companyLine2KanjiChanged(e.target.value))}
                    value={companyLine2Kanji}></Form.Control>
      <Form.Label className='mt10'>建物・部屋番号・その他（カナ）</Form.Label>
      <Form.Control onChange={(e) => dispatch(companyLine2KanaChanged(e.target.value))}
                    value={companyLine2Kana}></Form.Control>
      <Form.Label className='mt10'>法人番号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyRegistrationNumberChanged(e.target.value))}
                    value={companyRegistrationNumber}></Form.Control>
      <Form.Label className='mt10'>ビジネス電話番号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyPhoneNumberChanged(e.target.value))}
                    value={companyPhoneNumber}></Form.Control>
      <Form.Label className='mt10'>事業のウェブサイト<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyBusinessUrlChanged(e.target.value))}
                    value={companyBusinessUrl}></Form.Control>
      <Form.Label className='mt10'>
        商品、サービス内容の詳細<br/>
        1 ～ 2 行でご説明ください。通常顧客に請求するタイミング (購入中、または 3 日後など) を必ずご記入ください。
      </Form.Label>
      <Form.Control onChange={(e) => dispatch(companyDescriptionChanged(e.target.value))}
                    value={companyDescription}
                    as='textarea'
                    rows={2}></Form.Control>
    </>
  )
}

export default StripeCompanyAccountForm
