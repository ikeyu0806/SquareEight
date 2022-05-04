import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Container, Modal, Button, Form } from 'react-bootstrap'

const SetReserveCalendarTemplate = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false)

  return(
    <>
      <Container>
        <FullCalendar plugins={[dayGridPlugin, interactionPlugin]}
                      initialView='dayGridMonth'
                      selectable={true}
                      select={() => setShowModal(true)}
                      locale='ja' />
        <Modal show={showModal} size='lg'>
          <Modal.Header>
            <Modal.Title>新規予約枠登録</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="menuName">
                <Form.Label>メニュー名</Form.Label>
                <Form.Control placeholder="メニュー名" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="menuText">
                <Form.Label>メニュー説明文</Form.Label>
                <Form.Control placeholder="メニュー説明文" />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>閉じる</Button>
            <Button variant='primary'>登録する</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}

export default SetReserveCalendarTemplate
