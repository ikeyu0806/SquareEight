import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Container } from 'react-bootstrap'
import {  showReserveFrameModalChanged,
          startDateChanged,
          endDateChanged,
          repeatEndDateChanged } from 'redux/reserveFrameSlice'

import { useDispatch } from 'react-redux'
import ReserveFrameModal from 'components/organisms/ReserveFrameModal'
import allLocales from '@fullcalendar/core/locales-all'

const SetReserveCalendarTemplate = (): JSX.Element => {
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
                      select={(e) => {
                        dispatch(showReserveFrameModalChanged(true))
                        dispatch(startDateChanged(e.startStr))
                        dispatch(endDateChanged(e.startStr))
                        dispatch(repeatEndDateChanged(e.startStr))
                      }}
                      locales={allLocales}
                      locale='ja' />
        <ReserveFrameModal></ReserveFrameModal>
      </Container>
    </>
  )
}

export default SetReserveCalendarTemplate
