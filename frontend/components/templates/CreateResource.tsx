import React from 'react'
import { FormControl, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { nameChanged, quantityChanged } from 'redux/resourceSlice'
import ResourceLimitAlert from 'components/molecules/ResourceLimitAlert'

const CreateResource = (): JSX.Element => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.resource.name)
  const quantity = useSelector((state: RootState) => state.resource.quantity)
  const servicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  const onChangeImage1File = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      // dispatch(shopImage1FileChanged(files[0]))
    }
  }

  return (
    <>
      <div className='text-center mt20 mb20'>
        <h3 className='mb15'>リソース登録</h3>
        <span>スタッフや設備・備品を登録して予約者数を制限することができます。</span>
      </div>  
      <Form.Label>リソース名</Form.Label>
      <FormControl
        value={name}
        onChange={(e) => dispatch(nameChanged(e.target.value))}
        placeholder=''
        aria-label='リソース名' />
      <Form.Label className='mt10'>イメージ画像</Form.Label>
      <Form.Control type='file' onChange={onChangeImage1File} />
      <Form.Label className='mt10'>予約受付数</Form.Label>
      <FormControl
        value={quantity}
        type='number'
        onChange={(e) => dispatch(quantityChanged(Number(e.target.value)))}
        placeholder=''
        aria-label='月額料金' />
      <hr />
      <div className='mt10'>種別設定</div>
      <div className='mt5 mb10'>店舗ページ、予約ページの表示に使用されます。</div>
      <Form.Select>
        <option value='staff'>スタッフ</option>
        <option value='equipment'>設備・備品</option>
      </Form.Select>
      <hr />
      <Form.Group className='mt10'>
        <div>店舗設定</div>
        <div className='mt5 mb5'>設定した店舗のページにリソース情報が表示されます。</div>
        {/* {shops.map((shop, i) => {
          return (
            <Form.Check
              label={shop.name}
              id={'shop_' + shop.public_id}
              name={'shop_check'}
              onChange={() => updateShop(i)}
              defaultChecked={selectedShopIds.includes(shop.id)}
              key={i} />
          )
        })} */}
      </Form.Group>
      <hr />
      <div>予約メニュー表示設定</div>
      <div className='mt10 mb10'>表示設定すると予約ページにリソース情報が表示されます。</div>
      <Form.Check 
        type='checkbox'
        id='showReserveFramePage'
        label='予約メニューに表示する'
      />
    </>
  )
}

export default CreateResource
