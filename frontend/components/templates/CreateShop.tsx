import React from 'react'
import { FormControl, Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import RequireBadge from 'components/atoms/RequireBadge'
import { nameChanged, quantityChanged } from 'redux/resourceSlice'
import ResourceLimitAlert from 'components/molecules/ResourceLimitAlert'

const CreateShop = (): JSX.Element => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.resource.name)
  const quantity = useSelector((state: RootState) => state.resource.quantity)
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  return (
    <>
        <h3 className='mb15'>店舗情報登録</h3>
        <div>登録した情報を元に店舗紹介ページが自動生成されます。</div>
        <div className='mt5'>店舗紹介ページには登録した商品。予約メニュー、回数券、月額課金の紹介とWebページのリンクも挿入されます。</div>
        <Row>
          <Col>
            <Button className='mt10 mb10 text-white' variant='info'>店舗紹介ページのデモを表示</Button>
          </Col>
          <Col>
            <Button className='mt10 mb10 text-white' variant='info'>店舗紹介ページのプレビューを表示</Button>
          </Col>
        </Row>
        <hr />
      <Form.Label>店舗名<RequireBadge /></Form.Label>
      <FormControl />
      <Form.Label className='mt10'>店舗説明</Form.Label>
      <FormControl />
      <Form.Label className='mt10'>店舗備考</Form.Label>
      <FormControl />
      <hr />
      <div>住所</div>
      <Form.Label className='mt10'>都道府県</Form.Label>
      <FormControl />
      <Form.Label className='mt10'>区市町村</Form.Label>
      <FormControl />
      <Form.Label className='mt10'>町名（丁目まで）</Form.Label>
      <FormControl />
      <Form.Label className='mt10'>番地、号</Form.Label>
      <FormControl />
      <Form.Label className='mt10'>建物・部屋番号・その他</Form.Label>
      <FormControl />
      <Form.Label className='mt10'>アクセス情報</Form.Label>
      <FormControl placeholder='〇〇駅〇〇口から徒歩5分など' />
      <hr />
      <Form.Label className='mt10'>カバー画像1</Form.Label>
      <Form.Control type='file' />
      <Form.Label className='mt10'>カバー画像2</Form.Label>
      <Form.Control type='file' />
      <Form.Label className='mt10'>カバー画像3</Form.Label>
      <Form.Control type='file' />
      <hr />
      <Form.Label className='mt10'>店舗イメージ画像1</Form.Label>
      <Form.Control type='file' />
      <Form.Label className='mt10'>店舗イメージ画像2</Form.Label>
      <Form.Control type='file' />
      <Form.Label className='mt10'>店舗イメージ画像3</Form.Label>
      <Form.Control type='file' />
    </>
  )
}

export default CreateShop
