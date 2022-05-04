import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Container } from 'react-bootstrap'

const SetReserveCalendarTemplate = (): JSX.Element => {
  return(
    <>
      <Container>
        <div>
          <FullCalendar plugins={[dayGridPlugin, interactionPlugin]}
                        initialView='dayGridMonth'
                        selectable={true}
                        select={() => alert('hhhh')}
                        locale='ja' />
        </div>
      </Container>
    </>
  )
}

export default SetReserveCalendarTemplate
