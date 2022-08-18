import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { useRouter } from 'next/router'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { loginStatusChanged } from 'redux/currentEndUserSlice'
import { paymentMethodText } from 'functions/paymentMethodText'

const Index: NextPage = () => {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(String(router.query.date).split('-'))
  const endUserLoginStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_user/sessions`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then((res) => {
      dispatch(loginStatusChanged('Login'))
    }).catch((e) => {
      dispatch(loginStatusChanged('Logout'))
    })
  }, [dispatch, cookies._gybuilder_end_user_session, endUserLoginStatus])

  const onClickLoginLink= () => {
    localStorage.setItem('endUserOnLoginRedirectPath', `/reserve/${router.query.reserve_frame_id}/input_customer_info`)
    router.push('/customer/login')
  }

  const onClickSignupLink = () => {
    localStorage.setItem('endUserOnLoginRedirectPath', `/reserve/${router.query.reserve_frame_id}/input_customer_info`)
    router.push('/customer/signup')
  }


  const onClickNextLink = () => {
    router.push(`/reserve/${router.query.reserve_frame_id}/confirm`)
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
                    <label className='mt10'>カスタマーアカウントをお持ちですか？ <a className='link-text' onClick={onClickLoginLink}>ログインする</a></label>
                    <br/>
                    <label className='mt10 mb10'>新規作成は<a className='link-text' onClick={onClickSignupLink}>こちら</a></label>
                    <br/>
                    <hr />
                  </>}
                  <h3>{router.query.title}</h3>
                  <div className='mt10 mb10'>予約時間: {selectedDate[0]}年{selectedDate[1]}月{selectedDate[2]}日 {router.query.time}</div>
                  <div>お支払い方法: {paymentMethodText(String(router.query.payment_method), Number(router.query.price), Number(router.query.consume_number), Number(router.query.reserve_count))}</div>
                  <div className='mt10 mb10'>{['localPayment', 'creditCardPayment'].includes(String(router.query.payment_method)) && <>予約人数: {router.query.reserve_count}</>}</div>
                  {endUserLoginStatus === 'Logout' &&
                    String(router.query.payment_method) === 'localPayment' &&
                  <>
                    <hr/>
                    <Form.Label className='mt10'>お名前（姓）</Form.Label>
                    <Form.Control></Form.Control>
                    <Form.Label className='mt10'>お名前（名）</Form.Label>
                    <Form.Control></Form.Control>
                    <Form.Label className='mt10'>メールアドレス</Form.Label>
                    <Form.Control></Form.Control>
                    <Form.Label className='mt10'>携帯電話番号</Form.Label>
                    <Form.Control></Form.Control>
                  </>}
                  {!loginValidate() &&
                  <div className='text-center'>
                    <Button className='mt30' onClick={onClickNextLink}>確認画面に進む</Button>
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
