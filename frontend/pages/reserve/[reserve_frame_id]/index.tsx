import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Row, Col } from 'react-bootstrap'
import CommonNavbar from 'components/templates/CommonNavbar'
import axios from 'axios'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'
import { ReserveFramePaymentMethodParam } from 'interfaces/ReserveFramePaymentMethodParam'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [reserveFrame, setReserveFrame] = useState<ReserveFrameParam>({title: '', description: ''})
  const [reserveFramePaymentMethod, setReserveFramePaymentMethod] = useState<ReserveFramePaymentMethodParam>()

  useEffect(() => {
    const fetchReserveFrame = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames/${router.query.reserve_frame_id}`
      )
      .then(function (response) {
        const reserveFrameResponse: ReserveFrameParam = response.data.reserve_frame
        setReserveFrame(reserveFrameResponse)
        setShowModal(true)
        setReserveFramePaymentMethod(response.data.payment_method)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchReserveFrame()
  }, [])

  return (
    <>
      <Container>
        <CommonNavbar></CommonNavbar>
        <Row className='mt20'>
          <Col lg={3} md={3}></Col>
          <Col>
            <h3>予約ページ詳細</h3>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Index
