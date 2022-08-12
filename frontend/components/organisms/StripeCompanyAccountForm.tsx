import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import RequireBadge from 'components/atoms/RequireBadge'
import { getBase64 } from 'functions/getBase64'
import { RootState } from 'redux/store'
import {  companyBusinessNameChanged,
          companyBusinessNameKanaChanged,
          companyBusinessNameKanjiChanged,
          companyBusinessTaxIdChanged,
          companyPortalCodeChanged,
          companyStateChanged,
          companyCityChanged,
          companyTownChanged,
          companyLine1Changed,
          companyLine2Changed,
          companyManagerFirstNameKanjiChanged,
          companyManagerLastNameKanjiChanged,
          companyManagerFirstNameKanaChanged,
          companyManagerLastNameKanaChanged,
          companyManagerSexChanged,
          companyManagerPortalCodeKanjiChanged,
          companyManagerStateKanjiChanged,
          companyManagerCityKanjiChanged,
          companyManagerTownKanjiChanged,
          companyManagerLine1KanjiChanged,
          companyManagerLine2KanjiChanged,
          companyManagerPortalCodeKanaChanged,
          companyManagerStateKanaChanged,
          companyManagerCityKanaChanged,
          companyManagerTownKanaChanged,
          companyManagerLine1KanaChanged,
          companyManagerLine2KanaChanged,
          companyManagerDobYearChanged,
          companyManagerDobMonthChanged,
          companyManagerDobDayChanged,
          companyManagerPhoneNumberChanged,
          identificationImageChanged
        } from "redux/stripeCompanyAccountSlice"

const StripeCompanyAccountForm = (): JSX.Element => {
  const dispatch = useDispatch()

  return (
    <>
      <Form.Label className='mt10'>法人名、商号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => console.log(e)}
                    value={'test'}></Form.Control>
      <Form.Label className='mt10'>法人名、商号（カナ）</Form.Label>
      <Form.Control onChange={(e) => console.log(e)}
                    value={'test'}></Form.Control>
      <Form.Label className='mt10'>法人名、商号（ローマ字）</Form.Label>
      <Form.Control onChange={(e) => console.log(e)}
                    value={'test'}></Form.Control>
      <Form.Label className='mt10'>法人番号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => console.log(e)}
                    value={'test'}></Form.Control>
      <Form.Label className='mt10'>ビジネス電話番号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => console.log(e)}
                    value={'test'}></Form.Control>
      <Form.Label className='mt10'>事業のウェブサイト<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => console.log(e)}
                    value={'test'}></Form.Control>
      <Form.Label className='mt10'>法人の電話番号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => console.log(e)}
                    value={'test'}></Form.Control>
      <Form.Label className='mt10'>
        商品、サービス内容の詳細<br/>
        1 ～ 2 行でご説明ください。通常顧客に請求するタイミング (購入中、または 3 日後など) を必ずご記入ください。
      </Form.Label>
      <Form.Control onChange={(e) => console.log(e)}
                    value={'test'}
                    as='textarea'
                    rows={2}></Form.Control>
    </>
  )
}

export default StripeCompanyAccountForm
