import React, { useEffect, useState, useRef, createRef } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'
import { ReserveFramePaymentMethodParam } from 'interfaces/ReserveFramePaymentMethodParam'
import { useRouter } from 'next/router'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import { hideShareButtonChanged } from 'redux/sharedComponentSlice'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useCookies } from 'react-cookie'
import { MultiPaymentMethod } from 'interfaces/MultiPaymentMethod'
import { multiLocalPaymentPricesChanged, multiCreditCardPaymentPricesChanged } from 'redux/reserveFrameSlice'
import {  navbarBrandTextChanged,
          navbarBrandTypeChanged,
          navbarBrandImageChanged,
          navbarBrandImageWidthChanged,
          navbarBrandImageHeightChanged,
          navbarBrandBackgroundColorChanged,
          navbarBrandVariantColorChanged,
          footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

const Index: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [mainImagePublicUrl, setMainImagePublicUrl] = useState('')
  const [selectedDate] = useState(String(router.query.date).split('-'))
  const [selectedTime, setSelectedTime] = useState('')
  const [reserveCount, setReserveCount] = useState(1)
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [selectedConsumeNumber, setSelectedConsumeNumber] = useState(0)
  // localPayment, creditCardPayment, ticket, monthlyPaymentPlanのいずれかを設定
  const [selectedPaymentMethodType, setSelectedPaymentMethodType] = useState('')
  const [selectedTicketId, setSelectedTicketId] = useState(0)
  const [selectedMonthlyPaymentPlanId, setSelectedMonthlyPaymentPlanId] = useState(0)
  const [reserveFrame, setReserveFrame] = useState<ReserveFrameParam>()
  const [reserveFramePaymentMethod, setReserveFramePaymentMethod] = useState<ReserveFramePaymentMethodParam>()

  const multiLocalPaymentPrices = useSelector((state: RootState) => state.reserveFrame.multiLocalPaymentPrices)
  const multiCreditCardPaymentPrices = useSelector((state: RootState) => state.reserveFrame.multiCreditCardPaymentPrices)
  const multiLocalPaymentNameRefs = useRef<any>([])
  multiLocalPaymentNameRefs.current = multiLocalPaymentPrices.map((_, i) => multiLocalPaymentNameRefs.current[i] ?? createRef())
  const multiCreditCardPaymentPriceRefs = useRef<any>([])
  multiCreditCardPaymentPriceRefs.current = multiCreditCardPaymentPrices.map((_, i) => multiCreditCardPaymentPriceRefs.current[i] ?? createRef())

  useEffect(() => {
    const fetchReserveFrame = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames/${router.query.reserve_frame_id}`
      )
      .then(function (response) {
        const reserveFrameResponse: ReserveFrameParam = response.data.reserve_frame
        setReserveFrame(reserveFrameResponse)
        setReserveFramePaymentMethod(response.data.reserve_frame.payment_methods)
        const times_values = reserveFrameResponse?.reserve_frame_reception_times_values[0]
        setSelectedTime(times_values?.reception_start_time + '-' + times_values?.reception_end_time)
        dispatch(multiLocalPaymentPricesChanged(response.data.reserve_frame.local_payment_prices_with_number_of_people))
        dispatch(multiCreditCardPaymentPricesChanged(response.data.reserve_frame.credit_card_payment_prices_with_number_of_people))
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
        console.log(error)
      })
    }
    fetchReserveFrame()
    dispatch(hideShareButtonChanged(true))
  }, [router.query.reserve_frame_id, dispatch])

  const validateOnSubmit = () => {
    if (reserveFrame?.is_set_price && selectedPaymentMethodType === '') {
      return true
    }
    return false
  }

  const updateMultiLocalPaymentNumberOfPeople = (event: React.ChangeEvent<HTMLInputElement>, localPaymentPriceRef: number) => {
    let updateLocalPaymentPrice: MultiPaymentMethod
    let updateLocalPaymentPrices: MultiPaymentMethod[]
    updateLocalPaymentPrices = []
    updateLocalPaymentPrice = {name: '', price: 0}
    updateLocalPaymentPrice.reserve_number_of_people = Number(event.target.value)
    updateLocalPaymentPrice.name = multiLocalPaymentPrices[localPaymentPriceRef].name
    updateLocalPaymentPrice.price = multiLocalPaymentPrices[localPaymentPriceRef].price
    multiLocalPaymentPrices.map((p, i) => {
      if (i == localPaymentPriceRef) {
        updateLocalPaymentPrices.push(updateLocalPaymentPrice)
      } else {
        updateLocalPaymentPrices.push(p)
      }
    })
    dispatch(multiLocalPaymentPricesChanged(updateLocalPaymentPrices))
  }

  const updateMultiCreditCardPaymentNumberOfPeople = (event: React.ChangeEvent<HTMLInputElement>, creditCardPaymentPriceRef: number) => {
    let updateCreditCardPaymentPrice: MultiPaymentMethod
    let updateCreditCardPaymentPrices: MultiPaymentMethod[]
    updateCreditCardPaymentPrices = []
    updateCreditCardPaymentPrice = {name: '', price: 0}
    updateCreditCardPaymentPrice.reserve_number_of_people = Number(event.target.value)
    updateCreditCardPaymentPrice.name = multiCreditCardPaymentPrices[creditCardPaymentPriceRef].name
    updateCreditCardPaymentPrice.price = multiCreditCardPaymentPrices[creditCardPaymentPriceRef].price
    multiCreditCardPaymentPrices.map((p, i) => {
      if (i == creditCardPaymentPriceRef) {
        updateCreditCardPaymentPrices.push(updateCreditCardPaymentPrice)
      } else {
        updateCreditCardPaymentPrices.push(p)
      }
    })
    dispatch(multiCreditCardPaymentPricesChanged(updateCreditCardPaymentPrices))
  }

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/reservations/insert_time_payment_method`,
    {
      reservations: {
        reserve_frame_id: router.query.reserve_frame_id,
        reservation_date: router.query.date,
        time: selectedTime,
        payment_method: selectedPaymentMethodType,
        ticket_master_id: selectedTicketId,
        monthly_payment_plan_id: selectedMonthlyPaymentPlanId,
        reserve_count: reserveCount,
        price: selectedPrice,
        consume_number: selectedConsumeNumber,
        multi_local_payment_prices: multiLocalPaymentPrices,
        multi_credit_card_payment_prices: multiCreditCardPaymentPrices
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then(response => {
      router.push(`/reservation/${response.data.reservation.id}/input_customer_info`)
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '予約失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <MerchantCustomLayout>
      <Container>
        {reserveFrame?.publish_status === 'Unpublish' &&
          <div className='text-center mt20'>非公開です</div>}
        {reserveFrame?.publish_status === 'Publish' &&
        <Row className='mt20'>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <Card className='mt30'>
              <Card.Body>
                <h3>{reserveFrame?.title}</h3>
                {reserveFrame?.reception_type === 'Temporary'
                && <>
                    <div className='mt20 mb20'>
                      <div className='mb10'>こちらは仮予約です</div>
                      <div>予約後に運営者が承認するまで確定されません</div>
                    </div>
                   </>}
                {reserveFrame?.reception_type === 'PhoneOnly'
                 && <>
                      <div className='mt20 mb20'>
                        <div className='mb10'>電話でのみ予約受付しています</div>
                        <div>受付電話番号: {reserveFrame.reception_phone_number}</div>
                      </div>
                    </>}
                <div>{reserveFrame?.description}</div>
                {mainImagePublicUrl
                && <img
                    className='d-block w-100 mt30 mb30'
                    src={mainImagePublicUrl}
                    alt='image' />}
                <hr />
                <div className='mb20'>
                  {reserveFrame?.reception_type === 'PhoneOnly'
                   ? <>予約可能時間</>
                   : <>予約時間を選択してください</>}
                </div>
                <div className='mb20'>{selectedDate[0]}年{selectedDate[1]}月{selectedDate[2]}日</div>
                <Row>
                  <Col>
                    <Form.Select onChange={(e) => setSelectedTime(e.target.value)}>
                    {reserveFrame?.reserve_frame_reception_times_values?.map((time, i) => {
                      return (
                        <option key={i}
                                value={time.reception_start_time + '-' + time.reception_end_time}>{time.reception_start_time}-{time.reception_end_time}</option>
                      )
                    })}
                  </Form.Select>
                  </Col>
                  <Col></Col>
                </Row>
                {reserveFrame?.is_set_price &&
                <>
                  {reserveFrame?.reception_type !== 'PhoneOnly' &&
                  <><hr /><div className='mb20'>お支払い方法を選択してください</div>
                  {reserveFramePaymentMethod?.local_payment_price !== undefined
                    &&
                    <>
                      <Form.Check
                          type='radio'
                          id='local_payment_check'
                          checked={selectedPaymentMethodType === 'localPayment'}
                          onChange={() => {
                            setSelectedPaymentMethodType('localPayment')
                            setSelectedPrice(Number(reserveFramePaymentMethod?.local_payment_price))
                          }}
                          label={`現地払い: ${reserveFramePaymentMethod?.local_payment_price}円`}></Form.Check>
                      {((selectedPaymentMethodType === 'localPayment') && (reserveFrame?.reserve_frame_local_payment_prices.length !== 0)) &&
                      <>
                        &emsp;
                        <div className='ml30 mb30'>予約人数を入力してください</div>
                        {multiLocalPaymentPrices.map((p, i) => {
                          return (
                            <div key={i} className='ml30'>
                              <Row>
                                <Col sm={3}><div>{p.name + ': ¥' + p.price}</div></Col>
                              </Row>
                              <Row>
                                <Col sm={4}>
                                  <Form.Label className='mt10'>人数</Form.Label>
                                  <Form.Control
                                    onChange={(e: any) => updateMultiLocalPaymentNumberOfPeople(e, i)}
                                    value={p.reserve_number_of_people}
                                    type='number'></Form.Control>
                                </Col>
                                <Col sm={3}></Col>
                              </Row>
                              <hr/>
                            </div>
                          )
                        })}
                      </>}
                    </>
                  }
                  {reserveFramePaymentMethod?.credit_card_payment_price !== undefined
                  &&
                  <>
                    <Form.Check
                      type='radio'
                      id='credit_card_payment_check'
                      checked={selectedPaymentMethodType === 'creditCardPayment'}
                      onChange={() => {
                        setSelectedPaymentMethodType('creditCardPayment')
                        setSelectedPrice(Number(reserveFramePaymentMethod?.credit_card_payment_price))
                      }}
                      label={`クレジットカード払い: ${reserveFramePaymentMethod?.credit_card_payment_price}円`}></Form.Check>
                    {((selectedPaymentMethodType === 'creditCardPayment') && (reserveFrame?.reserve_frame_credit_card_payment_prices.length !== 0)) &&
                      <>
                        &emsp;
                        <div className='ml30 mb30'>予約人数を入力してください</div>
                        {multiCreditCardPaymentPrices.map((p, i) => {
                          return (
                            <div key={i} className='ml30'>
                              <Row>
                                <Col sm={3}><div>{p.name + ': ¥' + p.price}</div></Col>
                              </Row>
                              <Row>
                                <Col sm={4}>
                                  <Form.Label className='mt10'>人数</Form.Label>
                                  <Form.Control
                                    onChange={(e: any) => updateMultiCreditCardPaymentNumberOfPeople(e, i)}
                                    type='number'></Form.Control>
                                </Col>
                                <Col sm={3}></Col>
                              </Row>
                              <hr/>
                            </div>
                          )
                        })}
                      </>}
                  </>}
                  {reserveFramePaymentMethod?.enable_monthly_payment_plans
                    && reserveFramePaymentMethod?.enable_monthly_payment_plans.map((plan, i) => {
                    return (
                      <>
                        <Form.Check
                          type='radio'
                          checked={selectedPaymentMethodType === 'monthlyPaymentPlan' && selectedMonthlyPaymentPlanId === plan.id}
                          onChange={() => {
                            setSelectedMonthlyPaymentPlanId(plan.id)
                            setSelectedPaymentMethodType('monthlyPaymentPlan')
                          }}
                          id={`monthly_plan_payment_${i}`}
                          label={`月額課金: ${plan.monthly_payment_plan_name}`}></Form.Check>
                      </>
                    )
                  })}
                  {reserveFramePaymentMethod?.enable_tickets
                    && reserveFramePaymentMethod?.enable_tickets.map((ticket, i) => {
                    return (
                      <>
                        <Form.Check
                          type='radio'
                          checked={(selectedPaymentMethodType === 'ticket') && (selectedTicketId === ticket.id)}
                          onChange={() => {
                            setSelectedTicketId(ticket.id)
                            setSelectedConsumeNumber(ticket.consume_number)
                            setSelectedPaymentMethodType('ticket')
                          }}
                          id={`ticket_payment_${i}`}
                          label={`${ticket.ticket_name} 消費枚数: ${ticket.consume_number}枚`}></Form.Check>
                      </>
                    )
                  })}
                </>}
                { (String(selectedPaymentMethodType) === 'localPayment' &&
                  !reserveFrame?.reserve_frame_local_payment_prices.length) ||
                  (String(selectedPaymentMethodType) === 'creditCardPayment' &&
                  !reserveFrame?.reserve_frame_credit_card_payment_prices.length)
                  &&
                  <>
                    <hr />
                    <div className='mb20'>人数を入力してください</div>
                    <Row>
                      <Col sm={3}>
                        <Form.Control
                          onChange={(e) => setReserveCount(Number(e.target.value))}
                          value={reserveCount}
                          type='number'></Form.Control>
                      </Col>
                      <Col></Col>
                    </Row>
                  </>
                }</>}
                {reserveFrame?.reception_type !== 'PhoneOnly'
                 && <div className='text-center'>
                  <Button
                    className='mt20'
                    disabled={validateOnSubmit()}
                    onClick={() => onSubmit()}>
                    予約を進める
                  </Button>
                </div>}
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>}
      </Container>
    </MerchantCustomLayout>
  )
}

export default Index
