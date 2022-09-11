import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Card, ListGroup, Button, Form} from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import axios from 'axios'
import { DeliveryTargetParam } from 'interfaces/DeliveryTargetParam'
import { CartItemParam } from 'interfaces/CartItemsParam'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import { paymentMethodsChanged, defaultPaymentMethodIdChanged } from 'redux/currentEndUserSlice'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { alertChanged } from 'redux/alertSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isRequireDeliveryTargets, setIsRequireDeliveryTargets] = useState(false)
  const [currentEndUserId, setCurrentEndUserId] = useState()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [totalPrice, setTotalPrice] = useState(0)
  const [cartItems, setCartItems] = useState<CartItemParam[]>()
  const [isRegisteredAddress, setIsRegisteredAddress] = useState(true)
  const paymentMethods = useSelector((state: RootState) => state.currentEndUser.paymentMethods)
  const [deliveryTargets, setDeliveryTargets] = useState<DeliveryTargetParam[]>([])
  const defaultPaymentMethodId = useSelector((state: RootState) => state.currentEndUser.defaultPaymentMethodId)

  useEffect(() => {
    const fetchProduct = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/cash_registers`, {
          headers: {
            'Session-Id': cookies._square_eight_end_user_session
          }
        }
      )
      .then(function (response) {
        setIsRegisteredAddress(response.data.is_require_delivery_targets)
        setCurrentEndUserId(response.data.current_end_user_id)
        setTotalPrice(response.data.total_price)
        setCartItems(response.data.cart_items)
        setIsRequireDeliveryTargets(response.data.is_require_delivery_targets)
        dispatch(defaultPaymentMethodIdChanged(response.data.default_payment_method_id))
        dispatch(paymentMethodsChanged(response.data.payment_methods))
        setDeliveryTargets(response.data.delivery_targets)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchProduct()
  }, [cookies._square_eight_end_user_session, dispatch])

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

  const execPurchase = () => {
    setIsLoading(true)
    axios.post(`${process.env.BACKEND_URL}/api/internal/cash_registers/purchase`,
    {},
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '購入しました', show: true}))
      setIsLoading(false)
      router.push(`/purchase/${response.data.order_id}/payment_complete`)
    }).catch(error => {
      console.log(error.response.data.error)
      dispatch(alertChanged({message: error.response.data.error, show: true, type: 'danger'}))
      setIsLoading(false)
    })
  }

  return (
    <EndUserLoginLayout>
      <Container>
        <Row>
          <Col lg={2} md={1}></Col>
          <Col lg={5} md={6}>
            <Card>
              <Card.Header>レジ</Card.Header>
              <Card.Body>
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
                  {isRegisteredAddress &&  <>
                  <hr className='mt40' />
                  <h4 className='mt20'>お届け先</h4>
                  <Form.Check type='radio'
                              checked={isRegisteredAddress}
                              onClick={() => setIsRegisteredAddress(true)}
                              label='登録住所にお届け'></Form.Check >
                  <Form.Check type='radio'
                              checked={!isRegisteredAddress}
                              onClick={() => setIsRegisteredAddress(false)}
                              label='新規に入力する'></Form.Check ></>}
                  {isRegisteredAddress && deliveryTargets && isRequireDeliveryTargets
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
                    {!deliveryTargets && isRequireDeliveryTargets
                      && <div className='mb30 mt20'>お届け先が登録されていません
                          <br /><a href={`/customer_page/user/${currentEndUserId}/edit`}>ユーザ編集</a>から登録をお願いします。
                        </div>}
                    <hr className='mt40'></hr>
                    <h4 className='mt20'>購入内容を確認</h4>
                  {cartItems && cartItems?.map((item, i) => {
                    {
                      switch (item.type) {
                        case 'Product':
                          return(
                            <>
                              <ListGroup.Item key={i}>
                                <Row>
                                  {item.s3_object_public_url && <Col><img
                                      className='d-block w-100 mt30'
                                      src={item.s3_object_public_url}
                                      alt='image'/></Col>}
                                  <Col>
                                    {item.business_name}<br/>
                                    {item.product_name}<br />
                                    {item.show_type && <>{item.selected_type_name}<br/></>}
                                    数量: {item.quantity}<br />
                                    ￥{item.price} 税率{item.tax_rate}%
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            </>)
                        case 'TicketMaster':
                          return (
                            <>
                              <ListGroup.Item key={i}>
                                <Row>
                                  {item.s3_object_public_url && <Col><img
                                      className='d-block w-100'
                                      src={item.s3_object_public_url}
                                      alt='image'/></Col>}
                                  <Col>
                                    {item.business_name}<br/>
                                    {item.product_name} 有効期限: {item.is_expired === false ? `${item.effective_month}ヶ月` : '有効期限なし'} <br />
                                    数量: {item.quantity}<br />
                                    ￥{item.price}
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            </>
                          )
                          case 'MonthlyPaymentPlan':
                            return (
                              <>
                                <ListGroup.Item key={i}>
                                  <Row>
                                    {item.s3_object_public_url && <Col><img
                                        className='d-block w-100'
                                        src={item.s3_object_public_url}
                                        alt='image'/></Col>}
                                    <Col>
                                      {item.business_name}<br/>
                                      {item.product_name}<br />
                                      ￥{item.price}
                                    </Col>
                                  </Row>
                                </ListGroup.Item>
                              </>
                            )
                        default:
                          return (<></>)
                      }
                    }
                  })}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={5}>
            <Card>
              <Card.Body>
                <h3>ご請求額: ￥{totalPrice}</h3>
                <Button className='mt10' onClick={() => execPurchase()}>
                  {isLoading && <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>}
                  注文を確定
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </EndUserLoginLayout>
  )
}

export default Index
