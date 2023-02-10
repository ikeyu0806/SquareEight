import React, { useState, useRef, createRef } from 'react'
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import TrashIcon from 'components/atoms/TrashIcon'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { getBase64 } from 'functions/getBase64'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { ProductType } from 'interfaces/ProductType'
import { DeliveryCharge } from 'interfaces/DeliveryCharge'
import { ShopParam } from 'interfaces/ShopParam'
import { nameChanged,
         descriptionChanged,
         base64ImageChanged,
         inventoryChanged,
         priceChanged,
         taxRateChanged,
         applyProductTypeChanged,
         productTypesChanged,
         publishStatusChanged,
         deliveryChargeTypeChanged,
         flatRateDeliveryChargeChange,
         prefectureDeliveryChargesChange,
         showProductTypeFormChanged,
         deliveryDatetimeTargetFlgChanged,
         deliveryChargeWithOrderNumberChanged,
         shopsChanged } from 'redux/productSlice'

interface Props {
  showDeleteButton?: boolean
}

const CreateProductTemplate = ({showDeleteButton}: Props): JSX.Element => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const [image, setImage] = useState('')
  const name = useSelector((state: RootState) => state.product.name)
  const price = useSelector((state: RootState) => state.product.price)
  const description = useSelector((state: RootState) => state.product.description)
  const inventory = useSelector((state: RootState) => state.product.inventory)
  const s3ObjectPublicUrl = useSelector((state: RootState) => state.product.s3ObjectPublicUrl)
  const productTypes = useSelector((state: RootState) => state.product.productTypes)
  const showProductTypeForm = useSelector((state: RootState) => state.product.showProductTypeForm)
  const productTypeNameRefs = useRef<any>([])
  productTypeNameRefs.current = productTypes.map((_, i) => productTypeNameRefs.current[i] ?? createRef())
  const productTypeInventoryRefs = useRef<any>([])
  productTypeInventoryRefs.current = productTypes.map((_, i) => productTypeInventoryRefs.current[i] ?? createRef())
  const deliveryChargeType = useSelector((state: RootState) => state.product.deliveryChargeType)
  const flatRateDeliveryCharge = useSelector((state: RootState) => state.product.flatRateDeliveryCharge)
  const prefectureDeliveryCharges = useSelector((state: RootState) => state.product.prefectureDeliveryCharges)
  const deliveryChargeWithOrderNumber = useSelector((state: RootState) => state.product.deliveryChargeWithOrderNumber)
  const deliveryDatetimeTargetFlg = useSelector((state: RootState) => state.product.deliveryDatetimeTargetFlg)
  const publishStatus = useSelector((state: RootState) => state.product.publishStatus)
  const selectedShopIds = useSelector((state: RootState) => state.product.selectedShopIds)
  const shops = useSelector((state: RootState) => state.account.shops)

  const shopRefs = useRef<any>([])
  shopRefs.current = shops.map((_, i) => shopRefs.current[i] ?? createRef())

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => dispatch(base64ImageChanged(data))
    )
  }

  const addProductTypeForm = () => {
    let updateProductTypes: ProductType[]
    updateProductTypes = []
    productTypes.map((p, i) => {
      updateProductTypes.push(p)
    })
    updateProductTypes.push({public_id: '', name: '', inventory: 0, inventory_allocation: 0})
    dispatch(productTypesChanged(updateProductTypes))
  }

  const updateProductTypeName = (event: React.ChangeEvent<HTMLInputElement>, productTypeNameRef: number) => {
    let updateProductType: ProductType
    let updateProductTypes: ProductType[]
    updateProductTypes = []
    updateProductType = {public_id: '', name: '', inventory: 0, inventory_allocation: 0}
    updateProductType.name = event.target.value
    updateProductType.inventory = productTypes[productTypeNameRef].inventory
    productTypes.map((p, i) => {
      if (i == productTypeNameRef) {
        updateProductTypes.push(updateProductType)
      } else {
        updateProductTypes.push(p)
      }
    })
    dispatch(productTypesChanged(updateProductTypes))
  }

  const updateProductTypeInventory = (event: React.ChangeEvent<HTMLInputElement>, inventoryRef: number) => {
    let updateProductType: ProductType
    let updateProductTypes: ProductType[]
    updateProductTypes = []
    updateProductType = {public_id: '', name: '', inventory: 0, inventory_allocation: 0}
    updateProductType.inventory = Number(event.target.value)
    updateProductType.name = productTypes[inventoryRef].name
    productTypes.map((p, i) => {
      if (i == inventoryRef) {
        updateProductTypes.push(updateProductType)
      } else {
        updateProductTypes.push(p)
      }
    })
    dispatch(productTypesChanged(updateProductTypes))
  }

  const deleteProductType = (formNum: number) => {
    if (productTypes.length <= 2 ) {
      dispatch(showProductTypeFormChanged(false))
      dispatch(applyProductTypeChanged(false))
      return
    }
    let updateProductTypes: ProductType[]
    updateProductTypes = []
    productTypes.map((p, i) => {
      if (i !== formNum) {
        updateProductTypes.push(p)
      }
    })
    dispatch(productTypesChanged(updateProductTypes))
  }

  const enableProductTypeForm = () => {
    dispatch(showProductTypeFormChanged(true))
    dispatch(applyProductTypeChanged(true))
  }

  const execDelete = () => {
    swalWithBootstrapButtons.fire({
      title: '削除します',
      html: `${name}を削除します。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/products/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '削除しました',
            icon: 'info'
          })
          router.push('/admin/product')
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '削除失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  const updatePrefectureDeliveryCharge = (region :string, shipping_fee: number) => {
    let updateDeliveryCharge: DeliveryCharge[] = prefectureDeliveryCharges
    updateDeliveryCharge = updateDeliveryCharge.map(
      chargeObj => chargeObj.region === region
      ?
        {region: chargeObj.region, shipping_fee: shipping_fee}
      :
        chargeObj)
    dispatch(prefectureDeliveryChargesChange(updateDeliveryCharge))
  }

  const updateShop = (shopRef: number) => {
    let updateShop: ShopParam
    let updateShops: ShopParam[]
    updateShops = []

    updateShop = Object.assign(shops[shopRef])
    shops.map((p, i) => {
      if (i == shopRef) {
        updateShops.push(updateShop)
      } else {
        updateShops.push(p)
      }
    })
    dispatch(shopsChanged(updateShops))
  }

  return (
    <>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <h4>商品作成</h4>
            <div className='mt20 mb20'>
            {showDeleteButton &&
            <Row>
              <Col sm={8}>
              <h2 className='mt30'>物販商品を作成します</h2>
              </Col>
              <Col>
                <Button variant='danger' size='sm' onClick={() => execDelete()}>商品を削除</Button>
              </Col>
            </Row>}
              <Form.Group className='mb-3'>
                <Form.Label>商品名</Form.Label>
                <Form.Control placeholder=''
                              onChange={(e) => dispatch(nameChanged(e.target.value))}
                              value={name} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label className='mt10'>商品の説明</Form.Label>
                <FormControl
                  value={description}
                  onChange={(e) => dispatch(descriptionChanged(e.target.value))}
                  as='textarea'
                  rows={20}
                  placeholder=''
                  aria-label='' />
              </Form.Group>
              {image && <img
                className='d-block w-100 mt30'
                src={image}
                alt='image'
              />}
              {s3ObjectPublicUrl && !image && <img
                className='d-block w-100 mt30'
                src={s3ObjectPublicUrl}
                alt='image'
              />}
              <Form.Group className='mb-3'>
                <Form.Label className='mt10'>イメージ画像</Form.Label>
                <Form.Control type="file" onChange={handleChangeFile} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>値段（税込）</Form.Label>
                <Row>
                  <Col>
                    <Form.Control placeholder='値段'
                                min={0}
                                onChange={(e) => dispatch(priceChanged(Number(e.target.value)))}
                                value={String(price)} />
                  </Col>
                  <Col></Col>
                </Row>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>税率</Form.Label>
                <Row>
                  <Col>
                    <Form.Select onChange={e => dispatch(taxRateChanged(Number(e.target.value)))}>
                      <option value={10}>10%（標準税率）</option>
                      <option value={8}>8%（軽減税率）</option>
                    </Form.Select>
                  </Col>
                  <Col></Col>
                </Row>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label>公開設定</Form.Label>
                    <Form.Select
                      value={publishStatus || 'Unpublish'}
                      onChange={(e) => dispatch(publishStatusChanged(e.target.value))}>
                      <option value='Unpublish'>非公開</option>
                      <option value='Publish'>公開</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                </Col>
                <Col>
                </Col>
              </Row>
              <Form.Group className='mb-3'>
                <Form.Label>在庫と種類</Form.Label>
                {!showProductTypeForm &&
                  <Row>
                    <Col>
                      <Form.Label>有効在庫数</Form.Label>
                      <Form.Control placeholder='在庫'
                                    min={0}
                                    type='number'
                                    onChange={(e) => dispatch(inventoryChanged(Number(e.target.value)))}
                                    value={String(inventory)} />                  
                      <Button
                        onClick={() => enableProductTypeForm()}
                        className='mt10 text-white'
                        variant='info text-white'>種類を追加する</Button>
                    </Col>
                    <Col></Col>
                  </Row>}
                  {showProductTypeForm &&
                    <>
                      {productTypes.map((p, i) => {
                        return (
                          <Row key={i}>
                            <Col sm={6}>
                              <Form.Label>種類</Form.Label>
                              <Form.Control
                                value={p.name}
                                onChange={(e: any) => updateProductTypeName(e, i)}
                                placeholder='Sサイズ'>
                              </Form.Control>
                            </Col>
                            <Col sm={3}>
                              <Form.Label>有効在庫数</Form.Label>
                              <Row>
                                <Col sm={10}>
                                  <Form.Control placeholder='在庫'
                                        value={p.inventory}
                                        min={0}
                                        type='number'
                                        onChange={(e: any) => updateProductTypeInventory(e, i)} />
                                </Col>
                                <Col sm={2}>
                                  <a onClick={() => deleteProductType(i)}><TrashIcon
                                    width={20}
                                    height={20}
                                    fill={'#ff0000'}></TrashIcon></a>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        )
                      })}
                      <Button
                        onClick={() => addProductTypeForm()}
                        className='mt10'
                        variant='info text-white'>種類を追加する</Button>
                    </>
                  }
                  <Col></Col>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>配送料</Form.Label>
                  <Form.Check
                    type='radio'
                    label='配送料を無料にする'
                    checked={deliveryChargeType === 'noSetting'}
                    onChange={() => dispatch(deliveryChargeTypeChanged('noSetting'))}
                    id='noDeliveryCharge'
                    name='deliveryCharge'
                  ></Form.Check>
                  <Form.Check
                    type='radio'
                    label='全国一律'
                    checked={deliveryChargeType === 'flatRate'}
                    onChange={() => dispatch(deliveryChargeTypeChanged('flatRate'))}
                    id='flatDeliveryCharge'
                    name='deliveryCharge'
                  ></Form.Check>
                  <Form.Check
                    type='radio'
                    checked={deliveryChargeType === 'perPrefectures'}
                    onChange={() => dispatch(deliveryChargeTypeChanged('perPrefectures'))}
                    label='都道府県ごとに設定する'
                    id='prefecturesDeliveryCharge'
                    name='deliveryCharge'
                  ></Form.Check>
              </Form.Group>
              {['flatRate', 'perPrefectures'].includes(deliveryChargeType) &&
              <>
                <Form.Check
                  type='radio'
                  checked={deliveryChargeWithOrderNumber === 'nationwideUniform'}
                  onChange={() => dispatch(deliveryChargeWithOrderNumberChanged('nationwideUniform'))}
                  label='注文数に関わらず一律の配送料を請求する。 配送料100円 注文数3の場合100円を顧客に請求します。'
                  id='deliveryChargeWithOrderNumberFlat'
                  name='deliveryChargeWithOrderNumber'
                >
                </Form.Check>
                <Form.Check
                  type='radio'
                  checked={deliveryChargeWithOrderNumber === 'withOrderNumber'}
                  onChange={() => dispatch(deliveryChargeWithOrderNumberChanged('withOrderNumber'))}
                  label='注文数1つごとに配送料を請求する。 配送料100円 注文数3の場合300円を顧客に請求します。'
                  id='deliveryChargeWithOrderNumber'
                  name='deliveryChargeWithOrderNumber'
                >
                </Form.Check>
              </>}
              {deliveryChargeType === 'flatRate' &&
              <>
                <Row>
                  <Col>
                    <Form.Label>配送料（円）</Form.Label>
                    <Form.Control
                      value={flatRateDeliveryCharge}
                      onChange={(e) => dispatch(flatRateDeliveryChargeChange(Number(e.target.value)))}></Form.Control>
                  </Col>
                  <Col></Col>
                </Row>
              </>}
              {deliveryChargeType === 'perPrefectures' &&
              <>
                <Row>
                  <Col>
                    {prefectureDeliveryCharges.map((prefecture, i) => {
                      return (
                        <div key={i}>
                          <Form.Label className='mt10'> {prefecture.region} 配送料（円）</Form.Label>
                          <Form.Control
                            onChange={(e) => updatePrefectureDeliveryCharge(prefecture.region, Number(e.target.value))}
                            value={prefecture.shipping_fee}
                          ></Form.Control>
                        </div>
                      )
                    })}
                  </Col>
                  <Col></Col>
                </Row>
              </>}
            </div>
            <Form.Group className='mb-3'>
              <Form.Label>配送日時</Form.Label>
              <Form.Check
                id='setDeliveryDate'
                checked={deliveryDatetimeTargetFlg}
                onChange={() => dispatch(deliveryDatetimeTargetFlgChanged(!deliveryDatetimeTargetFlg))}
                label='顧客の配送日時を受け付ける' />
              <a href='/admin/delivery_datetime'>配送日時の設定はこちら</a>
            </Form.Group>

            <Form.Group className='mb-3'>
              <div>店舗設定</div>
              <div className='mt5 mb5'>設定した店舗のページに商品ページへのリンクが表示されます。</div>
              {shops.map((shop, i) => {
                return (
                  <Form.Check
                    label={shop.name}
                    id={'shop_' + shop.public_id}
                    name={'shop_check'}
                    onChange={() => updateShop(i)}
                    defaultChecked={selectedShopIds.includes(shop.id)}
                    key={i} />
                )
              })}
            </Form.Group>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CreateProductTemplate
