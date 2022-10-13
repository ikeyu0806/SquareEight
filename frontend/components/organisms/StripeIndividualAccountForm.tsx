import React, { useState } from 'react'
import { Form, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getBase64 } from 'functions/getBase64'
import { RootState } from 'redux/store'
import RequireBadge from 'components/atoms/RequireBadge'
import { prefecturesArray } from 'constants/prefecturesArray'
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
          additionalImageChanged } from 'redux/stripeIndividualAccountSlice'

const StripeIndividualAccountForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const [image, setImage] = useState('')

  const handleIdentificationFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => dispatch(identificationImageChanged(data))
    )
  }

  const handleAddiotionalFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => dispatch(additionalImageChanged(data))
    )
  }

  const individualFirstNameKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualFirstNameKanji)
  const individualLastNameKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualLastNameKanji)
  const individualFirstNameKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualFirstNameKana)
  const individualLastNameKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualLastNameKana)
  const individualPortalCodeKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualPostalCodeKanji)
  const individualStateKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualStateKanji)
  const individualCityKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualCityKanji)
  const individualTownKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualTownKanji)
  const individualLine1Kanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualLine1Kanji)
  const individualLine2Kanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualLine2Kanji)
  const individualPorttalCodeKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualPostalCodeKana)
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

  return (
    <Form>
      <Form.Label className='mt10'>事業主様の姓（漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(individualLastNameKanjiChanged(e.target.value))}
                    value={individualLastNameKanji}></Form.Control>
      <Form.Label className='mt10'>事業主様の姓（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(individualLastNameKanaChanged(e.target.value))}
                    value={individualLastNameKana}></Form.Control>
      <Form.Label className='mt10'>事業主様のお名前（漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(individualFirstNameKanjiChanged(e.target.value))}
                    value={individualFirstNameKanji}></Form.Control>
      <Form.Label className='mt10'>事業主様のお名前（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(individualFirstNameKanaChanged(e.target.value))}
                    value={individualFirstNameKana}></Form.Control>
      <Form.Label className='mt10'>事業責任者の生年月日<RequireBadge></RequireBadge></Form.Label>
      <Form.Control type='date' onChange={(e) => dispatch(individualBirthDayChanged(e.target.value))}
                    value={individualBirthDay}></Form.Control>
      <Form.Label className='mt10'>事業責任者の姓別<RequireBadge></RequireBadge></Form.Label>
      <Form.Select onChange={(e) => dispatch(individualGenderChanged(e.target.value))}>
        <option value='male'>男</option>
        <option value='female'>女</option>
      </Form.Select>
      <Form.Label className='mt10'>事業責任者の電話番号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(individualPhoneNumberChanged(e.target.value))}
                    value={individualPhoneNumber}></Form.Control>
      <Form.Label className='mt10'>事業責任者のメールアドレス<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(individualEmailChanged(e.target.value))}
                    value={individualEmail}></Form.Control>
      <Form.Label className='mt10'>
        事業のウェブサイト<RequireBadge></RequireBadge><br/>
        Web サイトをお持ちでない場合は、ソーシャルメディアのページ、LinkedIn、またはその他の関連リンクを入力してください。
      </Form.Label>
      <Form.Control onChange={(e) => dispatch(individualBusinessUrlChanged(e.target.value))}
                    value={individualBusinessUrl}></Form.Control>
      <Form.Label className='mt10'>
        商品、サービス内容の詳細<RequireBadge></RequireBadge><br/>
        1 ～ 2 行でご説明ください。通常顧客に請求するタイミング (購入中、または 3 日後など) を必ずご記入ください。
      </Form.Label>
      <Form.Control onChange={(e) => dispatch(individualProductDescriptionChanged(e.target.value))}
                    value={individualProductDescription}
                    as='textarea'
                    rows={2}></Form.Control>
      <Form.Label className='mt10'>郵便番号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(individualPostalCodeKanjiChanged(e.target.value))}
                    type='text'
                    name='postal_code'
                    minLength={7}
                    maxLength={8}
                    pattern='\d*'
                    autoComplete='postal-code'
                    value={individualPortalCodeKanji}></Form.Control>
      <Form.Label className='mt10'>都道府県（漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control name='state'
                    autoComplete='state'
                    onChange={(e) => dispatch(individualStateKanjiChanged(e.target.value))}
                    value={individualStateKanji}></Form.Control>
      <Form.Label className='mt10'>都道府県（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control type='text'
                    name='stateKana'
                    autoComplete='stateKana'
                    onChange={(e) => dispatch(individualStateKanaChanged(e.target.value))}
                    value={individualStateKana}></Form.Control>
      <Form.Label className='mt10'>区市町村（漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control type='text'
                    name='city'
                    autoComplete='city'
                    onChange={(e) => dispatch(individualCityKanjiChanged(e.target.value))}
                    value={individualCityKanji}></Form.Control>
      <Form.Label className='mt10'>区市町村（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control type='text'
                    name='cityKana'
                    autoComplete='cityKana'
                    onChange={(e) => dispatch(individualCityKanaChanged(e.target.value))}
                    value={individualCityKana}></Form.Control>
      <Form.Label className='mt10'>町名（丁目まで、漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control type='text'
                    name='town'
                    autoComplete='town'
                    onChange={(e) => dispatch(individualTownKanjiChanged(e.target.value))}
                    value={individualTownKanji}></Form.Control>
      <Form.Label className='mt10'>町名（丁目まで、カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control type='text'
                    name='townKana'
                    autoComplete='townKana'
                    onChange={(e) => dispatch(individualTownKanaChanged(e.target.value))}
                    value={individualTownKana}></Form.Control>
      <Form.Label className='mt10'>番地、号（漢字）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control type='text'
                    name='line1'
                    autoComplete='line1'
                    onChange={(e) => dispatch(individualLine1KanjiChanged(e.target.value))}
                    value={individualLine1Kanji}></Form.Control>
      <Form.Label className='mt10'>番地、号（カナ）<RequireBadge></RequireBadge></Form.Label>
      <Form.Control type='text'
                    name='line1Kana'
                    autoComplete='line1Kana'
                    onChange={(e) => dispatch(individualLine1KanaChanged(e.target.value))}
                    value={individualLine1Kana}></Form.Control>
      <Form.Label className='mt10'>建物・部屋番号・その他 （漢字）</Form.Label>
      <Form.Control type='text'
                    name='line2'
                    autoComplete='line2'
                    onChange={(e) => dispatch(individualLine2KanjiChanged(e.target.value))}
                    value={individualLine2Kanji}></Form.Control>
      <Form.Label className='mt10'>建物・部屋番号・その他 （カナ）</Form.Label>
      <Form.Control type='text'
                    name='line2Kana'
                    autoComplete='line2Kana'
                    onChange={(e) => dispatch(individualLine2KanaChanged(e.target.value))}
                    value={individualLine2Kana}></Form.Control>

      <hr />          

      <Form.Group controlId='formFile' className='mt10'>
        <Form.Label>
          本人確認書類。以下のいずれかをアップロードしてください<RequireBadge></RequireBadge><br/>
          &emsp;1. 運転免許書<br/>
          &emsp;2. パスポート<br/>
          &emsp;3. 在留カード・特別永住者証明書<br/>
          &emsp;4. 住民票 <br/>
          &emsp;5. マイナンバーカード(顔写真入り)<br/>
        </Form.Label>
        <Form.Control type='file' onChange={handleIdentificationFile} />
      </Form.Group>

      <hr />

      <Form.Group controlId='formFile' className='mt10'>
        <Form.Label>
          公共料金の請求書など、ユーザの住所が確認できる書類を直接撮影したカラー画像。<br/>
          必須ではありませんがStripeの審査に請求される場合があります。
          </Form.Label>
        <Form.Control type='file' onChange={handleAddiotionalFile} />
      </Form.Group>

      <Card className='mt20'>
        <Card.Body>
        アップロードするファイルは以下の要件を満たしている必要があります。<br />
        &emsp;・カラー画像 (8,000 ピクセル x 8,000 ピクセル以下)<br />
        &emsp;・10 MB 以下<br />
        &emsp;・JPG または PNG 形式が使用可能<br />
        </Card.Body>
      </Card>
    </Form>
  )
}

export default StripeIndividualAccountForm
