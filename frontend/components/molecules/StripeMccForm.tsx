import React from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { mccTypeChanged, mccChanged } from 'redux/stripeBusinessInfoSlice'


const StripeMccForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const mccType = useSelector((state: RootState) => state.stripeBusinessInfo.mccType)
  const mcc = useSelector((state: RootState) => state.stripeBusinessInfo.mcc)

  return (
    <>
      <div className='mt10'>業種を選択してください</div>
      <div className='ml20'>
        <Form.Check
          type='radio'
          label='最も人気'
          name='mccType'
          id='mccTypePopular'
          onChange={() => dispatch(mccTypeChanged('popular'))}
          checked={mccType === 'popular'} />
        <Form.Check
          type='radio'
          label='小売業'
          name='mccType'
          id='mccTypeRetail'
          onChange={() => dispatch(mccTypeChanged('retail'))}
          checked={mccType === 'retail'} />
        <Form.Check
          type='radio'
          label='デジタル製品'
          name='mccType'
          id='mccTypeDigital'
          onChange={() => dispatch(mccTypeChanged('digital'))}
          checked={mccType === 'digital'} />
        <Form.Check
          type='radio'
          label='飲食業'
          name='mccType'
          id='mccTypeFoodBusiness'
          onChange={() => dispatch(mccTypeChanged('foodBusiness'))}
          checked={mccType === 'foodBusiness'} />
        <Form.Check
          type='radio'
          label='プロフェッショナルサービス'
          name='mccType'
          id='mccTypeProfessional'
          onChange={() => dispatch(mccTypeChanged('professional'))}
          checked={mccType === 'professional'} />
        <Form.Check
          type='radio'
          label='会員制組織'
          name='mccType'
          id='mccTypeMembership'
          onChange={() => dispatch(mccTypeChanged('membership'))}
          checked={mccType === 'membership'} />
        <Form.Check
          type='radio'
          label='個人向けサービス'
          name='mccType'
          id='mccTypePersonal'
          onChange={() => dispatch(mccTypeChanged('personal'))}
          checked={mccType === 'personal'} />
        <Form.Check
          type='radio'
          label='運輸'
          name='mccType'
          id='mccTypeTransportation'
          onChange={() => dispatch(mccTypeChanged('transportation'))}
          checked={mccType === 'transportation'} />
        <Form.Check
          type='radio'
          label='旅行、宿泊'
          name='mccType'
          id='mccTypeTravel'
          onChange={() => dispatch(mccTypeChanged('travel'))}
          checked={mccType === 'travel'} />
        <Form.Check
          type='radio'
          label='医療サービス'
          name='mccType'
          id='mccTypeMedical'
          onChange={() => dispatch(mccTypeChanged('medical'))}
          checked={mccType === 'medical'} />
        <Form.Check
          type='radio'
          label='教育'
          name='mccType'
          id='mccTypeEducation'
          onChange={() => dispatch(mccTypeChanged('education'))}
          checked={mccType === 'education'} />
        <Form.Check
          type='radio'
          label='エンターテイメント、レクリエーション'
          name='mccType'
          id='mccTypeEntertainment'
          onChange={() => dispatch(mccTypeChanged('entertainment'))}
          checked={mccType === 'entertainment'} />
        <Form.Check
          type='radio'
          label='建築サービス'
          name='mccType'
          id='mccTypeConstruction'
          onChange={() => dispatch(mccTypeChanged('construction'))}
          checked={mccType === 'construction'} />
        <Form.Check
          type='radio'
          label='金融サービス'
          name='mccType'
          id='mccTypeFinancial'
          onChange={() => dispatch(mccTypeChanged('financial'))}
          checked={mccType === 'financial'} />
        <Form.Check
          type='radio'
          label='規制品及び年齢制限のある商品'
          name='mccType'
          id='mccTypeRegulated'
          onChange={() => dispatch(mccTypeChanged('regulated'))}
          checked={mccType === 'regulated'} />
        {mccType === 'popular' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value='5734'>ソフトウェア</option>
            <option value='5699'>衣料、アクセサリー</option>
            <option value='7392'>コンサルティングサービス</option>
          </Form.Select>}
      </div>
    </>
  )
}

export default StripeMccForm
