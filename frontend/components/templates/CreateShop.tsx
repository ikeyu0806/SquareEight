import React from 'react'
import { FormControl, Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import RequireBadge from 'components/atoms/RequireBadge'
import { nameChanged,
         description1Changed,
         description2Changed,
         postalCodeChanged,
         stateChanged,
         cityChanged,
         townChanged,
         line1Changed,
         line2Changed,
         accessInfoChanged,
         parkingLotDisplayStatusChanged,
         remarksChanged,
         pageCoverSlide1s3ObjectPublicUrlChanged,
         pageCoverSlide2s3ObjectPublicUrlChanged,
         pageCoverSlide3s3ObjectPublicUrlChanged,
         brandImage3s3ObjectPublicUrlChanged,
         shopImage13s3ObjectPublicUrlChanged,
         shopImage23s3ObjectPublicUrlChanged,
         shopImage33s3ObjectPublicUrlChanged,
         businessTypeChanged } from 'redux/shopSlice'

const CreateShop = (): JSX.Element => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.shop.name)
  const description1 = useSelector((state: RootState) => state.shop.description1)
  const description2 =  useSelector((state: RootState) => state.shop.description2)
  const postalCode =  useSelector((state: RootState) => state.shop.postalCode)
  const state =  useSelector((state: RootState) => state.shop.state)
  const city =  useSelector((state: RootState) => state.shop.city)
  const town =  useSelector((state: RootState) => state.shop.town)
  const line1 =  useSelector((state: RootState) => state.shop.line1)
  const line2 =  useSelector((state: RootState) => state.shop.line2)
  const accessInfo =  useSelector((state: RootState) => state.shop.accessInfo)
  const parkingLotDisplayStatus =  useSelector((state: RootState) => state.shop.parkingLotDisplayStatus)
  const remarks =  useSelector((state: RootState) => state.shop.remarks)
  const pageCoverSlide1s3ObjectPublicUrl =  useSelector((state: RootState) => state.shop.pageCoverSlide1s3ObjectPublicUrl)
  const pageCoverSlide2s3ObjectPublicUrl =  useSelector((state: RootState) => state.shop.pageCoverSlide2s3ObjectPublicUrl)
  const pageCoverSlide3s3ObjectPublicUrl =  useSelector((state: RootState) => state.shop.pageCoverSlide3s3ObjectPublicUrl)
  const brandImage3s3ObjectPublicUrl =  useSelector((state: RootState) => state.shop.brandImage3s3ObjectPublicUrl)
  const shopImage13s3ObjectPublicUrl =  useSelector((state: RootState) => state.shop.shopImage13s3ObjectPublicUrl)
  const shopImage23s3ObjectPublicUrl =  useSelector((state: RootState) => state.shop.shopImage23s3ObjectPublicUrl)
  const shopImage33s3ObjectPublicUrl =  useSelector((state: RootState) => state.shop.shopImage33s3ObjectPublicUrl)
  const businessType =  useSelector((state: RootState) => state.shop.businessType)

  return (
    <>
        <h3 className='mb15'>店舗情報登録</h3>
        <div>登録した情報を元に店舗紹介ページが自動生成されます。</div>
        <div className='mt10'>未設定の項目はページに表示されません。</div>
        <div className='mt10'>店舗紹介ページには登録した商品。予約メニュー、回数券、月額課金の紹介とWebページのリンクも挿入されます。</div>
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
      <Form.Label className='mt10'>店舗説明1</Form.Label>
      <FormControl />
      <Form.Label className='mt10'>店舗説明2</Form.Label>
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
