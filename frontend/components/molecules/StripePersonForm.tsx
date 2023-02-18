import React, { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import RequireBadge from 'components/atoms/RequireBadge'
import { RootState } from 'redux/store'
import { getBase64 } from 'functions/getBase64'
import StripeFileRequirement from './StripeFileRequirement'
import {  representativeLastNameKanjiChanged,
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
          identificationImageChanged,
          isDirectorChanged,
          isExecutiveChanged,
          isOwnerChanged,
          percentOwnershipChanged,
          relationshipTitleChanged
        } from 'redux/stripeCompanyAccountSlice'


const StripePersonForm = () => {
  const dispatch = useDispatch()

  const [isImageSizeOver, setIsImageSizeOver] = useState(false)
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
  const representativeVerificationStatus = useSelector((state: RootState) => state.stripeCompanyAccount.representativeVerificationStatus)
  const isDirector = useSelector((state: RootState) => state.stripeCompanyAccount.isDirector)
  const isExecutive = useSelector((state: RootState) => state.stripeCompanyAccount.isExecutive)
  const isOwner = useSelector((state: RootState) => state.stripeCompanyAccount.isOwner)
  const percentOwnership = useSelector((state: RootState) => state.stripeCompanyAccount.percentOwnership)
  const relationshipTitle = useSelector((state: RootState) => state.stripeCompanyAccount.relationshipTitle)

  const [image, setImage] = useState('')
  

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    if (files[0].size >= 10000000) { setIsImageSizeOver(true) }
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => dispatch(identificationImageChanged(data))
    )
  }

  return (
    <>
      <Row>
        <Col>
          <Form.Label className='mt10'>姓（漢字）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control onChange={(e) => dispatch(representativeLastNameKanjiChanged(e.target.value))}
                        value={representativeLastNameKanji}></Form.Control>
        </Col>
        <Col>
          <Form.Label className='mt10'>お名前（漢字）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control onChange={(e) => dispatch(representativeFirstNameKanjiChanged(e.target.value))}
                        value={representativeFirstNameKanji}></Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label className='mt10'>姓（カナ）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control onChange={(e) => dispatch(representativeLastNameKanaChanged(e.target.value))}
                        value={representativeLastNameKana}></Form.Control>        
        </Col>
        <Col>
          <Form.Label className='mt10'>お名前（カナ）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control onChange={(e) => dispatch(representativeFirstNameKanaChanged(e.target.value))}
                        value={representativeFirstNameKana}></Form.Control>        
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Label className='mt10'>生年月日<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='date' onChange={(e) => dispatch(representativeBirthDayChanged(e.target.value))}
                        value={representativeBirthDay}></Form.Control>
        </Col>
        <Col>
          <Form.Label className='mt10'>姓別<RequireBadge></RequireBadge></Form.Label>
          <Form.Select onChange={(e) => dispatch(representativeGenderChanged(e.target.value))}>
            <option value='male'>男</option>
            <option value='female'>女</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label className='mt10'>メールアドレス<RequireBadge></RequireBadge></Form.Label>
          <Form.Control onChange={(e) => dispatch(representativeEmailChanged(e.target.value))}
                        value={representativeEmail}></Form.Control>
        </Col>
        <Col>
          <Form.Label className='mt10'>電話番号<RequireBadge></RequireBadge></Form.Label>
          <Form.Control onChange={(e) => dispatch(representativePhoneNumberChanged(e.target.value))}
                        value={representativePhoneNumber}></Form.Control>
        </Col>
      </Row>
      <hr />
      <Form.Label className='mt10'>自宅住所・郵便番号<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(representativeAddressPostalCodeChanged(e.target.value))}
                    type='text'
                    name='postal_code'
                    minLength={7}
                    maxLength={8}
                    pattern='\d*'
                    autoComplete='postal-code'
                    value={representativeAddressPostalCode}></Form.Control>
      <hr />
      <div>住所（漢字）</div>
      <Row>
        <Col>
          <Form.Label className='mt10'>自宅住所・都道府県（漢字）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control name='state'
                        autoComplete='state'
                        onChange={(e) => dispatch(representativeAddressStateKanjiChanged(e.target.value))}
                        value={representativeAddressStateKanji}></Form.Control>
        </Col>
        <Col>
          <Form.Label className='mt10'>自宅住所・区市町村（漢字）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='text'
                        name='city'
                        autoComplete='city'
                        onChange={(e) => dispatch(representativeAddressCityKanjiChanged(e.target.value))}
                        value={representativeAddressCityKanji}></Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label className='mt10'>自宅住所・町名（丁目まで、漢字）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='text'
                        name='town'
                        autoComplete='town'
                        onChange={(e) => dispatch(representativeAddressTownKanjiChanged(e.target.value))}
                        value={representativeAddressTownKanji}></Form.Control>
        </Col>
        <Col>
          <Form.Label className='mt10'>自宅住所・番地、号（漢字）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='text'
                        name='line1'
                        autoComplete='line1'
                        onChange={(e) => dispatch(representativeAddressLine1KanjiChanged(e.target.value))}
                        value={representativeAddressLine1Kanji}></Form.Control>
        </Col>
      </Row>
      <Form.Label className='mt10'>自宅住所・建物、部屋番号、その他（漢字）</Form.Label>
      <Form.Control type='text'
                    name='line2'
                    autoComplete='line2'
                    onChange={(e) => dispatch(representativeAddressLine2KanjiChanged(e.target.value))}
                    value={representativeAddressLine2Kanji ?? ''}></Form.Control>
      <hr />
      <div>住所（カナ）</div>
      <Row>
        <Col>
          <Form.Label className='mt10'>自宅住所・都道府県（カナ）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='text'
                        name='stateKana'
                        autoComplete='stateKana'
                        onChange={(e) => dispatch(representativeAddressStateKanaChanged(e.target.value))}
                        value={representativeAddressStateKana}></Form.Control>
        </Col>
        <Col>
          <Form.Label className='mt10'>自宅住所・区市町村（カナ）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='text'
                        name='cityKana'
                        autoComplete='cityKana'
                        onChange={(e) => dispatch(representativeAddressCityKanaChanged(e.target.value))}
                        value={representativeAddressCityKana}></Form.Control>        
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label className='mt10'>自宅住所・町名（丁目まで、カナ）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='text'
                        name='townKana'
                        autoComplete='townKana'
                        onChange={(e) => dispatch(representativeAddressTownKanaChanged(e.target.value))}
                        value={representativeAddressTownKana}></Form.Control>        
        </Col>
        <Col>
          <Form.Label className='mt10'>自宅住所・番地、号（カナ）<RequireBadge></RequireBadge></Form.Label>
          <Form.Control type='text'
                        name='line1Kana'
                        autoComplete='line1Kana'
                        onChange={(e) => dispatch(representativeAddressLine1KanaChanged(e.target.value))}
                        value={representativeAddressLine1Kana}></Form.Control>
        </Col>
      </Row>
      <Form.Label className='mt10'>自宅住所・建物、部屋番号、その他（カナ）</Form.Label>
      <Form.Control type='text'
                    name='line2Kana'
                    autoComplete='line2Kana'
                    onChange={(e) => dispatch(representativeAddressLine2KanaChanged(e.target.value))}
                    value={representativeAddressLine2Kana ?? ''}></Form.Control>
      <hr />
      <Form.Label className='mt10'>役職。CEOなど<RequireBadge></RequireBadge></Form.Label>
      <Form.Control onChange={(e) => dispatch(relationshipTitleChanged(e.target.value))}
                    value={relationshipTitle}></Form.Control>
      {/* 以下Optionalなので一旦コメントアウト。Stripeに要求されそうならコメント外す */}
      {/* <Form.Check
        className='mt20'
        label='この人は会社の25%以上を所有しています。'
        id='isOwnerCheck'
        defaultChecked={isOwner}
        onChange={() => dispatch(isOwnerChanged(!isOwner))}
      ></Form.Check>
      <Form.Check
        className='mt20'
        label='この人物は会社の取締役会のメンバーです。'
        id='isDirectorCheck'
        defaultChecked={isDirector}
        onChange={() => dispatch(isDirectorChanged(!isDirector))}
      ></Form.Check>
      <Form.Check
        className='mt20'
        label='この人物は会社の経営に重大な責任を負うエグゼクティブまたはシニアマネージャーです。'
        id='isExecutiveCheck'
        defaultChecked={isExecutive}
        onChange={() => dispatch(isExecutiveChanged(!isExecutive))}
      ></Form.Check>
      <Form.Label className='mt10'>ビジネスの所有率（%）</Form.Label>
      <Row>
        <Col>
          <Form.Control
            min={0}
            max={100}
            value={percentOwnership}
            onChange={(e) => dispatch(percentOwnershipChanged(Number(e.target.value)))}
            type='number'></Form.Control>
        </Col>
        <Col></Col>
      </Row> */}
      <>
        <hr />
          <Form.Group controlId='formFile' className='mt20'>
            <Form.Label>
              本人確認書類{representativeVerificationStatus === 'verified' && <span className='ml10 badge bg-info'>提出済み</span>}<br/>
              <StripeFileRequirement></StripeFileRequirement>
              <div className='mt20 mb20'>以下のいずれかをアップロードしてください</div>
              &emsp;1. 運転免許書<br/>
              &emsp;2. パスポート<br/>
              &emsp;3. 外国国籍を持つ方の場合は在留カード<br/>
              &emsp;4. 住基カード(顔写真入り)<br/>
              &emsp;5. マイナンバーカード(顔写真入り)<br />
            </Form.Label>
            {isImageSizeOver && <div className='color-red'>画像のサイズが10MBを超えています</div>}
            <Form.Control type='file' onChange={handleChangeFile} />
          </Form.Group>
          <hr />
        </>
    </>
  )
}

export default StripePersonForm
