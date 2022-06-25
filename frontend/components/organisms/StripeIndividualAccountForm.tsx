import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import {  individualFirstNameKanjiChanged,
          individualLastNameKanjiChanged,
          individualFirstNameKanaChanged,
          individualBirthDayChanged,
          individualPortalCodeKanjiChanged,
          individualStateKanjiChanged,
          individualCityKanjiChanged,
          individualTownKanjiChanged,
          individualLine1KanjiChanged,
          individualLine2KanjiChanged,
          individualPorttalCodeKanaChanged,
          individualStateKanaChanged,
          individualCityKanaChanged,
          individualTownKanaChanged,
          individualLine1KanaChanged,
          individualLine2KanaChanged,
          individualPhoneNumberChanged,
          individualGenderChanged } from 'redux/stripeIndividualAccountSlice'

const StripeIndividualAccountForm = (): JSX.Element => {
  const dispatch = useDispatch()

  const individualFirstNameKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualFirstNameKanji)
  const individualLastNameKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualLastNameKanji)
  const individualFirstNameKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualFirstNameKana)
  const individualLastNameKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualLastNameKana)
  const individualPortalCodeKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualPortalCodeKanji)
  const individualStateKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualStateKanji)
  const individualCityKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualCityKanji)
  const individualTownKanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualTownKanji)
  const individualLine1Kanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualLine1Kanji)
  const individualLine2Kanji = useSelector((state: RootState) => state.stripeIndividualAccount.individualLine2Kanji)
  const individualPorttalCodeKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualPorttalCodeKana)
  const individualStateKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualStateKana)
  const individualTownKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualTownKana)
  const individualCityKana = useSelector((state: RootState) => state.stripeIndividualAccount.individualCityKana)
  const individualLine1Kana = useSelector((state: RootState) => state.stripeIndividualAccount.individualLine1Kana)
  const individualLine2Kana = useSelector((state: RootState) => state.stripeIndividualAccount.individualLine2Kana)
  const individualPhoneNumber = useSelector((state: RootState) => state.stripeIndividualAccount.individualPhoneNumber)
  const individualBirthDay = useSelector((state: RootState) => state.stripeIndividualAccount.individualBirthDay)
  const individualGender = useSelector((state: RootState) => state.stripeIndividualAccount.individualGender)

  return (
    <>
      <Form.Label className='mt10'>事業主様の姓（漢字）</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualFirstNameKanjiChanged(e.target.value))}
                    value={individualFirstNameKanji}></Form.Control>
      <Form.Label className='mt10'>事業主様の姓（カナ）</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualLastNameKanjiChanged(e.target.value))}
                    value={individualFirstNameKanji}></Form.Control>
      <Form.Label className='mt10'>事業主様のお名前（漢字）</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualFirstNameKanaChanged(e.target.value))}
                    value={individualLastNameKanji}></Form.Control>
      <Form.Label className='mt10'>事業主様のお名前（カナ）</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualFirstNameKanjiChanged(e.target.value))}
                    value={individualLastNameKana}></Form.Control>
      <Form.Label className='mt10'>事業責任者の生年月日</Form.Label>
      <Form.Control type='date' onChange={(e) => dispatch(individualBirthDayChanged(e.target.value))}
                    value={individualBirthDay}></Form.Control>
      <Form.Label className='mt10'>事業責任者の姓別</Form.Label>
      <Form.Select onChange={(e) => dispatch(individualGenderChanged(e.target.value))}>
        <option value='man'>男</option>
        <option value='woman'>女</option>
      </Form.Select>
      <Form.Label className='mt10'>事業責任者の電話番号</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualPhoneNumberChanged(e.target.value))}
                    value={individualPhoneNumber}></Form.Control>
      <Form.Label className='mt10'>郵便番号</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualPortalCodeKanjiChanged(e.target.value))}
                    value={individualPortalCodeKanji}></Form.Control>
      <Form.Label className='mt10'>都道府県（漢字）</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualStateKanjiChanged(e.target.value))}
                    value={individualStateKanji}></Form.Control>
      <Form.Label className='mt10'>都道府県（カナ）</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualStateKanaChanged(e.target.value))}
                    value={individualStateKana}></Form.Control>
      <Form.Label className='mt10'>区市町村（漢字）</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualCityKanjiChanged(e.target.value))}
                    value={individualCityKanji}></Form.Control>
      <Form.Label className='mt10'>区市町村（カナ）</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualCityKanaChanged(e.target.value))}
                    value={individualCityKana}></Form.Control>
      <Form.Label className='mt10'>町名（丁目まで、漢字）</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualTownKanjiChanged(e.target.value))}
                    value={individualTownKanji}></Form.Control>
      <Form.Label className='mt10'>町名（丁目まで、カナ）</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualTownKanaChanged(e.target.value))}
                    value={individualTownKana}></Form.Control>
      <Form.Label className='mt10'>番地、号（漢字）</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualLine1KanjiChanged(e.target.value))}
                    value={individualLine1Kanji}></Form.Control>
      <Form.Label className='mt10'>番地、号（カナ）</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualLine1KanaChanged(e.target.value))}
                    value={individualLine1Kana}></Form.Control>
      <Form.Label className='mt10'>建物・部屋番号・その他 （漢字）</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualLine2KanjiChanged(e.target.value))}
                    value={individualLine2Kanji}></Form.Control>
      <Form.Label className='mt10'>建物・部屋番号・その他 （カナ）</Form.Label>
      <Form.Control onChange={(e) => dispatch(individualLine2KanaChanged(e.target.value))}
                    value={individualLine2Kana}></Form.Control>
    </>
  )
}

export default StripeIndividualAccountForm
