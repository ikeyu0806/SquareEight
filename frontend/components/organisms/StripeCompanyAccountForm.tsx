import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import RequireBadge from 'components/atoms/RequireBadge'
import { RootState } from 'redux/store'
import { getBase64 } from 'functions/getBase64'
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
          representativeBirthDayChanged,
          representativePhoneNumberChanged,
          representativeEmailChanged,
          representativeGenderChanged,
          representativeAddressPostalCodeChanged,
          representativeAddressTownKanjiChanged,
          representativeAddressStateKanjiChanged,
          representativeAddressCityKanjiChanged,
          representativeAddressLine1KanjiChanged,
          representativeAddressLine2KanjiChanged,
          representativeAddressTownKanaChanged,
          representativeAddressStateKanaChanged,
          representativeAddressCityKanaChanged,
          representativeAddressLine1KanaChanged,
          representativeAddressLine2KanaChanged,
          isDirectorRegisterCompleteChanged,
          identificationImageChanged,
          isDirectorChanged,
          isExecutiveChanged,
          isOwnerChanged,
          isRepresentativeChanged,
          percentOwnershipChanged,
          relationshipTitleChanged
        } from 'redux/stripeCompanyAccountSlice'

const StripeCompanyAccountForm = (): JSX.Element => {
  const dispatch = useDispatch()

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
  const representativeBirthDay = useSelector((state: RootState) => state.stripeCompanyAccount.representativeBirthDay)
  const representativePhoneNumber = useSelector((state: RootState) => state.stripeCompanyAccount.representativePhoneNumber)
  const representativeAddressPostalCode = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressPostalCode)
  const representativeAddressStateKanji = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressStateKanji)
  const representativeAddressCityKanji = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressCityKanji)
  const representativeAddressTownKanji = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressTownKanji)
  const representativeAddressLine1Kanji = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressLine1Kanji)
  const representativeAddressLine2Kanji = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressLine2Kanji)
  const representativeAddressStateKana = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressStateKana)
  const representativeAddressCityKana = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressCityKana)
  const representativeAddressTownKana = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressTownKana)
  const representativeAddressLine1Kana = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressLine1Kana)
  const representativeAddressLine2Kana = useSelector((state: RootState) => state.stripeCompanyAccount.representativeAddressLine2Kana)
  const isDirectorRegisterComplete = useSelector((state: RootState) => state.stripeCompanyAccount.isDirectorRegisterComplete)
  const representativeVerificationStatus = useSelector((state: RootState) => state.stripeCompanyAccount.representativeVerificationStatus)
  const isDirector = useSelector((state: RootState) => state.stripeCompanyAccount.isDirector)
  const isExecutive = useSelector((state: RootState) => state.stripeCompanyAccount.isExecutive)
  const isOwner = useSelector((state: RootState) => state.stripeCompanyAccount.isOwner)
  const isRepresentative = useSelector((state: RootState) => state.stripeCompanyAccount.isRepresentative)
  const percentOwnership = useSelector((state: RootState) => state.stripeCompanyAccount.percentOwnership)
  const relationshipTitle = useSelector((state: RootState) => state.stripeCompanyAccount.relationshipTitle)

  const [image, setImage] = useState('')

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => dispatch(identificationImageChanged(data))
    )
  }

  return (
    <>
      <Form.Label className='mt10'>法人名、商号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyBusinessNameChanged(e.target.value))}
                    value={companyBusinessName}></Form.Control>
      <Form.Label className='mt10'>法人名、商号（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyBusinessNameKanaChanged(e.target.value))}
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
      <Form.Control onChange={(e) => dispatch(companyBusinessTaxIdChanged(e.target.value))}
                    value={companyBusinessTaxId}></Form.Control>
      <Form.Label className='mt10'>ビジネス電話番号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyPhoneNumberChanged(e.target.value))}
                    value={companyPhoneNumber}></Form.Control>
      <Form.Label className='mt10'>事業のウェブサイト<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyBusinessUrlChanged(e.target.value))}
                    value={companyBusinessUrl}></Form.Control>
      <Form.Label className='mt10'>
        商品、サービス内容の詳細<RequireBadge></RequireBadge><br/>
        1 ～ 2 行でご説明ください。通常顧客に請求するタイミング (購入中、または 3 日後など) を必ずご記入ください。
      </Form.Label>
      <Form.Control onChange={(e) => dispatch(companyDescriptionChanged(e.target.value))}
                    value={companyDescription}
                    as='textarea'
                    rows={2}></Form.Control>
      <Form.Label className='mt10'>代表者の姓（漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeLastNameKanjiChanged(e.target.value))}
                    value={representativeLastNameKanji}></Form.Control>
      <Form.Label className='mt10'>代表者の姓（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeLastNameKanaChanged(e.target.value))}
                    value={representativeLastNameKana}></Form.Control>
      <Form.Label className='mt10'>代表者のお名前（漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeFirstNameKanjiChanged(e.target.value))}
                    value={representativeFirstNameKanji}></Form.Control>
      <Form.Label className='mt10'>代表者のお名前（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeFirstNameKanaChanged(e.target.value))}
                    value={representativeFirstNameKana}></Form.Control>
      <Form.Label className='mt10'>代表者の生年月日<RequireBadge></RequireBadge></Form.Label>
      <Form.Control type='date' onChange={(e) => dispatch(representativeBirthDayChanged(e.target.value))}
                    value={representativeBirthDay}></Form.Control>
      <Form.Label className='mt10'>代表者の姓別<RequireBadge></RequireBadge></Form.Label>
      <Form.Select onChange={(e) => dispatch(representativeGenderChanged(e.target.value))}>
        <option value='male'>男</option>
        <option value='female'>女</option>
      </Form.Select>
      <Form.Label className='mt10'>代表者のメールアドレス<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeEmailChanged(e.target.value))}
                    value={representativeEmail}></Form.Control>
      <Form.Label className='mt10'>代表者の電話番号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativePhoneNumberChanged(e.target.value))}
                    value={representativePhoneNumber}></Form.Control>
      <Form.Label className='mt10'>代表者の自宅住所・郵便番号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeAddressPostalCodeChanged(e.target.value))}
                    value={representativeAddressPostalCode}></Form.Control>
      <Form.Label className='mt10'>代表者の自宅住所・都道府県（漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeAddressStateKanjiChanged(e.target.value))}
                    value={representativeAddressStateKanji}></Form.Control>
      <Form.Label className='mt10'>代表者の自宅住所・都道府県（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeAddressStateKanaChanged(e.target.value))}
                    value={representativeAddressStateKana}></Form.Control>
      <Form.Label className='mt10'>代表者の自宅住所・区市町村（漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeAddressCityKanjiChanged(e.target.value))}
                    value={representativeAddressCityKanji}></Form.Control>
      <Form.Label className='mt10'>代表者の自宅住所・区市町村（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeAddressCityKanaChanged(e.target.value))}
                    value={representativeAddressCityKana}></Form.Control>
      <Form.Label className='mt10'>代表者の自宅住所・町名（丁目まで、漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeAddressTownKanjiChanged(e.target.value))}
                    value={representativeAddressTownKanji}></Form.Control>
      <Form.Label className='mt10'>代表者の自宅住所・町名（丁目まで、カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeAddressTownKanaChanged(e.target.value))}
                    value={representativeAddressTownKana}></Form.Control>
      <Form.Label className='mt10'>代表者の自宅住所・番地、号（漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeAddressLine1KanjiChanged(e.target.value))}
                    value={representativeAddressLine1Kanji}></Form.Control>
      <Form.Label className='mt10'>代表者の自宅住所・番地、号（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeAddressLine1KanaChanged(e.target.value))}
                    value={representativeAddressLine1Kana}></Form.Control>
      <Form.Label className='mt10'>代表者の自宅住所・建物、部屋番号、その他（漢字）</Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeAddressLine2KanjiChanged(e.target.value))}
                    value={representativeAddressLine2Kanji}></Form.Control>
      <Form.Label className='mt10'>代表者の自宅住所・建物、部屋番号、その他（カナ）</Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeAddressLine2KanaChanged(e.target.value))}
                    value={representativeAddressLine2Kana}></Form.Control>
      <Form.Label className='mt10'>代表者以外に取締役はいますか?</Form.Label>
      <Form.Check
        type='switch'
        checked={isDirectorRegisterComplete === true}
        label='なし、代表者のみです'
        onChange={() => dispatch(isDirectorRegisterCompleteChanged(!isDirectorRegisterComplete))}></Form.Check>
      <Form.Check
        label='この人物はアカウントの主たる代表者として認められています。'
        id='isRepresentativeCheck'
        onChange={() => isRepresentativeChanged(!isRepresentative)}
      ></Form.Check>
      {representativeVerificationStatus !== 'verified'
        ? <>
            <Form.Group controlId='formFile' className='mt10'>
              <Form.Label>
                本人確認書類。以下のいずれかをアップロードしてください<br/>
                &emsp;1. 運転免許書<br/>
                &emsp;2. パスポート<br/>
                &emsp;3. 外国国籍を持つ方の場合は在留カード<br/>
                &emsp;4. 住基カード(顔写真入り)<br/>
                &emsp;5. マイナンバーカード(顔写真入り)
              </Form.Label>
              <Form.Control type='file' onChange={handleChangeFile} />
            </Form.Group>
         </>
        :
        <div className='mt10'>本人確認書類は提出済みです</div>}
    </>
  )
}

export default StripeCompanyAccountForm
