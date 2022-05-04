import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Container, Modal, Button, Form, Col, Row } from 'react-bootstrap'

const SetReserveCalendarTemplate = (): JSX.Element => {
  enum REPEAT_PERIOD {
    Day = 0,
    Week = 1,
    Month = 2,
  }

  const [showModal, setShowModal] = useState(false)
  const [repeatReserveMenu, setRepeatReserveMenu] = useState(false)
  const [selectedRepeatPeriod, setSelectedRepeatPeriod] = useState(REPEAT_PERIOD.Day)

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
              <Row>
                <Col>
                  <Form.Group className='mb-3' controlId='menuName'>
                    <Form.Label>メニュー名</Form.Label>
                    <Form.Control placeholder='メニュー名' />
                  </Form.Group>
                </Col>
                <Col>
                </Col>
              </Row>
              <Form.Group className='mb-3' controlId='menuText'>
                <Form.Label>メニュー説明文</Form.Label>
                <Form.Control placeholder='メニュー説明文' as='textarea' rows={3} />
              </Form.Group>
              <Form.Group className='mb-3' controlId='menuText'>

              <Form.Label>開始日時</Form.Label>
                <Row>
                  <Col>
                    <Form.Control placeholder='実施日時' type='date' />
                  </Col>
                  <Col>
                    <Form.Select aria-label='Default select example'>
                      <option value='00'>00時</option>
                      <option value='01'>01時</option>
                      <option value='02'>02時</option>
                      <option value='03'>03時</option>
                      <option value='04'>04時</option>
                      <option value='05'>05時</option>
                      <option value='06'>06時</option>
                      <option value='07'>07時</option>
                      <option value='08'>08時</option>
                      <option value='09'>09時</option>
                      <option value='10'>10時</option>
                      <option value='11'>11時</option>
                      <option value='12'>12時</option>
                      <option value='13'>13時</option>
                      <option value='14'>14時</option>
                      <option value='15' selected>15時</option>
                      <option value='16'>16時</option>
                      <option value='17'>17時</option>
                      <option value='18'>18時</option>
                      <option value='19'>19時</option>
                      <option value='20'>20時</option>
                      <option value='21'>21時</option>
                      <option value='22'>22時</option>
                      <option value='23'>23時</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Select aria-label='Default select example'>
                      <option value='00'>00分</option>
                      <option value='01'>05分</option>
                      <option value='02'>10分</option>
                      <option value='03'>15分</option>
                      <option value='04'>20分</option>
                      <option value='05'>25分</option>
                      <option value='06'>30分</option>
                      <option value='07'>35分</option>
                      <option value='08'>40分</option>
                      <option value='09'>45分</option>
                      <option value='10'>50分</option>
                      <option value='11'>55分</option>
                    </Form.Select>
                  </Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
              </Form.Group>

              <Form.Group className='mb-3' controlId='menuText'>
                <Form.Label>終了日時</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control placeholder='実施日時' type='date' />
                    </Col>
                    <Col>
                      <Form.Select aria-label='Default select example'>
                        <option value='' selected>-</option>
                        <option value='00'>00時</option>
                        <option value='01'>01時</option>
                        <option value='02'>02時</option>
                        <option value='03'>03時</option>
                        <option value='04'>04時</option>
                        <option value='05'>05時</option>
                        <option value='06'>06時</option>
                        <option value='07'>07時</option>
                        <option value='08'>08時</option>
                        <option value='09'>09時</option>
                        <option value='10'>10時</option>
                        <option value='11'>11時</option>
                        <option value='12'>12時</option>
                        <option value='13'>13時</option>
                        <option value='14'>14時</option>
                        <option value='15' selected>15時</option>
                        <option value='16'>16時</option>
                        <option value='17'>17時</option>
                        <option value='18'>18時</option>
                        <option value='19'>19時</option>
                        <option value='20'>20時</option>
                        <option value='21'>21時</option>
                        <option value='22'>22時</option>
                        <option value='23'>23時</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Select aria-label='Default select example'>
                        <option value='' selected>-</option>
                        <option value='00'>00分</option>
                        <option value='01'>05分</option>
                        <option value='02'>10分</option>
                        <option value='03'>15分</option>
                        <option value='04'>20分</option>
                        <option value='05'>25分</option>
                        <option value='06'>30分</option>
                        <option value='07'>35分</option>
                        <option value='08'>40分</option>
                        <option value='09'>45分</option>
                        <option value='10'>50分</option>
                        <option value='11'>55分</option>
                      </Form.Select>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                </Form.Group>
              </Form>

              <Form.Group className='mb-3' controlId='repeatReserveCheckbox'>
                <Form.Check type='checkbox' label='繰り返し設定を行う' checked={repeatReserveMenu} onClick={() => setRepeatReserveMenu(!repeatReserveMenu)} />
              </Form.Group>

              {repeatReserveMenu && <div className='ml20'>
                <Form.Group className='mb-3' controlId='repeatPeriodCheckbox'>
                  <Form.Check type='checkbox'
                              label='日ごと'
                              inline
                              name='repeatPeriod'
                              value={REPEAT_PERIOD.Day}
                              onChange={() => setSelectedRepeatPeriod(REPEAT_PERIOD.Day)}
                              checked={selectedRepeatPeriod === REPEAT_PERIOD.Day} />
                  <Form.Check type='checkbox'
                              label='週ごと'
                              inline
                              value={REPEAT_PERIOD.Week}
                              name='repeatPeriod'
                              onChange={() => setSelectedRepeatPeriod(REPEAT_PERIOD.Week)}
                              checked={selectedRepeatPeriod === REPEAT_PERIOD.Week} />
                  <Form.Check type='checkbox'
                              label='月ごと'
                              inline
                              value={REPEAT_PERIOD.Month}
                              name='repeatPeriod'
                              onChange={() => setSelectedRepeatPeriod(REPEAT_PERIOD.Month)}
                              checked={selectedRepeatPeriod === REPEAT_PERIOD.Month} />
                </Form.Group>
                {selectedRepeatPeriod === REPEAT_PERIOD.Day &&
                  <>
                    <Row>
                      <Col>
                      <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
                        <Form.Label column sm={1}>
                          間隔
                        </Form.Label>
                        <Col sm={2}>
                          <Form.Control type='number' placeholder='1' />
                        </Col>
                        <Form.Label column sm={2}>
                          日ごと
                        </Form.Label>
                      </Form.Group>
                      
                      </Col>
                    </Row>
                  </>
                }
                <Form.Group className='mb-3' controlId='startDate'>
                  <Row>
                    <Form.Label>繰り返し開始日時</Form.Label>
                    <Col>
                      <Form.Control placeholder='実施日時' type='date' />
                    </Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                </Form.Group>

                <Form.Group className='mb-3' controlId='startDate'>
                  <Row>
                    <Form.Label>繰り返し終了日時</Form.Label>
                    <Col>
                      <Form.Control placeholder='実施日時' type='date' />
                    </Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                </Form.Group>
              </div>}
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
