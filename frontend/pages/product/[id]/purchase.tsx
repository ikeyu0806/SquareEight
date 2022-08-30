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
import { ProductParam } from 'interfaces/ProductParam'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { alertChanged } from 'redux/alertSlice'
import { loginStatusChanged, paymentMethodsChanged, defaultPaymentMethodIdChanged } from 'redux/currentEndUserSlice'
import { DeliveryTargetParam } from 'interfaces/DeliveryTargetParam'
import { nameChanged,
         priceChanged,
         taxRateChanged,
         inventoryChanged,
         descriptionChanged,
         s3ObjectPublicUrlChanged } from 'redux/productSlice'

const Purchase: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [currentEndUserId, setCurrentEndUserId] = useState()
  const [isRegisteredAddress, setIsRegisteredAddress] = useState(true)
  const name = useSelector((state: RootState) => state.product.name)
  const price = useSelector((state: RootState) => state.product.price)
  const taxRate = useSelector((state: RootState) => state.product.taxRate)
  const inventory = useSelector((state: RootState) => state.product.inventory)
  const description = useSelector((state: RootState) => state.product.description)
  const s3ObjectPublicUrl = useSelector((state: RootState) => state.product.s3ObjectPublicUrl)
  const productTypes = useSelector((state: RootState) => state.product.productTypes)
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
        `${process.env.BACKEND_URL}/api/internal/products/${router.query.id}/purchase_info`, {
          headers: {
            'Session-Id': cookies._square_eight_end_user_session
          }
        }
      )
      .then(function (response) {
        const productResponse: ProductParam = response.data.product
        dispatch(nameChanged(productResponse.name))
        dispatch(priceChanged(productResponse.price))
        dispatch(taxRateChanged(productResponse.tax_rate))
        dispatch(inventoryChanged(productResponse.inventory))
        dispatch(descriptionChanged(productResponse.description))
        dispatch(s3ObjectPublicUrlChanged(productResponse.s3_object_public_url))
        dispatch(defaultPaymentMethodIdChanged(response.data.default_payment_method_id))
        dispatch(paymentMethodsChanged(response.data.payment_methods))
        dispatch(loginStatusChanged(response.data.login_status))
        setCurrentEndUserId(response.data.current_end_user_id)
        setDeliveryTargets(response.data.delivery_targets)
      })
      .catch(error => {
        dispatch(loginStatusChanged('Logout'))
        console.log(error)
      })
    }
    fetchProduct()
  }, [cookies._square_eight_end_user_session, router.query.id, router.query.ticket_master_id, dispatch])

  const insertCart = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/products/insert_cart`,
    {
      product: {
        id: router.query.id,
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
        phone_number: phoneNumber
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
    if (!currentEndUserLogintStatus) {
      return true
    }
    if (isRegisteredAddress && deliveryTargets.length === 0) {
      return true
    }
    if (isRegisteredAddress && (!firstName || !lastName || !postalCode || !state || !city || !line1)) {
      return true
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
      <Container>
        <Row>
          <Col lg={3} md={1}></Col>
          <Col lg={6} md={10}>
            <Card>
              <Card.Header>商品購入</Card.Header>
              <Card.Body>
                {currentEndUserLogintStatus === 'Logout'
                  ? 
                    <>
                      <div></div>
                      <a href='/customer/login' target='_blank' rel='noreferrer'>カスタマーアカウントでログインしてください</a><br/>
                      <div className='mt20'>購入にはアカウント登録とクレジットカード登録が必要になります</div>
                      <div className='mt40'></div>
                    </>
                  : <></>
                }
                {inventory <= 0 && <div className='badge bg-danger mb10'>品切れ</div> }
                <h3>{name}</h3>
                <div className='mt10'>{price}円（税込）</div>
                <div className='mt10'>税率{taxRate}%</div>
                <div className='mt10'>{description}</div>
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
                {s3ObjectPublicUrl
                && <img
                    className='d-block w-100 mt30 mb30'
                    src={s3ObjectPublicUrl}
                    alt='image' />}
                {currentEndUserLogintStatus === 'Logout'
                ?
                  <></>
                :
                  <>
                  <hr className='mt40' />
                  <h4 className='mt20'>お支払い方法</h4>
                  {<ListGroup>
                      {paymentMethods?.map((pay, i) => {
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
                              checked={isRegisteredAddress}
                              onClick={() => setIsRegisteredAddress(true)}
                              label='登録住所にお届け'></Form.Check >
                  <Form.Check type='radio'
                              checked={!isRegisteredAddress}
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
                    && <><div className='mt20 mb20'></div><CreateDeliveryTarget></CreateDeliveryTarget></>}
                    <Button className='mt30'
                            disabled={validateSubmit()}
                            onClick={() => insertCart()}>カートに入れる</Button>
                  </>
                }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MerchantCustomLayout>
  )
}

export default Purchase
