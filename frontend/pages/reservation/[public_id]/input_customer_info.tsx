import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button, ListGroup } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { loginStatusChanged } from 'redux/currentEndUserSlice'
import { paymentMethodText } from 'functions/paymentMethodText'
import { StripePaymentMethodsParam } from 'interfaces/StripePaymentMethodsParam'
import { MultiPaymentMethod } from 'interfaces/MultiPaymentMethod'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import QuestionnaireItemAnswerForm from 'components/templates/QuestionnaireItemAnswerForm'
import { hideShareButtonChanged } from 'redux/sharedComponentSlice'
import { QuestionnaireMasterItem } from 'interfaces/QuestionnaireMasterItem'
import {  questionnaireMasterItemsChanged,
          answerChangeDetectStateChanged } from 'redux/questionnaireMasterSlice'
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
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(String(router.query.date).split('-'))
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [publishStatus, setPublishStatus] = useState('')
  const [date, setDate] = useState([])
  const [time, setTime] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [numberOfPeople, setNumberOfPeople] = useState(0)
  const [ticketMasterId, setTicketMasterId] = useState()
  const [monthlyPaymentPlanId, setMonthlyPaymentPlanId] = useState()
  const [isSetPrice, setIsSetPrice] = useState(false)
  const [isCompleteReservation, setIsCompleteReservation] = useState(false)
  const [consumeNumber, setConsumeNumber] = useState(0)
  const [multiLocalPaymentPrices, setMultiLocalPaymentPrices] = useState<MultiPaymentMethod[]>([])
  const [multiCreditCardPaymentPrices, setMultiCreditCardPaymentPrices] = useState<MultiPaymentMethod[]>([])

  const endUserLoginStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const answerChangeDetectState = useSelector((state: RootState) => state.questionnaireMaster.answerChangeDetectState)
  const disableSubmitAnswer = useSelector((state: RootState) => state.questionnaireMaster.disableSubmitAnswer)
  const answersJson = useSelector((state: RootState) => state.questionnaireMaster.answersJson)

  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [paymentMethod, setPaymentMethod] = useState('')
  const [StripePaymentMethods, setStripePaymentMethods] = useState<StripePaymentMethodsParam[]>()
  const [defaultStripePaymentMethodId, setDefaultStripePaymentMethodId] = useState('')
  const [subscribePlanIds, setSubscribePlanIds] = useState<number[]>()
  const [isSubscribePlan, setIsSubscribePlan] = useState(false)
  const [isPurchaseTicket, setIsPurchaseTicket] = useState(false)
  const [questionnaireMasterItems, setQuestionnaireMasterItems] = useState<QuestionnaireMasterItem[]>([])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/reservations/input_customer_info?reservation_public_id=${router.query.public_id}`,
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then((response) => {
      console.log(response)
      dispatch(loginStatusChanged(response.data.login_status))
      // 予約情報
      setDate(response.data.date.split("-"))
      setTime(response.data.time)
      setPublishStatus(response.data.reserve_frame.publish_status || '')
      setPaymentMethod(response.data.payment_method)
      setDefaultStripePaymentMethodId(response.data.stripe_default_payment_method_id)
      setStripePaymentMethods(response.data.stripe_payment_methods || [])
      setSubscribePlanIds(response.data.subscribe_plan_ids || [])
      setIsSubscribePlan(response.data.is_subscribe_plan || '')
      setIsPurchaseTicket(response.data.is_purchase_ticket || false)
      setNumberOfPeople(response.data.reservation.number_of_people)
      setPrice(response.data.reservation.price)
      setNumberOfPeople(response.data.reservation.number_of_people)
      setTicketMasterId(response.data.reserve_frame.ticket_master_id)
      setMonthlyPaymentPlanId(response.data.reserve_frame.monthly_payment_plan_id)
      setTitle(response.data.reserve_frame.title)
      setIsSetPrice(response.data.reserve_frame.is_set_price)
      setConsumeNumber(response.data.reservation.ticket_consume_number)
      setMultiLocalPaymentPrices(response.data.reservation.reservation_local_payment_prices)
      setMultiCreditCardPaymentPrices(response.data.reservation.reservation_credit_card_payment_prices)
      setLastName(response.data.end_user?.last_name || '')
      setFirstName(response.data.end_user?.first_name || '')
      setEmail(response.data.end_user?.email || '')
      setPhoneNumber(response.data.end_user?.phone_number || '')
      dispatch(questionnaireMasterItemsChanged(response.data.reserve_frame.parse_question_form_json))
      // ヘッダ、フッタ
      dispatch((navbarBrandTextChanged(response.data.shared_component.navbar_brand_text)))
      dispatch((navbarBrandTypeChanged(response.data.shared_component.navbar_brand_type)))
      dispatch((navbarBrandImageChanged(response.data.shared_component.navbar_brand_image_s3_object_public_url)))
      dispatch((navbarBrandImageWidthChanged(response.data.shared_component.nabvar_brand_image_width)))
      dispatch((navbarBrandImageHeightChanged(response.data.shared_component.nabvar_brand_image_height)))
      dispatch((navbarBrandBackgroundColorChanged(response.data.shared_component.navbar_brand_background_color)))
      dispatch((navbarBrandVariantColorChanged(response.data.shared_component.navbar_brand_variant_color)))
      dispatch((footerCopyRightTextChanged(response.data.shared_component.footer_copyright_text)))

    }).catch((e) => {
      console.log(e)
      dispatch(loginStatusChanged('Logout'))
    })
    dispatch(hideShareButtonChanged(true))
  }, [dispatch, cookies._square_eight_end_user_session, router.query.public_id])

  const execReserve = () => {
    setIsLoading(true)
    axios.post(`${process.env.BACKEND_URL}/api/internal/reservations/${router.query.public_id}/confirm`,
    {
      reservations: {
        public_id: router.query.public_id,
        last_name: lastName,
        first_name: firstName,
        email: email,
        phone_number: phoneNumber,
        answer: answersJson
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then(response => {
      setIsLoading(false)
      swalWithBootstrapButtons.fire({
        title: '予約しました',
        icon: 'info'
      }).then((result) => {
        router.push(`/reservation/${response.data.reservation.public_id}`)
      })
      setIsCompleteReservation(true)
    }).catch(error => {
      console.log(error.response.data.error)
      setIsLoading(false)
      swalWithBootstrapButtons.fire({
        title: error.response.data.error,
        icon: 'error'
      })
    })
  }

  const onSubmit = () => {
    // お支払い方法未設定
    if (isSetPrice) {
      execReserve()
    }
    return true
  }

  const loginValidate = () => {
    if (endUserLoginStatus === 'Logout' && ['creditCardPayment', 'ticket', 'monthlyPaymentPlan'].includes(paymentMethod)) {
      return true
    }
    return false
  }

  const reserveValidate = () => {
    if (!lastName || !firstName || !email ||!phoneNumber) {
      return true
    }
    if (disableSubmitAnswer) {
      return true
    }
    if (paymentMethod === 'creditCardPayment') {
      if (StripePaymentMethods?.length === 0) {
        return true
      }
    }
    return false
  }

  const showCustomerFormValidate = () => {
    if (['localPayment', 'creditCardPayment'].includes(String(paymentMethod) )) {
      return true
    }

    if (isSetPrice) {
      return true
    }
    return false
  }

  return (
    <>
      <MerchantCustomLayout>
        <Container className='mt30'>
          {publishStatus === 'Unpublish' &&
            <div className='text-center mt20'>非公開です</div>}
          {publishStatus === 'Publish' && <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              <Card>
                <Card.Header>お客様情報の入力</Card.Header>
                <Card.Body>
                  {loginValidate() &&<>
                  <label className='mb40'>クレジットカード支払い、回数券、月額サブスクリプションを使用する場合、ログインする必要があります</label>
                    <br />
                    <label className='mt10'>SquareEightIDをお持ちですか？ <a className='link-text' href='/customer/login' target='_blank' rel='noreferrer'>ログインする</a></label>
                    <br/>
                    <label className='mt10 mb10'>新規作成は<a className='link-text' href='/customer/signup'  target='_blank' rel='noreferrer'>こちら</a></label>
                    <br/>
                    <hr />
                  </>}
                  <h3>{title}</h3>
                  <div className='mt10 mb10'>予約時間: {date[0]}年{date[1]}月{date[2]}日 {time}</div>
                  {/* 支払い方法 */}
                  {/* 料金一律の場合 */}
                  {multiLocalPaymentPrices.length === 0 &&
                   multiCreditCardPaymentPrices.length === 0 &&
                   <>
                    {isSetPrice &&
                      <div>
                        お支払い方法: {paymentMethodText(String(paymentMethod), price, consumeNumber, numberOfPeople)}
                        {(isSubscribePlan && String(paymentMethod) === 'monthlyPaymentPlan')
                        && <span className='badge bg-info ml10'>加入済み</span>}
                      </div>}
                      {!isSubscribePlan
                      && (String(paymentMethod) === 'monthlyPaymentPlan')
                      && <div className='mt20 mb20'>プランに加入していません
                            <a href={`/monthly_payment/${monthlyPaymentPlanId}/purchase`} target='_blank' rel='noreferrer'>こちら</a>
                            から加入してください</div>}
                      {!isPurchaseTicket
                      && (String(paymentMethod) === 'ticket')
                      && <div className='mt20 mb20'>チケットを購入していません
                            <a href={`/ticket/${ticketMasterId}/purchase`} target='_blank' rel='noreferrer'>こちら</a>
                            から購入してください</div>}
                      <div className='mt10 mb10'>
                        {['localPayment', 'creditCardPayment'].includes(String(paymentMethod))
                          // 予約人数
                          &&
                          <>
                            予約人数: {numberOfPeople}
                          </>
                        }
                      </div>
                   </>}
                   {/* 複数料金設定している場合 */}
                   {/* 現地払い */}
                   {paymentMethod === 'localPayment'
                    && multiLocalPaymentPrices.length !== 0
                    &&
                      <>
                        {multiLocalPaymentPrices.map((paymentPrice, i) => {
                          return (
                            <div key={i}>{paymentPrice.name} {paymentPrice.reserve_number_of_people}人 ￥{paymentPrice.price}</div>
                          )
                        })}
                        <div>
                            合計: {multiLocalPaymentPrices.reduce(function(sum, element){ return sum + element.price}, 0)}</div>
                      </>
                   }
                   {/* クレジットカード払い */}
                   {paymentMethod === 'creditCardPayment'
                    && multiCreditCardPaymentPrices.length !== 0
                    &&
                      <>
                        {multiCreditCardPaymentPrices.map((paymentPrice, i) => {
                          return (
                            <div key={i}>{paymentPrice.name} {paymentPrice.reserve_number_of_people}人 ￥{paymentPrice.price}</div>
                          )
                        })}
                        <div>
                            合計: {multiCreditCardPaymentPrices.reduce(function(sum, element){ return sum + element.price}, 0)}</div>
                      </>
                   }
                   { (showCustomerFormValidate()) &&
                    <>
                    <hr/>
                    <Form.Label className='mt10'>お名前（姓）</Form.Label>
                    <Form.Control
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value)
                        dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))
                      }}></Form.Control>
                    <Form.Label className='mt10'>お名前（名）</Form.Label>
                    <Form.Control
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value)
                        dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))
                      }}></Form.Control>
                    <Form.Label className='mt10'>メールアドレス</Form.Label>
                    <Form.Control
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))
                      }}></Form.Control>
                    <Form.Label className='mt10'>携帯電話番号</Form.Label>
                    <Form.Control
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value)
                        dispatch(answerChangeDetectStateChanged(answerChangeDetectState + 1))
                      }}></Form.Control>
                    <QuestionnaireItemAnswerForm></QuestionnaireItemAnswerForm>
                  </>}
                  {endUserLoginStatus === 'Login' &&
                  <>
                    {
                    !StripePaymentMethods?.length &&
                    <>
                      <hr />カードが登録されていません
                      <br /><a href='/customer_page/payment_method/register' target='_blank' rel='noreferrer'>登録はこちら</a>
                    </>
                    }
                    {paymentMethod === 'creditCardPayment' &&
                      <>
                        <hr />
                        <ListGroup>
                          {StripePaymentMethods?.map((pay, i) => {
                            return (
                              <ListGroup.Item key={i}>
                                {pay.card.brand}（************{pay.card.last4} / 有効期限 {pay.card.exp_month} / {pay.card.exp_year}
                                {defaultStripePaymentMethodId === pay.id && <><br/><span className='badge bg-info'>お支払いカードに設定されています</span></>}
                              </ListGroup.Item>
                            )
                          })}
                        </ListGroup>
                      </>
                    }
                  </>
                  }
                  {!loginValidate() && !isCompleteReservation &&
                  <div className='text-center'>
                    <Button
                      disabled={reserveValidate()}
                      className='mt30'
                      onClick={onSubmit}>
                      {isLoading && <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>}
                      予約を確定する
                    </Button>
                  </div>}
                </Card.Body>
              </Card>
            </Col>
          </Row>}
        </Container>
      </MerchantCustomLayout>
    </>
  )
}

export default Index
