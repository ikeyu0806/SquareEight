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
        <div>{mccType}{mcc}</div>
        <Form.Check
          type='radio'
          label='最も人気'
          name='mccType'
          id='mccTypePopular'
          onChange={() => dispatch(mccTypeChanged('popular'))}
          checked={mccType === 'popular'} />
          {mccType === 'popular' &&
          <Form.Select
            className='ml30 mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value='5734'>ソフトウェア</option>
            <option value='5699'>衣料、アクセサリー</option>
            <option value='7392'>コンサルティングサービス</option>
          </Form.Select>}
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
        />
        <Form.Check
          type='radio'
          label='飲食業'
        />
        <Form.Check
          type='radio'
          label='プロフェッショナルサービス'
        />
        <Form.Check
          type='radio'
          label='会員制組織'
        />
        <Form.Check
          type='radio'
          label='個人向けサービス'
        />
        <Form.Check
          type='radio'
          label='運輸'
        />
        <Form.Check
          type='radio'
          label='旅行、宿泊'
        />
        <Form.Check
          type='radio'
          label='医療サービス'
        />
        <Form.Check
          type='radio'
          label='教育'
        />
        <Form.Check
          type='radio'
          label='エンターテイメント、レクリエーション'
        />
        <Form.Check
          type='radio'
          label='建築サービス'
        />
        <Form.Check
          type='radio'
          label='金融サービス'
        />
        <Form.Check
          type='radio'
          label='規制品及び年齢制限のある商品'
        />
      </div>
    </>
  )
}

export default StripeMccForm
