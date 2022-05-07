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
  const [isSetPrice, setIsSetPrice] = useState(true)
  const [deadlineToday, setDeadlineToday] = useState(true)
  const [enableLocalPayment, setEnableLocalPayment] = useState(false)
  const [enableMonthlyPayment, setEnableMonthlyPayment] = useState(false)
  const [enableReservationTicket, setEnableReservationTicket] = useState(false)

  return(
    <>
      <Container>
        <div className='text-center mt50 mb50'>
          <h2>対象の日付を選択して予約メニューを設定してください</h2>
        </div>
        <Row>
          <Col></Col>
          <Col>
            <Button variant='outline-primary' size='lg'>戻る</Button>
          </Col>
          <Col></Col>
          <Col>
            <Button variant='primary' size='lg'>次へ</Button>
          </Col>
          <Col></Col>
        </Row>
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
                    <Form.Control placeholder='例 フィットネス60分レッスン' />
                  </Form.Group>
                </Col>
                <Col>
                </Col>
              </Row>

              <Form.Group className='mb-3' controlId='menuText'>
                <Form.Label>メニュー説明文</Form.Label>
                <Form.Control placeholder='メニューの説明を入力してください' as='textarea' rows={3} />
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
                {selectedRepeatPeriod === REPEAT_PERIOD.Week &&
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
                          週ごと
                        </Form.Label>
                      </Form.Group>
                      
                      </Col>
                    </Row>
                  </>
                }
                {selectedRepeatPeriod === REPEAT_PERIOD.Month &&
                  <>
                    <Row>
                      <Col>
                        <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
                          <Col sm={2}>
                            <Form.Control type='number' />
                          </Col>
                          <Form.Label column sm={2}>
                            ヶ月ごとの
                          </Form.Label>
                          <Col sm={2}>
                            <Form.Control type='number' />
                          </Col>
                          <Form.Label column sm={2}>
                            日に設定
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

              <Form.Group className='mb-3' controlId='startDate'>
                <Row>
                  <Form.Label>料金</Form.Label>
                  <Col>
                  <Form.Group>
                    <Form.Check type='checkbox'
                                  label='設定する'
                                  inline
                                  name='price'
                                  onChange={() => setIsSetPrice(true)}
                                  checked={isSetPrice} />
                    <Form.Check type='checkbox'
                                label='設定しない'
                                inline
                                name='price'
                                onChange={() => setIsSetPrice(false)}
                                checked={!isSetPrice} />
                  </Form.Group>
                  </Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
                {isSetPrice &&
                <div className='ml10'>
                  <Form.Check label='月額課金' checked={enableLocalPayment} onChange={() => setEnableLocalPayment(!enableLocalPayment)}></Form.Check>
                  {enableLocalPayment && <Row>
                    <Col>
                      <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
                        <Col sm={3}>
                          <Form.Control type='number' min='0' />
                        </Col>
                        <Form.Label column sm={2}>
                          円
                        </Form.Label>
                      </Form.Group>
                    </Col>
                  </Row>}
                  <Form.Check label='月謝払い' checked={enableMonthlyPayment} onChange={() => setEnableMonthlyPayment(!enableMonthlyPayment)}></Form.Check>
                  {enableMonthlyPayment && 
                    <div className='ml20'>
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Check type='checkbox'
                                          label='隔週プラン'
                                          inline
                                          name='week'
                                          onChange={() => setIsSetPrice(true)}
                                          checked={isSetPrice} />
                            <br />
                            <Form.Check type='checkbox'
                                        label='週1プラン'
                                        inline
                                        name='oneWeek'
                                        onChange={() => setIsSetPrice(false)}
                                        checked={!isSetPrice} />
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                  }
                  <Form.Check label='回数券' checked={enableReservationTicket} onChange={() => setEnableReservationTicket(!enableReservationTicket)}></Form.Check>
                  {enableReservationTicket && 
                    <div className='ml20'>
                      <Form.Check type='checkbox'
                                        label='10000円 レッスン5回チケット'
                                        inline
                                        name='oneWeek'
                                        onChange={() => setIsSetPrice(false)}
                                        checked={!isSetPrice} />
                      <Row>
                        <Col>
                        <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
                          <Form.Label column sm={2}>
                            消費枚数
                          </Form.Label>
                          <Col sm={2}>
                            <Form.Control type='number' placeholder='1' />
                          </Col>
                          <Form.Label column sm={2}>
                            枚
                          </Form.Label>
                        </Form.Group>
                        </Col>
                      </Row>
                    </div>
                  }
                </div>}
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='menuName'>
                  <Form.Label>公開設定</Form.Label>
                  <Form.Select placeholder='メニュー名'>
                    <option value='unpublish' selected>非公開</option>
                    <option value='publish'>公開</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
              </Col>
              <Col>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='menuName'>
                  <Form.Label>受付設定</Form.Label>
                  <Form.Select placeholder='メニュー名'>
                    <option value='unpublish' selected>即時予約</option>
                    <option value='publish'>仮予約</option>
                    <option value='publish'>電話のみ予約</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
              </Col>
              <Col>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
                  <Form.Label>受付開始</Form.Label>
                  <Col sm={2}>
                    <Form.Control type='number' />
                  </Col>
                  <Form.Label column sm={2}>
                    日前から
                  </Form.Label>
                </Form.Group>        
              </Col>
            </Row>

            <Form.Group className='mb-3' controlId='startDate'>
              <Row>
                <Form.Label>受付締め切り</Form.Label>
                <Col>
                  <Form.Check type='checkbox'
                              label='当日まで受付する'
                              inline
                              name='deadline'
                              onChange={() => setDeadlineToday(true)}
                              checked={deadlineToday} />
                  <Form.Check type='checkbox'
                              label='前日以前を指定する'
                              inline
                              name='deadline'
                              onChange={() => setDeadlineToday(false)}
                              checked={!deadlineToday} />
                </Col>
              </Row>
              {deadlineToday ? 
                <Row>
                  <Col>
                  <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
                    <Col sm={2}>
                      <Form.Control type='number' min='0' />
                    </Col>
                    <Form.Label column sm={4}>
                      時間前まで受付をする
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row> :
                <Row>
                <Col>
                <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
                  <Col sm={2}>
                    <Form.Control type='number' min='0' />
                  </Col>
                  <Form.Label column sm={4}>
                    日前まで受付をする
                  </Form.Label>
                </Form.Group>
              </Col>
            </Row>
              }
            </Form.Group>

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
