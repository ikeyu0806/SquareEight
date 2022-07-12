import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Container, Modal, Button, Form, Col, Row } from 'react-bootstrap'
import allLocales from '@fullcalendar/core/locales-all'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'
import { ReserveFramePaymentMethodParam } from 'interfaces/ReserveFramePaymentMethodParam'

const EndUserReserveCalendar = (): JSX.Element => {
  const events = useSelector((state: RootState) => state.reserveFrame.reserveEvents)
  const [showModal, setShowModal] = useState(false)
  const [reserveFrame, setReserveFrame] = useState<ReserveFrameParam>({title: '', description: ''})
  const [reserveFramePaymentMethod, setReserveFramePaymentMethod] = useState<ReserveFramePaymentMethodParam>()

  const onEventClick = (eventId: string) => {
    const fetchReserveFrame = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames/${eventId}`
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
  }

  return(
    <>
      <Container>
        <FullCalendar plugins={[dayGridPlugin, interactionPlugin]}
                      initialView='dayGridMonth'
                      selectable={true}
                      eventClick={(info) => onEventClick(info.event.id)}
                      locales={allLocales}
                      locale='ja'
                      events={events} />
        <Modal show={showModal} size='lg'>
          <Modal.Body>
            <h2>{reserveFrame.title}</h2>
            <br />
            <div>{reserveFrame.start_at && <>開始日時 {reserveFrame?.start_at || ''}</>}</div>
            <div>{reserveFrame.description}</div>
            <br />
            {reserveFramePaymentMethod?.local_payment_price && 
            <label>現地払い料金: {reserveFramePaymentMethod?.local_payment_price}</label>}
            <Button variant='primary'>予約する</Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>閉じる</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}

export default EndUserReserveCalendar
