import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { alertChanged } from 'redux/alertSlice'
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'
import { loginStatusChanged, paymentMethodsChanged, defaultPaymentMethodIdChanged } from 'redux/currentEndUserSlice'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { priceChanged,
         nameChanged,
         reserveIsUnlimitedChanged,
         reserveIntervalNumberChanged,
         reserveIntervalUnitChanged,
         enableReserveCountChanged,
         descriptionChanged,
         s3ObjectPublicUrlChanged } from 'redux/monthlyPaymentPlanSlice'

const Purchase: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const router = useRouter()
  const name = useSelector((state: RootState) => state.monthlyPaymentPlan.name)
  const price = useSelector((state: RootState) => state.monthlyPaymentPlan.price)
  const s3ObjectPublicUrl = useSelector((state: RootState) => state.monthlyPaymentPlan.s3ObjectPublicUrl)
  const reserveIntervalNumber = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIntervalNumber)
  const enableReserveCount = useSelector((state: RootState) => state.monthlyPaymentPlan.enableReserveCount)
  const description = useSelector((state: RootState) => state.monthlyPaymentPlan.description)
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const defaultPaymentMethodId = useSelector((state: RootState) => state.currentEndUser.defaultPaymentMethodId)
  const paymentMethods = useSelector((state: RootState) => state.currentEndUser.paymentMethods)

  useEffect(() => {
    const fetchMonthlyPaymentPlan = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/monthly_payment_plans/${router.query.id}/purchase_info`, {
          headers: {
            'Session-Id': cookies._gybuilder_end_user_session
          }
        }
      )
      .then(function (response) {
        const monthlyPaymentPlanResponse: MonthlyPaymentPlanParam = response.data.monthly_payment_plan
        dispatch(nameChanged(monthlyPaymentPlanResponse.name))
        dispatch(priceChanged(monthlyPaymentPlanResponse.price))
        dispatch(reserveIsUnlimitedChanged(monthlyPaymentPlanResponse.reserve_is_unlimited))
        dispatch(reserveIntervalNumberChanged(monthlyPaymentPlanResponse.reserve_interval_number))
        dispatch(reserveIntervalUnitChanged(monthlyPaymentPlanResponse.reserve_interval_unit))
        dispatch(enableReserveCountChanged(monthlyPaymentPlanResponse.enable_reserve_count))
        dispatch(descriptionChanged(monthlyPaymentPlanResponse.description))
        dispatch(s3ObjectPublicUrlChanged(monthlyPaymentPlanResponse.s3_object_public_url))
        dispatch(defaultPaymentMethodIdChanged(response.data.default_payment_method_id))
        dispatch(paymentMethodsChanged(response.data.payment_methods))
        dispatch(loginStatusChanged(response.data.login_status))
      })
      .catch(error => {
        dispatch(loginStatusChanged('Logout'))
        console.log(error)
      })
    }
    fetchMonthlyPaymentPlan()
  }, [router.query.id, dispatch])

  const insertCart = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/monthly_payment_plans/insert_cart`,
    {
      monthly_payment_plans: {
        id: router.query.id
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
    <>
      <MerchantCustomLayout>
        <Container>
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
            <Card>
              <Card.Header>月額課金プラン加入</Card.Header>
              <Card.Body>
              {currentEndUserLogintStatus === 'Logout'
                ?
                  <>
                    <div></div>
                    <a href='/customer/login'>カスタマーアカウントでログインしてください</a><br/>
                    <div className='mt20'>購入にはアカウント登録とクレジットカード登録が必要になります</div>
                    <div className='mt40'></div>
                  </>
                :
                  <></>
              }
                <div>{name}</div>
                <div>{description}</div>
                {s3ObjectPublicUrl
                  && <img
                      className='d-block w-100 mt30 mb30'
                      src={s3ObjectPublicUrl}
                      alt='image' />}
                <div>￥{price}</div>
                <div>{reserveIntervalNumber}日に{enableReserveCount}回予約可能</div>
                <h4>お支払い方法</h4>
                  {currentEndUserLogintStatus === 'Logout'
                  ?
                    <></>
                  :
                    <>
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
                    <Button className='mt30'
                            onClick={() => insertCart()}
                            disabled={!currentEndUserLogintStatus}>カートに入れる</Button>
                    </>
                  }
              </Card.Body>
            </Card>
            </Col>
          </Row>
        </Container>
      </MerchantCustomLayout>
    </>
  )
}

export default Purchase
