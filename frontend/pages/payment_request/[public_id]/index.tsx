import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col, Card, ListGroup, Button, Form} from 'react-bootstrap'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { alertChanged } from 'redux/alertSlice'
import { loginStatusChanged, paymentMethodsChanged, defaultPaymentMethodIdChanged } from 'redux/currentEndUserSlice'
import { PaymentRequestParam } from 'interfaces/PaymentRequestParam'
import {  navbarBrandTextChanged,
          navbarBrandTypeChanged,
          navbarBrandImageChanged,
          navbarBrandImageWidthChanged,
          navbarBrandImageHeightChanged,
          navbarBrandBackgroundColorChanged,
          navbarBrandVariantColorChanged,
          footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const defaultPaymentMethodId = useSelector((state: RootState) => state.currentEndUser.defaultPaymentMethodId)
  const paymentMethods = useSelector((state: RootState) => state.currentEndUser.paymentMethods)
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequestParam>()

  useEffect(() => {
    const fetchWebpage = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/payment_requests/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_end_user_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        setPaymentRequest(response.data.payment_request)
        dispatch(defaultPaymentMethodIdChanged(response.data.default_payment_method_id))
        dispatch(paymentMethodsChanged(response.data.payment_methods))
        dispatch(loginStatusChanged(response.data.login_status))
        dispatch(navbarBrandTextChanged(response.data.shared_component.navbar_brand_text))
        dispatch(navbarBrandTypeChanged(response.data.shared_component.navbar_brand_type))
        dispatch(navbarBrandImageChanged(response.data.shared_component.navbar_brand_image_s3_object_public_url))
        dispatch(navbarBrandImageWidthChanged(response.data.shared_component.nabvar_brand_image_width))
        dispatch(navbarBrandImageHeightChanged(response.data.shared_component.nabvar_brand_image_height))
        dispatch(navbarBrandBackgroundColorChanged(response.data.shared_component.navbar_brand_background_color))
        dispatch(navbarBrandVariantColorChanged(response.data.shared_component.navbar_brand_variant_color))
        dispatch(footerCopyRightTextChanged(response.data.shared_component.footer_copyright_text))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchWebpage()
  }, [router.query.public_id, cookies._square_eight_end_user_session, dispatch])

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

  const execPurchase = () => {
    setIsLoading(true)
    axios.post(`${process.env.BACKEND_URL}/api/internal/payment_requests/exec_payment`,
    {
      payment_request: {
        public_id: router.query.public_id
      },
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then(response => {
      location.reload()
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
    setIsLoading(false)
  }

  return (
    <MerchantCustomLayout>
      <Container>
        <Row>
          <Col lg={3} md={1}></Col>
          <Col lg={6} md={10}>
          {paymentRequest?.status === 'Paid' &&
            <div className='mt30 text-center'>
              <h3>決済完了しています</h3>
            </div>
          }
          {paymentRequest?.status === 'Pending' &&
            <Card className='mt20'>
              <Card.Header>{paymentRequest?.name}のお支払い</Card.Header>
              <Card.Body>
                <h3>お支払い金額: ￥{paymentRequest?.price}</h3>
                {currentEndUserLogintStatus === 'Logout'
                ?
                  <>
                    <a href='/customer/login' target='_blank' rel='noreferrer'>カスタマーアカウントでログインしてください</a><br/>
                    <div className='mt20'>お支払いにはアカウント登録とクレジットカード登録が必要になります。</div>
                    <div className='mt40'></div>
                  </>
                :
                  <>
                    <hr className='mt40' />
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
                    {paymentMethods.length !== 0 &&
                    <div className='text-center mt20'>
                      <Button onClick={() => execPurchase()}>
                        {isLoading && <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>}
                        決済を実行する
                      </Button>
                    </div>}
                  </>
                }
              </Card.Body>
            </Card>}
          </Col>
        </Row>
      </Container>
    </MerchantCustomLayout>
  )
}

export default Index
