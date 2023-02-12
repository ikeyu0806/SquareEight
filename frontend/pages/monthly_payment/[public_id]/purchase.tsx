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
import { redirectEndUserLoginPath } from 'functions/redirectEndUserLoginPath'
import { priceChanged,
         nameChanged,
         reserveIsUnlimitedChanged,
         reserveIntervalNumberChanged,
         reserveIntervalUnitChanged,
         enableReserveCountChanged,
         descriptionChanged,
         publishStatusChanged,
         s3ObjectPublicUrlChanged } from 'redux/monthlyPaymentPlanSlice'
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
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const router = useRouter()
  const [mainImagePublicUrl, setMainImagePublicUrl] = useState('')
  const [image2PublicUrl, setImage2PublicUrl] = useState('')
  const [image3PublicUrl, setImage3PublicUrl] = useState('')
  const [image4PublicUrl, setImage4PublicUrl] = useState('')
  const [image5PublicUrl, setImage5PublicUrl] = useState('')
  const name = useSelector((state: RootState) => state.monthlyPaymentPlan.name)
  const price = useSelector((state: RootState) => state.monthlyPaymentPlan.price)
  const reserveIntervalNumber = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIntervalNumber)
  const enableReserveCount = useSelector((state: RootState) => state.monthlyPaymentPlan.enableReserveCount)
  const description = useSelector((state: RootState) => state.monthlyPaymentPlan.description)
  const publishStatus = useSelector((state: RootState) => state.monthlyPaymentPlan.publishStatus)
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const defaultPaymentMethodId = useSelector((state: RootState) => state.currentEndUser.defaultPaymentMethodId)
  const paymentMethods = useSelector((state: RootState) => state.currentEndUser.paymentMethods)

  useEffect(() => {
    const fetchMonthlyPaymentPlan = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/monthly_payment_plans/${router.query.public_id}/purchase_info`, {
          headers: {
            'Session-Id': cookies._square_eight_end_user_session
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
        dispatch(s3ObjectPublicUrlChanged(monthlyPaymentPlanResponse.image1_account_s3_image_public_url))
        dispatch(publishStatusChanged(monthlyPaymentPlanResponse.publish_status))
        dispatch(defaultPaymentMethodIdChanged(response.data.default_payment_method_id))
        dispatch(paymentMethodsChanged(response.data.payment_methods))
        dispatch(loginStatusChanged(response.data.login_status))
        setMainImagePublicUrl(response.data.monthly_payment_plan.image1_account_s3_image_public_url)
        setImage2PublicUrl(response.data.monthly_payment_plan.image2_account_s3_image_public_url)
        setImage3PublicUrl(response.data.monthly_payment_plan.image3_account_s3_image_public_url)
        setImage4PublicUrl(response.data.monthly_payment_plan.image4_account_s3_image_public_url)
        setImage5PublicUrl(response.data.monthly_payment_plan.image5_account_s3_image_public_url)
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
    fetchMonthlyPaymentPlan()
  }, [router.query.public_id, dispatch, cookies._square_eight_end_user_session])

  const insertCart = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/monthly_payment_plans/insert_cart`,
    {
      monthly_payment_plans: {
        public_id: router.query.public_id
      },
    },
    {
      headers: { 
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then(response => {
      router.push(`/cart`)
    }).catch(error => {
      console.log(error)
      dispatch(alertChanged({message: error.response.data.error, show: true, type: 'danger'}))
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

  return (
    <>
      <MerchantCustomLayout>
        <div className='bg-lightgray'>
          <Container>
          {publishStatus === 'Unpublish' &&
            <div className='text-center'>非公開です</div>}
            {publishStatus === 'Publish' && 
            <Row>
              <Col lg={3}></Col>
              <Col lg={6}>
              <Card className='mt30 mb30'>
                <Card.Body>
                {currentEndUserLogintStatus === 'Logout'
                  ?
                    <>
                      <div></div>
                      <a
                        className='link-text'
                        onClick={() => redirectEndUserLoginPath(router.asPath)}>SquareEightIDでログインしてください</a><br/>
                      <div className='mt20'>購入にはアカウント登録とクレジットカード登録が必要になります</div>
                      <div className='mt40'></div>
                    </>
                  :
                    <></>
                }
                  <p><span className='orange_highlighter font-size-25'>{name}</span></p>
                  <div className='new-line mt20'>{description}</div>
                  {mainImagePublicUrl
                    && <img
                        className='d-block w-100 mt30 mb30'
                        src={mainImagePublicUrl}
                        alt='image' />}
                  <Row>
                    {image2PublicUrl && <Col>
                      <img
                        className='d-block w-100 mt10 mb10'
                        src={image2PublicUrl}
                        alt='image2' />
                    </Col>}
                    {image3PublicUrl && <Col>
                      <img
                        className='d-block w-100 mt10 mb10'
                        src={image3PublicUrl}
                        alt='image3' />
                    </Col>}
                  </Row>
                  <Row>
                    {image4PublicUrl && <Col>
                      <img
                        className='d-block w-100 mt10 mb10'
                        src={image4PublicUrl}
                        alt='image4' />
                    </Col>}
                    {image5PublicUrl && <Col>
                      <img
                        className='d-block w-100 mt10 mb10'
                        src={image5PublicUrl}
                        alt='image5' />
                    </Col>}
                  </Row>
                  <hr />
                  <div>￥{price}</div>
                  <hr />
                  <div>{reserveIntervalNumber}日に{enableReserveCount}回予約可能</div>
                    {currentEndUserLogintStatus === 'Logout'
                    ?
                      <></>
                    :
                      <>
                      <hr />
                      <h5>お支払い方法</h5>
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
                      <Button className='mt30 mb30 text-white'
                              variant='info'
                              onClick={() => insertCart()}
                              disabled={!currentEndUserLogintStatus}>カートに入れる</Button>
                      </>
                    }
                </Card.Body>
              </Card>
              </Col>
            </Row>}
          </Container>
        </div>
      </MerchantCustomLayout>
    </>
  )
}

export default Purchase
