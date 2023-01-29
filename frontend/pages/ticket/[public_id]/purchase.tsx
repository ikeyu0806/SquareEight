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
import { TicketMasterParam } from 'interfaces/TicketMasterParam'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { alertChanged } from 'redux/alertSlice'
import { loginStatusChanged, paymentMethodsChanged, defaultPaymentMethodIdChanged } from 'redux/currentEndUserSlice'
import { redirectEndUserLoginPath } from 'functions/redirectEndUserLoginPath'
import { nameChanged,
         priceChanged,
         issueNumberChanged,
         descriptionChanged,
         publishStatusChanged,
         s3ObjectPublicUrlChanged } from 'redux/ticketMasterSlice'
import {  navbarBrandTextChanged,
          navbarBrandTypeChanged,
          navbarBrandImageChanged,
          navbarBrandImageWidthChanged,
          navbarBrandImageHeightChanged,
          navbarBrandBackgroundColorChanged,
          navbarBrandVariantColorChanged,
          footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

const Purchase: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const defaultPaymentMethodId = useSelector((state: RootState) => state.currentEndUser.defaultPaymentMethodId)
  const paymentMethods = useSelector((state: RootState) => state.currentEndUser.paymentMethods)
  const dispatch = useDispatch()
  const router = useRouter()
  const [mainImagePublicUrl, setMainImagePublicUrl] = useState('')
  const name = useSelector((state: RootState) => state.ticketMaster.name)
  const issueNumber = useSelector((state: RootState) => state.ticketMaster.issueNumber)
  const price = useSelector((state: RootState) => state.ticketMaster.price)
  const effectiveMonth = useSelector((state: RootState) => state.ticketMaster.effectiveMonth)
  const description = useSelector((state: RootState) => state.ticketMaster.description)
  const publishStatus = useSelector((state: RootState) => state.ticketMaster.publishStatus)
  const s3ObjectPublicUrl = useSelector((state: RootState) => state.ticketMaster.s3ObjectPublicUrl)
  const [purchaseQuantitity, setPurchaseQuantitity] = useState(1)

  useEffect(() => {
    const fetchTicketMaster = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/ticket_masters/${router.query.public_id}/purchase_info`, {
          headers: {
            'Session-Id': cookies._square_eight_end_user_session
          }
        }
      )
      .then(function (response) {
        const ticketMasterResponse: TicketMasterParam = response.data.ticket_master
        dispatch(nameChanged(ticketMasterResponse.name))
        dispatch(priceChanged(ticketMasterResponse.price))
        dispatch(issueNumberChanged(ticketMasterResponse.issue_number))
        dispatch(descriptionChanged(ticketMasterResponse.description))
        dispatch(s3ObjectPublicUrlChanged(ticketMasterResponse.image1_account_s3_image_public_url))
        dispatch(publishStatusChanged(ticketMasterResponse.publish_status))
        dispatch(defaultPaymentMethodIdChanged(response.data.default_payment_method_id))
        dispatch(paymentMethodsChanged(response.data.payment_methods))
        dispatch(loginStatusChanged(response.data.login_status))
        setMainImagePublicUrl(response.data.image1_account_s3_image_public_url)
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
    fetchTicketMaster()
  }, [cookies._square_eight_end_user_session, router.query.public_id, dispatch])

  const insertCart = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/ticket_masters/insert_cart`,
    {
      ticket_master: {
        public_id: router.query.public_id,
        purchase_quantity: purchaseQuantitity
      },
    },
    {
      headers: { 
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then(response => {
      router.push(`/cart`)
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
              <Col lg={3} md={1}></Col>
              <Col lg={6} md={10}>
                <Card className='mt30 mb30'>
                  <Card.Body>
                    {currentEndUserLogintStatus === 'Logout'
                      ? 
                        <>
                          <a
                            className='link-text'
                            onClick={() => redirectEndUserLoginPath(router.asPath)}>SquareEightIDでログインしてください</a><br />
                          <div className='mt20'>購入にはアカウント登録とクレジットカード登録が必要になります</div>
                          <div className='mt40'></div>
                        </>
                      : <></>
                    }
                    <p><span className='orange_highlighter font-size-25'>{name}</span></p>
                    {mainImagePublicUrl
                    && <img
                        className='d-block w-100 mt30 mb30'
                        src={mainImagePublicUrl}
                        alt='image' />}
                    <div className='mt10'>{issueNumber}枚</div>
                    <div className='mt10'>{price}円</div>
                    <div className='mt10'>有効期限: {effectiveMonth}ヶ月</div>
                    <div className='mt20 new-line'>{description}</div>
                    <hr />
                    <Row>
                      <Col sm={2}>
                        <Form.Label>購入数量</Form.Label>
                        <Form.Control type='number'
                                      value={purchaseQuantitity}
                                      min={1}
                                      onChange={(e) => setPurchaseQuantitity(Number(e.target.value))}></Form.Control>
                      </Col>
                      <Col></Col>
                    </Row>
                    {currentEndUserLogintStatus === 'Logout'
                    ?
                      <></>
                    :
                      <>
                      <hr />
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
                      <Button className='mt30 text-white'
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
