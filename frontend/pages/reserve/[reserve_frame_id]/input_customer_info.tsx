import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button, ListGroup } from 'react-bootstrap'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { useRouter } from 'next/router'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { loginStatusChanged } from 'redux/currentEndUserSlice'
import { paymentMethodText } from 'functions/paymentMethodText'
import { StripePaymentMethodsParam } from 'interfaces/StripePaymentMethodsParam'
import { StripeSubscriptionsParam } from 'interfaces/StripeSubscriptionsParam'
import { alertChanged } from 'redux/alertSlice'

const Index: NextPage = () => {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(String(router.query.date).split('-'))
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const endUserLoginStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const [paymentMethods, setPaymentMethods] = useState<StripePaymentMethodsParam[]>()
  const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState('')
  const [subscribePlanIds, setSubscribePlanIds] = useState<number[]>()
  const [isSubscribePlan, setIsSubscribePlan] = useState(false)
  const [isPurchaseTicket, setIsPurchaseTicket] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_users/current_end_user_as_customer_info?monthly_payment_plan_id=${router.query.monthly_payment_plan_id}&ticket_id=${router.query.ticket_id}`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then((response) => {
      console.log(response.data)
      dispatch(loginStatusChanged('Login'))
      setDefaultPaymentMethodId(response.data.default_payment_method_id)
      setPaymentMethods(response.data.payment_methods)
      setSubscribePlanIds(response.data.subscribe_plan_ids)
      setIsSubscribePlan(response.data.is_subscribe_plan)
      setIsPurchaseTicket(response.data.is_purchase_ticket)
      setLastName(response.data.end_user.last_name)
      setFirstName(response.data.end_user.first_name)
      setEmail(response.data.end_user.email)
      setPhoneNumber(response.data.end_user.phone_number)
    }).catch((e) => {
      dispatch(loginStatusChanged('Logout'))
    })
  }, [dispatch, cookies._gybuilder_end_user_session, endUserLoginStatus, router.query.monthly_payment_plan_id, router.query.ticket_id])

  const execReserve = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/reservations`,
    {
      reservations: {
        last_name: router.query.last_name,
        first_name: router.query.first_name,
        email: router.query.email,
        phone_number: router.query.phone_number,
        reserve_frame_id: router.query.reserve_frame_id,
        date: router.query.date,
        time: router.query.time,
        payment_method: router.query.payment_method,
        price: router.query.price,
        consume_number: router.query.consume_number,
        reserve_count: router.query.reserve_count,
        ticket_id: router.query.ticket_id,
        monthly_payment_plan_id: router.query.monthly_payment_plan_id
      }
    },
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '予約しました', show: true}))
    }).catch(error => {
    })
  }

  const onSubmit = () => {
    const requireParam = `?title=${router.query.title}&date=${router.query.date}&time=${router.query.time}&payment_method=${router.query.payment_method}&reserve_count=${router.query.reserve_count}&last_name=${lastName}&first_name=${firstName}&email=${email}&phone_number=${phoneNumber}`
    switch(router.query.payment_method) {
      case 'localPayment':
        router.push(`/reserve/${router.query.reserve_frame_id}/confirm${requireParam}&price=${router.query.price}`)
        return
      case 'creditCardPayment':
      case 'ticket':
      case 'monthlyPaymentPlan':
        execReserve()
        return
      default:
        return true
    }
  }

  const loginValidate = () => {
    if (endUserLoginStatus === 'Logout' && ['creditCardPayment', 'ticket', 'monthlyPaymentPlan'].includes(String(router.query.payment_method))) {
      return true
    }
    return false
  }

  return (
    <>
      <WithoutSessionLayout>
        <Container className='mt30'>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              <Card>
                <Card.Header>お客様情報の入力</Card.Header>
                <Card.Body>
                  {loginValidate() &&<>
                  <label className='mb40'>クレジットカード支払い、回数券、月額課金を使用する場合、ログインする必要があります</label>
                    <br />
                    <label className='mt10'>カスタマーアカウントをお持ちですか？ <a className='link-text' href='/customer/login' target='_blank' rel='noreferrer'>ログインする</a></label>
                    <br/>
                    <label className='mt10 mb10'>新規作成は<a className='link-text' href='/customer/signup'  target='_blank' rel='noreferrer'>こちら</a></label>
                    <br/>
                    <hr />
                  </>}
                  <h3>{router.query.title}</h3>
                  <div className='mt10 mb10'>予約時間: {selectedDate[0]}年{selectedDate[1]}月{selectedDate[2]}日 {router.query.time}</div>
                  <div>
                    お支払い方法: {paymentMethodText(String(router.query.payment_method), Number(router.query.price), Number(router.query.consume_number), Number(router.query.reserve_count))}
                    {isSubscribePlan && <span className='badge bg-info ml10'>加入済み</span>}
                  </div>
                  {!isSubscribePlan
                   && (String(router.query.payment_method) === 'monthlyPaymentPlan')
                   && <div className='mt20 mb20'>プランに加入していません
                        <a href={`/monthly_payment/${router.query.monthly_payment_plan_id}/purchase`} target='_blank' rel='noreferrer'>こちら</a>
                        から加入してください</div>}
                  {!isPurchaseTicket
                   && (String(router.query.payment_method) === 'ticket')
                   && <div className='mt20 mb20'>チケットを購入していません
                        <a href={`/ticket/${router.query.ticket_id}/purchase`} target='_blank' rel='noreferrer'>こちら</a>
                        から購入してください</div>}
                  <div className='mt10 mb10'>{['localPayment', 'creditCardPayment'].includes(String(router.query.payment_method)) && <>予約人数: {router.query.reserve_count}</>}</div>
                  { String(router.query.payment_method) === 'localPayment' &&
                  <>
                    <hr/>
                    <Form.Label className='mt10'>お名前（姓）</Form.Label>
                    <Form.Control
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}></Form.Control>
                    <Form.Label className='mt10'>お名前（名）</Form.Label>
                    <Form.Control
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                    <Form.Label className='mt10'>メールアドレス</Form.Label>
                    <Form.Control
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    <Form.Label className='mt10'>携帯電話番号</Form.Label>
                    <Form.Control
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}></Form.Control>
                  </>}
                  {endUserLoginStatus === 'Login' &&
                  <>
                    {
                    !paymentMethods?.length && <> <hr />カードが登録されていません</>
                    }
                    {router.query.payment_method === 'creditCardPayment' &&
                      <>
                        <hr />
                        <ListGroup>
                          {paymentMethods?.map((pay, i) => {
                            return (
                              <ListGroup.Item key={i}>
                                {pay.card.brand}（************{pay.card.last4} / 有効期限 {pay.card.exp_month} / {pay.card.exp_year}
                                {defaultPaymentMethodId === pay.id && <><br/><span className='badge bg-info'>お支払いカードに設定されています</span></>}
                              </ListGroup.Item>
                            )
                          })}
                        </ListGroup>
                      </>
                    }
                  </>
                  }
                  {!loginValidate() &&
                  <div className='text-center'>
                    <Button className='mt30' onClick={onSubmit}>
                      {String(router.query.payment_method) === 'localPayment' ? '確認画面に進む' : '予約を確定する'}
                    </Button>
                  </div>}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </WithoutSessionLayout>
    </>
  )
}

export default Index
