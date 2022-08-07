import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
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
import { nameChanged,
         priceChanged,
         taxRateChanged,
         inventoryChanged,
         descriptionChanged,
         s3ObjectPublicUrlChanged } from 'redux/productSlice'

const Purchase: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const [requireAddressMessage, setRequireAddressMessage] = useState('')
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
  const [purchaseQuantities, setPurchaseQuantities] = useState(1)

  useEffect(() => {
    const fetchProduct = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/products/${router.query.id}/purchase_info`, {
          headers: {
            'Session-Id': cookies._gybuilder_end_user_session
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
        setRequireAddressMessage(response.data.require_address_message)
      })
      .catch(error => {
        dispatch(loginStatusChanged('Logout'))
        console.log(error)
      })
    }
    fetchProduct()
  }, [cookies._gybuilder_end_user_session, router.query.id, router.query.ticket_master_id, dispatch])

  const execPurchase = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/products/purchase`,
    {
      product: {
        id: router.query.id,
        purchase_quantities: purchaseQuantities
      },
    },
    {
      headers: { 
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then(response => {
      router.push(`/purchase/${response.data.order_id}/payment_complete`)
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
            'Session-Id': cookies._gybuilder_end_user_session
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
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <Card>
              <Card.Header>商品購入</Card.Header>
              <Card.Body>
                {requireAddressMessage
                && <div className='mb30 color-red'>{'購入には住所の登録が必要です。 '}
                      <br />{requireAddressMessage}
                      <br /><a href='/customer_page/mypage'>マイページ</a>から登録をお願いします。
                   </div>}
                {currentEndUserLogintStatus === 'Logout'
                  ? 
                    <>
                      <div></div>
                      <a href='/customer/login'>カスタマーアカウントでログインしてください</a><br/>
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
                                  value={purchaseQuantities}
                                  min={1}
                                  onChange={(e) => setPurchaseQuantities(Number(e.target.value))}></Form.Control>
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
                  <h4>お支払い方法</h4>
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
                    </ListGroup>
                    }
                  <div className='mt30 '>
                    <Button onClick={() => execPurchase()} disabled={inventory <= 0}>すぐに購入する</Button>
                    <Button className='ml20'
                            disabled={inventory <= 0}
                            variant='secondary'>カートに入れる</Button>
                  </div>
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
