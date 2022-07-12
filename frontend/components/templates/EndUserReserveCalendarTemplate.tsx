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

  return(
    <>
      <Container>
        <FullCalendar plugins={[dayGridPlugin, interactionPlugin]}
                      initialView='dayGridMonth'
                      selectable={true}
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
