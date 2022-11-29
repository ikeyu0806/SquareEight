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
      <div className='mt10'>業種のカテゴリを選択してください</div>
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
      </div>
      <div>業種を選択してください</div>
        {mccType === 'popular' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value='5734'>ソフトウェア</option>
            <option value='5699'>衣料、アクセサリー</option>
            <option value='7392'>コンサルティングサービス</option>
          </Form.Select>}
        {mccType === 'retail' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value='5699'>衣料、アクセサリー</option>
            <option value='5499'>コンビニエンスストア</option>
            <option value='5977'>美容商品</option>
            <option value='5712'>インテリア及び家具</option>
            <option value='7629'>家電</option>
            <option value='5533'>自動車部品及び付属品</option>
            <option value='5932'>宝石店、腕時計、掛け時計/置き時計、銀器の店</option>
            <option value='5944'>貴石、貴金属、時計、宝石</option>
            <option value='5999'>その他の販売業</option>
          </Form.Select>}
        {mccType === 'digital' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value='5734'>ソフトウェアサービス（Saas）</option>
            <option value='5817'>アプリ</option>
            <option value='5815'>書籍、映画、音楽のデジタルメディア</option>
            <option value='5816'>ゲーム</option>
            <option value='5734'>ブログ及び記事</option>
            <option value='5734'>その他のデジタルサービス</option>
          </Form.Select>}
        {mccType === 'foodBusiness' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value='5812'>飲食店</option>
            <option value='5411'>食料品店</option>
            <option value='5812'>ケータリング</option>
            <option value='5499'>その他の飲食業</option>
          </Form.Select>}
        {mccType === 'professional' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value='7392'>コンサルティング</option>
            <option value='2741'>印刷および出版</option>
            <option value='8111'>弁護士・法律事務所</option>
            {/* <option value=''>破産サービス</option> */}
            <option value='9223'>ベイルボンド</option>
            <option value='8931'>会計、監査、税務サービス</option>
            <option value='7379'>コンピュータ修理</option>
            <option value='8734'>試験研究所</option>
            <option value='5511'>自動車サービス</option>
            <option value='7512'>レンタカー</option>
            <option value='5511'>自動車販売</option>
            {/* <option value=''>リードジェネレーション</option> */}
            <option value='5969'>ダイレクトマーケティング</option>
            {/* <option value=''>ライフライン設備</option> */}
            <option value='9399'>官公庁</option>
            <option value='5967'>テレマーケティング</option>
            {/* <option value=''>クレジットカウンセリングまたは信用回復</option> */}
            {/* <option value=''>住宅ローンコンサルティングサービス</option> */}
            {/* <option value=''>債務削減サービス</option> */}
            <option value='6399'>保証サービス</option>
            <option value='5969'>その他のマーケティングサービス</option>
            <option value='7299'>その他のビジネスサービス</option>
          </Form.Select>}
        {mccType === 'membership' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value='8641'>市民、友愛または社会団体</option>
            <option value='8398'>慈善または社会福祉団体</option>
            <option value='8661'>宗教団体</option>
            {/* <option value=''>カントリークラブ</option> */}
            {/* <option value=''>その他</option> */}
          </Form.Select>}
        {mccType === 'personal' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value='7221'>写真スタジオ</option>
            {/* <option value=''>ヘルスおよびエスティックサロン</option> */}
            <option value='7230'>美容室、床屋</option>
            <option value='780'>造園業</option>
            <option value='7297'>マッサージパーラー</option>
            <option value='7277'>カウンセリングサービス</option>
            {/* <option value=''>ヘルス&ウェルネスコーチング</option> */}
            <option value='7210'>ランドリーまたはクリーニング</option>
            <option value='7273'>デート/エスコートサービス</option>
            <option value='7399'>その他の個人向けサービス</option>
          </Form.Select>}
        {mccType === '' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value=''></option>
            <option value=''></option>
            <option value=''></option>
          </Form.Select>}
        {mccType === '' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value=''></option>
            <option value=''></option>
            <option value=''></option>
          </Form.Select>}
          {mccType === '' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value=''></option>
            <option value=''></option>
            <option value=''></option>
          </Form.Select>}
          {mccType === '' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value=''></option>
            <option value=''></option>
            <option value=''></option>
          </Form.Select>}
          {mccType === '' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value=''></option>
            <option value=''></option>
            <option value=''></option>
          </Form.Select>}
          {mccType === '' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value=''></option>
            <option value=''></option>
            <option value=''></option>
          </Form.Select>}
          {mccType === '' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value=''></option>
            <option value=''></option>
            <option value=''></option>
          </Form.Select>}
          {mccType === '' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value=''></option>
            <option value=''></option>
            <option value=''></option>
          </Form.Select>}
          {mccType === '' &&
          <Form.Select
            className='mt10 mb10'
            onChange={(e) => dispatch(mccChanged(e.target.value))}>
            <option value=''></option>
            <option value=''></option>
            <option value=''></option>
          </Form.Select>}
    </>
  )
}

export default StripeMccForm
