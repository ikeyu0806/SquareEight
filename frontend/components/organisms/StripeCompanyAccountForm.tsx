import React, { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getBase64 } from 'functions/getBase64'
import RequireBadge from 'components/atoms/RequireBadge'
import StripePersonForm from 'components/molecules/StripePersonForm'
import { RootState } from 'redux/store'
import StripeFileRequirement from 'components/molecules/StripeFileRequirement'
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
          verificationDocumentImageChanged,
          verificationDocumentImageFileChanged
        } from 'redux/stripeCompanyAccountSlice'

const StripeCompanyAccountForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const [image, setImage] = useState('')
  const [isImageSizeOver, setIsImageSizeOver] = useState(false)

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
  const verificationDocumentImage = useSelector((state: RootState) => state.stripeCompanyAccount.verificationDocumentImage)
  const verificationDocumentFront = useSelector((state: RootState) => state.stripeCompanyAccount.verificationDocumentFront)
  const verificationDocumentImageFile = useSelector((state: RootState) => state.stripeCompanyAccount.verificationDocumentImageFile)

  const onChangeVerificationDocumentImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      dispatch(verificationDocumentImageFileChanged(files[0]))
    }
  }

  return (
    <Form>
      <Form.Label className='mt10'>法人名、商号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyBusinessNameChanged(e.target.value))}
                    value={companyBusinessName}></Form.Control>
      <Form.Label className='mt10'>法人名、商号（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyBusinessNameKanaChanged(e.target.value))}
                    value={companyBusinessNameKana}></Form.Control>
      <hr />
      <Form.Label className='mt10'>郵便番号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(companyPortalCodeChanged(e.target.value))}
                    type='text'
                    name='postal_code'
                    minLength={7}
                    maxLength={8}
                    pattern='\d*'
                    autoComplete='postal-code'
                    value={companyPortalCode}></Form.Control>
      <hr />
      <div>住所（漢字）</div>
      <Row>
        <Col>
          <Form.Label className='mt10'>都道府県（漢字）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control name='state'
                        autoComplete='state'
                        onChange={(e) => dispatch(companyStateKanjiChanged(e.target.value))}
                        value={companyStateKanji}></Form.Control>
        </Col>
        <Col>
          <Form.Label className='mt10'>区市町村（漢字）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='text'
                        name='city'
                        autoComplete='city'
                        onChange={(e) => dispatch(companyCityKanjiChanged(e.target.value))}
                        value={companyCityKanji}></Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label className='mt10'>町名（丁目まで、漢字）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='text'
                        name='town'
                        autoComplete='town'
                        onChange={(e) => dispatch(companyTownKanjiChanged(e.target.value))}
                        value={companyTownKanji}></Form.Control>
        </Col>
        <Col>
          <Form.Label className='mt10'>番地、号（漢字）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='text'
                        name='line1'
                        autoComplete='line1'
                        onChange={(e) => dispatch(companyLine1KanjiChanged(e.target.value))}
                        value={companyLine1Kanji}></Form.Control>
        </Col>
      </Row>
      <Form.Label className='mt10'>建物・部屋番号・その他（漢字）</Form.Label>
      <Form.Control type='text'
                    name='line2'
                    autoComplete='line2'
                    onChange={(e) => dispatch(companyLine2KanjiChanged(e.target.value))}
                    value={companyLine2Kanji ?? ''}></Form.Control>
      <hr />
      <div>住所（カナ）</div>
      <Row>
        <Col>
          <Form.Label className='mt10'>都道府県（カナ）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='text'
                        name='stateKana'
                        autoComplete='stateKana'
                        onChange={(e) => dispatch(companyStateKanaChanged(e.target.value))}
                        value={companyStateKana}></Form.Control>
        </Col>
        <Col>
          <Form.Label className='mt10'>区市町村（カナ）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='text'
                        name='cityKana'
                        autoComplete='cityKana'
                        onChange={(e) => dispatch(companyCityKanaChanged(e.target.value))}
                        value={companyCityKana}></Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label className='mt10'>町名（丁目まで、カナ）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='text'
                        name='townKana'
                        autoComplete='townKana'
                        onChange={(e) => dispatch(companyTownKanaChanged(e.target.value))}
                        value={companyTownKana}></Form.Control>
        </Col>
        <Col>
          <Form.Label className='mt10'>番地、号（カナ）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='text'
                        name='line1Kana'
                        autoComplete='line1Kana'
                        onChange={(e) => dispatch(companyLine1KanaChanged(e.target.value))}
                        value={companyLine1Kana}></Form.Control>
        </Col>
      </Row>
      <Form.Label className='mt10'>建物・部屋番号・その他（カナ）</Form.Label>
      <Form.Control type='text'
                    name='line2Kana'
                    autoComplete='line2Kana'
                    onChange={(e) => dispatch(companyLine2KanaChanged(e.target.value))}
                    value={companyLine2Kana ?? ''}></Form.Control>
      <hr />
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
      <hr />

      <Form.Group controlId='formFile' className='mt10'>
        <Form.Label>
          法人確認書類{verificationDocumentFront && <span className='ml10 badge bg-info'>提出済み</span>}
          <StripeFileRequirement />
          <div className='mt20 mb20'>必須ではありませんがStripeの承認に必要な場合があります。</div>
          以下のいずれかをアップロードしてください<br/>
          &emsp;1. 登記謄本 (Touki)<br/>
          &emsp;2. 印鑑登録証明書 (Seal registration certificate)
          </Form.Label>
          {isImageSizeOver && <div className='color-red'>画像のサイズが10MBを超えています</div>}
        <Form.Control type='file' onChange={onChangeVerificationDocumentImageFile} />
      </Form.Group>

      <hr />
  
      <div className='mt20 mb30'>以下ビジネスアカウントの主たる代表者の情報を入力してください</div>
      <StripePersonForm></StripePersonForm>
    </Form>
  )
}

export default StripeCompanyAccountForm
