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
  const [isSelectDeliveryDatetime, setIsSelectDeliveryDatetime] = useState(false)
  const [isRequireDeliveryTargets, setIsRequireDeliveryTargets] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [currentEndUserId, setCurrentEndUserId] = useState()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [totalPrice, setTotalPrice] = useState(0)
  const [cartItems, setCartItems] = useState<CartItemParam[]>()
  const [includeNoRemainingInventory, setIncludeNoRemainingInventory] = useState(false)
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
        console.log(response)
        setIsRegisteredAddress(response.data.is_require_delivery_targets)
        setCurrentEndUserId(response.data.current_end_user_id)
        setTotalPrice(response.data.total_price)
        setCartItems(response.data.cart_items)
        setIsRequireDeliveryTargets(response.data.is_require_delivery_targets)
        dispatch(defaultPaymentMethodIdChanged(response.data.default_payment_method_id))
        dispatch(paymentMethodsChanged(response.data.payment_methods))
        setDeliveryTargets(response.data.delivery_targets)
        setIncludeNoRemainingInventory(response.data.include_no_remaining_inventory)
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
    {
      cash_register: {
        delivery_date_text: isSelectDeliveryDatetime ? selectedDate + selectedTime : '指定なし'
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '購入しました', show: true}))
      setIsLoading(false)
      router.push(`/purchase/${response.data.order_public_id}/payment_complete`)
    }).catch(error => {
      console.log(error.response.data.error)
      dispatch(alertChanged({message: error.response.data.error, show: true, type: 'danger'}))
      setIsLoading(false)
    })
  }

  const validateOnSubmit = () => {
    if (!defaultPaymentMethodId) {
      return true
    }
    if (includeNoRemainingInventory) {
      return true
    }
    return false
  }

  const deleteCartItem = (publicId: string, itemType: string) => {
    axios.delete(`${process.env.BACKEND_URL}/api/internal/carts/delete_cart_item/${publicId}?item_type=${itemType}`,
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then(response => {
      location.reload()
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '削除失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <EndUserLoginLayout>
      <div className='bg-lightgray'>
        <Container>
          <Row>
            <Col lg={2} md={1}></Col>
            <Col lg={5} md={6}>
              <Card className='mt30 mb30'>
                <Card.Body>
                <p><span className='orange_highlighter font-size-25 mt30 mb30'>ご注文内容</span></p>
                    <h4 className='mt20'>お支払い方法</h4>
                    {paymentMethods.length === 0 &&
                    <>
                      クレジットカードが登録されていません。<br />
                      <a  href='/customer_page/payment_method/register'
                          target='_blank' rel='noreferrer'>こちらから登録お願いします。</a>
                    </>}
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
                    {isRegisteredAddress && deliveryTargets && isRequireDeliveryTargets
                      &&
                      <ListGroup className='mt20'>
                        <hr/>
                        <h4>お届け先</h4>
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
                        switch (item.item_type) {
                          case 'Product':
                            return(
                              <ListGroup.Item key={i}>
                                <Row>
                                  {item.s3_object_public_url && <Col><img
                                      className='d-block w-100 mt30'
                                      src={item.s3_object_public_url}
                                      alt='image'/></Col>}
                                  <Col>
                                    {item.business_name}<br/>
                                    {item.product_name} {item.product_type_name}
                                    {item.remaining_inventory <= 0
                                    && <>&nbsp;<div className='badge bg-danger mb10'>品切れ</div></> }<br />
                                    {item.show_type && <>{item.selected_type_name}<br/></>}
                                    数量: {item.quantity}<br />
                                    ￥{item.price}
                                    {item.show_type && <>{item.selected_type_name}<br/></>}
                                    {item.delivery_charge_type === 'noSetting'
                                    && <div className='mt10'>配送料無料</div>}
                                    {['flatRate', 'perPrefectures'].includes(item.delivery_charge_type)
                                    && <div className='mt10'>配送料: ￥{item.delivery_charge}</div>}
                                  </Col>
                                  <Col>
                                    {item.delivery_datetime_target_flg
                                    &&
                                    item.shippable_date.length > 0
                                    &&
                                    item.shippable_time.length > 0
                                    &&
                                    <>
                                      <div>配送日時</div>
                                      <Form.Check
                                        label='指定しない'
                                        id='noSetDeliveryDate'
                                        name='setDeliveryDate'
                                        checked={isSelectDeliveryDatetime === false}
                                        onChange={() => setIsSelectDeliveryDatetime(false)}
                                        type='radio'></Form.Check>
                                      <Form.Check
                                        label='指定する'
                                        id='setDeliveryDate'
                                        name='setDeliveryDate'
                                        onChange={() =>
                                          {
                                            setIsSelectDeliveryDatetime(true)
                                            if (selectedDate == '') { setSelectedDate(item.shippable_date[0]) }
                                            if (selectedTime == '') { setSelectedTime(item.shippable_time[0]) }
                                          }
                                        }
                                        checked={isSelectDeliveryDatetime === true}
                                        type='radio'></Form.Check>
                                      {isSelectDeliveryDatetime
                                      &&
                                      <>
                                        <div className='mt10'>日にちを選択してください</div>
                                        {item.shippable_date.map((date, i) => {
                                          return (
                                            <Form.Check
                                              type='radio'
                                              key={i}
                                              checked={selectedDate === date}
                                              onChange={() => setSelectedDate(date)}
                                              className='ml20'
                                              label={date}
                                              id={'shippableDate' + i}
                                              name='shippableDate'
                                            >
                                            </Form.Check>
                                          )
                                        })}
                                        <div className='mt10'>時間を選択してください</div>
                                        {item.shippable_time.map((time, i) => {
                                          return (
                                            <Form.Check
                                              type='radio'
                                              key={i}
                                              checked={selectedTime === time}
                                              onChange={() => setSelectedTime(time)}
                                              className='ml20'
                                              label={time}
                                              id={'shippableTime' + i}
                                              name='shippableTime'
                                            >
                                            </Form.Check>
                                          )
                                        })}
                                      </>}
                                    </>}
                                    <Button
                                      onClick={() => deleteCartItem(item.public_id, item.item_type)}
                                      className='mt10'
                                      size='sm'
                                      variant='danger'>
                                      カートから削除
                                    </Button>
                                  </Col>
                                </Row>
                                <hr />
                              </ListGroup.Item>
                              )
                          case 'TicketMaster':
                            return (
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
                                  <Col>
                                    <Button
                                      onClick={() => deleteCartItem(item.public_id, item.item_type)}
                                      className='mt60'
                                      size='sm'
                                      variant='danger'>
                                      カートから削除
                                    </Button>
                                  </Col>
                                </Row>
                                <hr />
                              </ListGroup.Item>
                            )
                            case 'MonthlyPaymentPlan':
                              return (
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
                                    <Col>
                                      <Button
                                        onClick={() => deleteCartItem(item.public_id, item.item_type)}
                                        className='mt60'
                                        size='sm'
                                        variant='danger'>
                                        カートから削除
                                      </Button>
                                    </Col>
                                  </Row>
                                  <hr />
                                </ListGroup.Item>
                              )
                          default:
                            return (<></>)
                        }
                      }
                    })}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={5}>
              <Card className='mt30 mb30'>
                <Card.Body>
                  <h3>ご請求額: ￥{totalPrice}</h3>
                  <Button
                    disabled={validateOnSubmit()}
                    className='mt10'
                    onClick={() => execPurchase()}>
                    {isLoading && <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>}
                    注文を確定
                  </Button>
                  {includeNoRemainingInventory && <div className='mt20'>在庫切れの商品が含まれています</div>}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </EndUserLoginLayout>
  )
}

export default Index
