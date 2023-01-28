import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Button, Row, Col, Card } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { paymentMethodText } from 'functions/paymentMethodText'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import { hideShareButtonChanged } from 'redux/sharedComponentSlice'
import {  navbarBrandTextChanged,
          navbarBrandTypeChanged,
          navbarBrandImageChanged,
          navbarBrandImageWidthChanged,
          navbarBrandImageHeightChanged,
          navbarBrandBackgroundColorChanged,
          navbarBrandVariantColorChanged,
          footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

const PaymentMethod: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])
  const [selectedDate] = useState(String(router.query.date).split('-'))
  const [isCompleteReservation, setIsCompleteReservation] = useState(false)
  const [reserveFrame, setReserveFrame] = useState<ReserveFrameParam>()

  useEffect(() => {
    const fetchReserveFrame = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames/${router.query.public_id}`
      )
      .then(function (response) {
        setReserveFrame(response.data.reserve_frame)
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
  }, [router.query.public_id, dispatch])

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
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '予約しました',
        icon: 'info'
      }).then((result) => {
        router.push(`/reservation/${response.data.reservation.id}`)
      })
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '予約失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <>
      <MerchantCustomLayout>
        <Container className='mt30'>
          {reserveFrame?.publish_status === 'Unpublish' &&
          <div className='text-center mt20'>非公開です</div>}
          {reserveFrame?.publish_status === 'Publish' &&
          <Row>
            <Col lg={3} md={3}></Col>
            <Col lg={6} md={6}>
              <Card>
                <Card.Body>
                  <p><span className='orange_highlighter font-size-25'>お客様情報の入力</span></p>
                  <h3 className='mb30'>{router.query.title}</h3>
                  <div>お名前: {router.query.last_name} {router.query.first_name}</div>
                  <hr />
                  <div>メールアドレス: {router.query.email}</div>
                  <hr />
                  <div>電話番号: {router.query.phone_number}</div>
                  <hr />
                  <div className='mt10 mb10'>予約時間: {selectedDate[0]}年{selectedDate[1]}月{selectedDate[2]}日 {router.query.time}</div>
                  <hr />
                  <div>お支払い方法: {paymentMethodText(String(router.query.payment_method), Number(router.query.price), Number(router.query.consume_number), Number(router.query.reserve_count))}</div>
                  <hr />
                  <div className='mt10 mb10'>{['localPayment', 'creditCardPayment'].includes(String(router.query.payment_method)) && <>予約人数: {router.query.reserve_count}</>}</div>
                  {!isCompleteReservation && <div className='text-center'>
                    <Button className='mt30' onClick={execReserve}>予約を確定する</Button>
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
  
export default PaymentMethod
