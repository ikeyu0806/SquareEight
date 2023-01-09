import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import CreateDeliveryTarget from 'components/templates/CreateDeliveryTarget'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import PrefecturesChargeModal from 'components/templates/PrefecturesChargeModal'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { alertChanged } from 'redux/alertSlice'
import { loginStatusChanged, paymentMethodsChanged, defaultPaymentMethodIdChanged } from 'redux/currentEndUserSlice'
import { DeliveryTargetParam } from 'interfaces/DeliveryTargetParam'
import { redirectEndUserLoginPath } from 'functions/redirectEndUserLoginPath'
import {  lastNameChanged, firstNameChanged } from 'redux/deliveryTargetSlice'
import {  nameChanged,
          priceChanged,
          taxRateChanged,
          inventoryChanged,
          descriptionChanged,
          productTypesChanged,
          showProductTypeFormChanged,
          publishStatusChanged,
          deliveryChargeTypeChanged,
          flatRateDeliveryChargeChange,
          prefectureDeliveryChargesChange,
          showPerPrefecturesChargeModalChanged,
          s3ObjectPublicUrlChanged } from 'redux/productSlice'
import {  navbarBrandTextChanged,
          navbarBrandTypeChanged,
          navbarBrandImageChanged,
          navbarBrandImageWidthChanged,
          navbarBrandImageHeightChanged,
          navbarBrandBackgroundColorChanged,
          navbarBrandVariantColorChanged,
          footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

const Purchase: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [currentEndUserId, setCurrentEndUserId] = useState()
  const [mainImagePublicUrl, setMainImagePublicUrl] = useState('')
  const [selectedProductTypeId, setSelectedProductTypeId] = useState<number | undefined>()
  const [isRegisteredAddress, setIsRegisteredAddress] = useState(true)
  const name = useSelector((state: RootState) => state.product.name)
  const price = useSelector((state: RootState) => state.product.price)
  const taxRate = useSelector((state: RootState) => state.product.taxRate)
  const inventory = useSelector((state: RootState) => state.product.inventory)
  const description = useSelector((state: RootState) => state.product.description)
  const publishStatus = useSelector((state: RootState) => state.product.publishStatus)
  const s3ObjectPublicUrl = useSelector((state: RootState) => state.product.s3ObjectPublicUrl)
  const productTypes = useSelector((state: RootState) => state.product.productTypes)

  const deliveryChargeType = useSelector((state: RootState) => state.product.deliveryChargeType)
  const flatRateDeliveryCharge = useSelector((state: RootState) => state.product.flatRateDeliveryCharge)
  const showProductTypeForm = useSelector((state: RootState) => state.product.showProductTypeForm)
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const defaultPaymentMethodId = useSelector((state: RootState) => state.currentEndUser.defaultPaymentMethodId)
  const paymentMethods = useSelector((state: RootState) => state.currentEndUser.paymentMethods)
  const [purchaseQuantitity, setPurchaseQuantitity] = useState(1)
  const [deliveryTargets, setDeliveryTargets] = useState<DeliveryTargetParam[]>([])
  const firstName = useSelector((state: RootState) => state.deliveryTarget.firstName)
  const lastName = useSelector((state: RootState) => state.deliveryTarget.lastName)
  const postalCode = useSelector((state: RootState) => state.deliveryTarget.postalCode)
  const state = useSelector((state: RootState) => state.deliveryTarget.state)
  const city = useSelector((state: RootState) => state.deliveryTarget.city)
  const town = useSelector((state: RootState) => state.deliveryTarget.town)
  const line1 = useSelector((state: RootState) => state.deliveryTarget.line1)
  const line2 = useSelector((state: RootState) => state.deliveryTarget.line2)
  const phoneNumber = useSelector((state: RootState) => state.deliveryTarget.phoneNumber)

  useEffect(() => {
    const fetchProduct = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/products/${router.query.public_id}/purchase_info`, {
          headers: {
            'Session-Id': cookies._square_eight_end_user_session
          }
        }
      )
      .then(function (response) {
        console.log(response.data)
        dispatch(nameChanged(response.data.product.name))
        dispatch(priceChanged(response.data.product.price))
        dispatch(taxRateChanged(response.data.product.tax_rate))
        dispatch(inventoryChanged(response.data.product.inventory))
        dispatch(descriptionChanged(response.data.product.description))
        dispatch(publishStatusChanged(response.data.product.publish_status))
        dispatch(s3ObjectPublicUrlChanged(response.data.product.s3_object_public_url))
        dispatch(deliveryChargeTypeChanged(response.data.product.delivery_charge_type))
        dispatch(prefectureDeliveryChargesChange(response.data.product.shipping_fee_per_regions))
        dispatch(flatRateDeliveryChargeChange(response.data.product.flat_rate_delivery_charge))
        dispatch(defaultPaymentMethodIdChanged(response.data.default_payment_method_id))
        dispatch(paymentMethodsChanged(response.data.payment_methods))
        dispatch(loginStatusChanged(response.data.login_status))
        setCurrentEndUserId(response.data.current_end_user.id)
        setDeliveryTargets(response.data.delivery_targets)
        dispatch(productTypesChanged(response.data.product.product_types))
        dispatch(showProductTypeFormChanged(response.data.product.show_product_type_form))
        dispatch(lastNameChanged(response.data.current_end_user.last_name))
        dispatch(firstNameChanged(response.data.current_end_user.first_name))

        if (response.data.product.product_types[0]) {
          setSelectedProductTypeId(response.data.product.product_types[0].id)
        }
        setMainImagePublicUrl(response.data.main_image_public_url)
        // ヘッダ、フッタ
        dispatch((navbarBrandTextChanged(response.data.shared_component.navbar_brand_text)))
        dispatch((navbarBrandTypeChanged(response.data.shared_component.navbar_brand_type)))
        dispatch((navbarBrandImageChanged(response.data.shared_component.navbar_brand_image_s3_object_public_url)))
        dispatch((navbarBrandImageWidthChanged(response.data.shared_component.nabvar_brand_image_width)))
        dispatch((navbarBrandImageHeightChanged(response.data.shared_component.nabvar_brand_image_height)))
        dispatch((navbarBrandBackgroundColorChanged(response.data.shared_component.navbar_brand_background_color)))
        dispatch((navbarBrandVariantColorChanged(response.data.shared_component.navbar_brand_variant_color)))
        dispatch((footerCopyRightTextChanged(response.data.shared_component.footer_copyright_text)))
      })
      .catch(error => {
        dispatch(loginStatusChanged('Logout'))
        console.log(error)
      })
    }
    fetchProduct()
  }, [cookies._square_eight_end_user_session, router.query.public_id, dispatch])

  const insertCart = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/products/insert_cart`,
    {
      product: {
        public_id: router.query.public_id,
        purchase_quantity: purchaseQuantitity,
        is_registered_address: isRegisteredAddress,
        first_name: firstName,
        last_name: lastName,
        postal_code: postalCode,
        state: state,
        city: city,
        town: town,
        line1: line1,
        line2: line2,
        phone_number: phoneNumber,
        product_type_id: selectedProductTypeId
      },
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then(response => {
      router.push(`/cart`)
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  const updateDefaultCard = (payment_method_id: string) => {
    swalWithBootstrapButtons.fire({
      title: 'お支払いカードを更新します',
      text: '更新してもよろしいですか？',
      icon: 'question',
      confirmButtonText: '更新する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.BACKEND_URL}/api/internal/end_users/${payment_method_id}/update_payment_method`,
        {},
        {
          headers: {
            'Session-Id': cookies._square_eight_end_user_session
          }
        }).then(response => {
          dispatch(alertChanged({message: 'お支払いカードを変更しました', show: true}))
          location.reload()
        }).catch(error => {
          dispatch(alertChanged({message: "登録失敗しました", show: true, type: 'danger'}))
        })
      }
    })
  }

  const validateSubmit = () => {
    if (inventory <= 0) {
      return true
    }
    if (!currentEndUserLogintStatus) {
      return true
    }
    if (isRegisteredAddress && deliveryTargets.length === 0) {
      return true
    }
    if (!isRegisteredAddress) {
      if (!firstName || !lastName || !postalCode || !city || !line1) {
        return true
      }
    }
    return false
  }

  const updateDefaultDeliveryTarget = (delivery_target_id: string) => {
    swalWithBootstrapButtons.fire({
      title: 'お届け先を更新します',
      text: '更新してもよろしいですか？',
      icon: 'question',
      confirmButtonText: '更新する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.BACKEND_URL}/api/internal/delivery_targets/${delivery_target_id}/update_default`,
        {},
        {
          headers: {
            'Session-Id': cookies._square_eight_end_user_session
          }
        }).then(response => {
          dispatch(alertChanged({message: 'お支払いカードを変更しました', show: true}))
          location.reload()
        }).catch(error => {
          dispatch(alertChanged({message: "登録失敗しました", show: true, type: 'danger'}))
        })
      }
    })
  }

  return (
    <MerchantCustomLayout>
      &thinsp;
      <Container>
        {publishStatus === 'Unpublish' &&
        <div className='text-center'>非公開です</div>}
        {publishStatus === 'Publish' && 
        <Row>
          <Col lg={3} md={1}></Col>
          <Col lg={6} md={10}>
            <Card>
              <Card.Header>商品購入</Card.Header>
              <Card.Body>
                {currentEndUserLogintStatus === 'Logout'
                  ? 
                    <>
                      <a
                        className='link-text'
                        onClick={() => redirectEndUserLoginPath(router.asPath)}>SquareEightIDでログインしてください</a>
                      <br/>
                      <div className='mt20'>購入にはアカウント登録とクレジットカード登録が必要になります</div>
                      <div className='mt40'></div>
                    </>
                  : <></>
                }
                {inventory <= 0 && <div className='badge bg-danger mb10'>品切れ</div> }
                <h3>{name}</h3>
                <div className='mt10'>{price}円（税込）</div>
                <div className='mt10'>税率{taxRate}%</div>
                {deliveryChargeType === 'noSetting'
                && <div className='mt10'>配送料無料</div>}
                {deliveryChargeType === 'flatRate'
                && <div className='mt10'>配送料: ￥{flatRateDeliveryCharge}</div>}
                {deliveryChargeType === 'perPrefectures'
                && <div className='mt10'>配送料: <a href='#' onClick={() => dispatch(showPerPrefecturesChargeModalChanged(true))}>都道府県ごとに異なります</a></div>}
                <hr/>
                <div className='new-line mt20'>{description}</div>
                {showProductTypeForm &&
                <>
                  {productTypes.map((type, i) => {
                    return (
                      <Form.Check
                        key={i}
                        type='radio'
                        label={type.name}
                        name='productType'
                        id={'ProductType' + String(i)}
                        checked={type.id === selectedProductTypeId}
                        onChange={() => setSelectedProductTypeId((type.id))}
                      />
                    )
                  })}
                  <hr />
                </>}
                <Row>
                  <Col sm={2}>
                    <Form.Label>購入数量</Form.Label>
                    <Form.Control type='number'
                                  value={purchaseQuantitity}
                                  min={1}
                                  onChange={(e) => setPurchaseQuantitity(Number(e.target.value))}></Form.Control>
                  </Col>
                  <Col></Col>
                </Row>
                {mainImagePublicUrl
                && <img
                    className='d-block w-100 mt30 mb30'
                    src={mainImagePublicUrl}
                    alt='image' />}
                {currentEndUserLogintStatus === 'Logout'
                ?
                  <></>
                :
                  <>
                  <hr className='mt40' />
                  <h4 className='mt20'>お支払い方法</h4>
                  {<ListGroup>
                    {paymentMethods.map((pay, i) => {
                      return (
                        <ListGroup.Item key={i}>
                          {pay.card.brand}（************{pay.card.last4} / 有効期限 {pay.card.exp_month} / {pay.card.exp_year}
                          {defaultPaymentMethodId === pay.id && <><br/><span className='badge bg-info'>お支払いカードに設定されています</span></>}
                          {defaultPaymentMethodId !== pay.id
                            &&
                              <>
                                <br/>
                                <Button size='sm' onClick={() => updateDefaultCard(pay.id)}>お支払いカードに設定する</Button>
                              </>}
                        </ListGroup.Item>
                      )
                    })}
                   </ListGroup>}
                   <hr className='mt40' />
                  <h4 className='mt20'>お届け先</h4>
                  <Form.Check type='radio'
                              id='registeredAddress'
                              name='targetAddress'
                              defaultChecked={isRegisteredAddress}
                              onClick={() => setIsRegisteredAddress(true)}
                              label='登録住所にお届け'></Form.Check >
                  <Form.Check type='radio'
                              id='registerAddress'
                              name='targetAddress'
                              defaultChecked={!isRegisteredAddress}
                              onClick={() => setIsRegisteredAddress(false)}
                              label='新規に入力する'></Form.Check >
                  {isRegisteredAddress && currentEndUserLogintStatus === 'Login'
                   &&
                   deliveryTargets
                    &&
                    <ListGroup className='mt20'>
                      {deliveryTargets?.map((target, i) => {
                        return (
                          <ListGroup.Item key={i}>
                            〒{target.postal_code} {target.last_name}{target.first_name}<br />
                            {target.state}{target.city}{target.town}{target.line1}{target.line2}
                            {target.is_default 
                            ? <><span className='badge bg-info ml10'>お届け先に設定されています </span></>
                            : <>
                                <Button size='sm'
                                        className='ml10'
                                        onClick={() => updateDefaultDeliveryTarget(target.id)}>お届け先に設定する</Button>
                              </>}
                          </ListGroup.Item>
                        )
                      })}
                    </ListGroup>
                    }
                  {isRegisteredAddress && deliveryTargets.length === 0 && currentEndUserLogintStatus === 'Login'
                    && <div className='mb10 mt10'>お届け先が登録されていません
                      </div>}
                  {!isRegisteredAddress && currentEndUserLogintStatus === 'Login'
                    &&
                    <>
                      <div className='mt20 mb20'></div><CreateDeliveryTarget></CreateDeliveryTarget></>}
                      <Button className='mt30'
                              disabled={validateSubmit()}
                              onClick={() => insertCart()}>カートに入れる</Button>
                    </>
                }
              </Card.Body>
            </Card>
          </Col>
        </Row>}
      </Container>
      <PrefecturesChargeModal></PrefecturesChargeModal>
    </MerchantCustomLayout>
  )
}

export default Purchase
