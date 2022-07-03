import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Container, Modal, Button, Form, Col, Row } from 'react-bootstrap'
import { useRouter } from 'next/router'
import {  showReserveFrameModalChanged } from 'redux/reserveFrameSlice'
import { useDispatch } from 'react-redux'
import ReserveFrameModal from 'components/organisms/ReserveFrameModal'

const SetReserveCalendarTemplate = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()

  return(
    <>
      <Container>
        <div className='text-center mt50 mb50'>
          <h2>対象の日付を選択して予約メニューを設定してください</h2>
        </div>
        <br />
        <FullCalendar plugins={[dayGridPlugin, interactionPlugin]}
                      initialView='dayGridMonth'
                      selectable={true}
                      select={() => dispatch(showReserveFrameModalChanged(true))}
                      locale='ja' />
        <ReserveFrameModal></ReserveFrameModal>
      </Container>
    </>
  )
}

export default SetReserveCalendarTemplate
