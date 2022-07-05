import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from '../../redux/store'
import axios from 'axios'
import { alertChanged } from 'redux/alertSlice'
import {  showReserveFrameModalChanged,
          startDateChanged,
          startTimeChanged,
          endDateChanged,
          endTimeChanged,
          titleChanged,
          descriptionChanged,
          isRepeatChanged,
          repeatIntervalChanged,
          repeatIntervalNumberChanged,
          capacityChanged,
          repeatEndDateChanged,
          localPaymentPriceChanged,
          publishStatusChanged,
          receptionTypeChanged,
          receptionStartDayBeforeChanged,
          cancelReceptionChanged,
          cancelReceptionHourBeforeChanged,
          cancelReceptionDayBeforeChanged } from 'redux/reserveFrameSlice'

const ReserveFrameModal = (): JSX.Element => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_smartlesson_session'])

  const showeserveFrameModal = useSelector((state: RootState) => state.reserveFrame.showeserveFrameModal)
  const title = useSelector((state: RootState) => state.reserveFrame.title)
  const description = useSelector((state: RootState) => state.reserveFrame.description)
  const startDate = useSelector((state: RootState) => state.reserveFrame.startDate)
  const startTime = useSelector((state: RootState) => state.reserveFrame.startTime)
  const endDate = useSelector((state: RootState) => state.reserveFrame.endDate)
  const endTime = useSelector((state: RootState) => state.reserveFrame.endTime)
  const capacity = useSelector((state: RootState) => state.reserveFrame.capacity)
  const isRepeat = useSelector((state: RootState) => state.reserveFrame.isRepeat)
  const repeatInterval = useSelector((state: RootState) => state.reserveFrame.repeatInterval)
  const repeatIntervalNumber = useSelector((state: RootState) => state.reserveFrame.repeatIntervalNumber)
  const repeatEndDate = useSelector((state: RootState) => state.reserveFrame.repeatEndDate)
  const localPaymentPrice = useSelector((state: RootState) => state.reserveFrame.localPaymentPrice)
  const publishStatus = useSelector((state: RootState) => state.reserveFrame.publishStatus)
  const receptionType = useSelector((state: RootState) => state.reserveFrame.receptionType)
  const receptionStartDayBefore = useSelector((state: RootState) => state.reserveFrame.receptionStartDayBefore)
  const cancelReception = useSelector((state: RootState) => state.reserveFrame.cancelReception)
  const cancelReceptionHourBefore = useSelector((state: RootState) => state.reserveFrame.cancelReceptionHourBefore)
  const cancelReceptionDayBefore = useSelector((state: RootState) => state.reserveFrame.cancelReceptionDayBefore)

  const [isSetPrice, setIsSetPrice] = useState(true)
  const [deadlineToday, setDeadlineToday] = useState(true)
  const [enableLocalPayment, setEnableLocalPayment] = useState(false)
  const [enableMonthlyPayment, setEnableMonthlyPayment] = useState(false)
  const [enableReservationTicket, setEnableReservationTicket] = useState(false)

  const createReserveFrame = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/reserve_frames`,
    {
      reserve_frame: {
        start_at: startDate + ' ' + startTime,
        end_at: endDate + ' ' + endTime,
        title: title,
        description: description,
        capacity: capacity,
        is_repeat: isRepeat,
        repeat_interval: repeatInterval,
        repeat_interval_number: repeatIntervalNumber,
        repeat_end_date: repeatEndDate,
        local_payment_price: localPaymentPrice,
        publish_status: publishStatus,
        reception_type: receptionType,
        reception_start_day_before: receptionStartDayBefore,
        cancel_reception: cancelReception,
        cancel_reception_hour_before: cancelReceptionHourBefore,
        cancel_reception_day_before: cancelReceptionDayBefore
      },
    },
    {
      headers: { 
        'Session-Id': cookies._smartlesson_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '予約枠を登録しました', show: true}))
      dispatch(showReserveFrameModalChanged(false))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <Modal show={showeserveFrameModal} size='lg'>
        <Modal.Header> 
          <Modal.Title>新規予約枠登録</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>メニュー名</Form.Label>
                  <Form.Control
                    value={title}
                    onChange={(e) => dispatch(titleChanged(e.target.value))}
                    placeholder='例 フィットネス60分レッスン' />
                </Form.Group>
              </Col>
              <Col>
              </Col>
            </Row>

            <Form.Group className='mb-3'>
              <Form.Label>メニュー説明文</Form.Label>
              <Form.Control
                placeholder='メニューの説明を入力してください'
                value={description}
                onChange={(e) => dispatch(descriptionChanged(e.target.value))}
                as='textarea'
                rows={3} />
            </Form.Group>

            <Form.Group className='mb-3'>

            <Form.Label>開始日時</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type='date'
                    value={startDate}
                    onChange={(e) =>  dispatch(startDateChanged(e.target.value))} />
                </Col>
                <Col>
                  <Form.Control
                    value={startTime}
                    onChange={(e) => dispatch(startTimeChanged(e.target.value))}
                    type='time' />
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>終了日時</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type='date'
                      value={endDate}
                      onChange={(e) =>  dispatch(endDateChanged(e.target.value))} />
                  </Col>
                  <Col>
                    <Form.Control
                      value={endTime}
                      onChange={(e) => dispatch(endTimeChanged(e.target.value))}
                      type='time' />
                  </Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
              </Form.Group>
            </Form>

            <Row>
              <Col>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label column sm={1}>
                    定員
                  </Form.Label>
                  <Col sm={2}>
                    <Form.Control
                      type='number'
                      value={capacity}
                      onChange={(e) => dispatch(capacityChanged(Number(e.target.value)))}
                      placeholder='1' />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className='mb-3'>
              <Form.Check
                type='checkbox'
                label='繰り返し設定を行う'
                checked={isRepeat}
                onClick={() => dispatch(isRepeatChanged(!isRepeat))} />
            </Form.Group>

            {isRepeat && <div className='ml20'>
              <Form.Group className='mb-3'>
                <Form.Check type='checkbox'
                            label='日ごと'
                            inline
                            name='repeatPeriod'
                            onChange={() => dispatch(repeatIntervalChanged('Day'))}
                            checked={repeatInterval === 'Day'} />
                <Form.Check type='checkbox'
                            label='週ごと'
                            inline
                            name='repeatPeriod'
                            onChange={() => dispatch(repeatIntervalChanged('Week'))}
                            checked={repeatInterval === 'Week'} />
                <Form.Check type='checkbox'
                            label='月ごと'
                            inline
                            name='repeatPeriod'
                            onChange={() => dispatch(repeatIntervalChanged('Month'))}
                            checked={repeatInterval === 'Month'} />
              </Form.Group>
              {repeatInterval === 'Day' &&
                <>
                  <Row>
                    <Col>
                    <Form.Group as={Row} className='mb-3'>
                      <Form.Label column sm={1}>
                        間隔
                      </Form.Label>
                      <Col sm={2}>
                        <Form.Control
                          type='number'
                          value={repeatIntervalNumber}
                          onChange={(e) => dispatch(repeatIntervalNumberChanged(Number(e.target.value)))}
                          placeholder='1' />
                      </Col>
                      <Form.Label column sm={2}>
                        日ごと
                      </Form.Label>
                    </Form.Group>
                    
                    </Col>
                  </Row>
                </>
              }
              {repeatInterval === 'Week' &&
                <>
                  <Row>
                    <Col>
                    <Form.Group as={Row} className='mb-3'>
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
              {repeatInterval === 'Month' &&
                <>
                  <Row>
                    <Col>
                      <Form.Group as={Row} className='mb-3'>
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

              <Form.Group className='mb-3'>
                <Row>
                  <Form.Label>繰り返し終了日時</Form.Label>
                  <Col>
                    <Form.Control
                      value={repeatEndDate}
                      onChange={(e) => dispatch(repeatEndDateChanged(e.target.value))}
                      placeholder='実施日時' type='date' />
                  </Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
              </Form.Group>

              <Row>
                <Form.Label>予約受付不可日</Form.Label>
                <div className='mt10 mb10'>なし</div>
                <Col>
                  <Form.Control placeholder='実施日時' type='date' />
                  <Button className='mt10'>予約受付不可日に追加</Button>
                </Col>
                <Col></Col>
                
              </Row>
            </div>}

            <Form.Group className='mb-3'>
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
                <Form.Check label='現地払い' checked={enableLocalPayment} onChange={() => setEnableLocalPayment(!enableLocalPayment)}></Form.Check>
                {enableLocalPayment && <Row>
                  <Col>
                    <Form.Group as={Row} className='mb-3'>
                      <Col sm={3}>
                        <Form.Control
                          value={localPaymentPrice}
                          onChange={(e) => dispatch(localPaymentPriceChanged(Number(e.target.value)))}
                          type='number'
                          min='0' />
                      </Col>
                      <Form.Label column sm={2}>
                        円
                      </Form.Label>
                    </Form.Group>
                  </Col>
                </Row>}
                <Form.Check label='月額課金' checked={enableMonthlyPayment} onChange={() => setEnableMonthlyPayment(!enableMonthlyPayment)}></Form.Check>
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
                      <Form.Group as={Row} className='mb-3'>
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
              <Form.Group className='mb-3'>
                <Form.Label>公開設定</Form.Label>
                <Form.Select placeholder='メニュー名' onChange={(e) => dispatch(publishStatusChanged(e.target.value))}>
                  <option value='Unpublish'>非公開</option>
                  <option value='Publish'>公開</option>
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
              <Form.Group className='mb-3'>
                <Form.Label>受付設定</Form.Label>
                <Form.Select
                  placeholder='メニュー名'
                  onChange={(e) => dispatch(receptionTypeChanged(e.target.value))} >
                  <option value='Immediate'>即時予約</option>
                  <option value='Temporary'>仮予約</option>
                  <option value='PhoneOnly'>電話のみ予約</option>
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
              <Form.Group as={Row} className='mb-3'>
                <Form.Label>受付開始</Form.Label>
                <Col sm={2}>
                  <Form.Control
                    value={receptionStartDayBefore}
                    onChange={(e) => dispatch(receptionStartDayBeforeChanged(Number(e.target.value)))}
                    type='number' />
                </Col>
                <Form.Label column sm={2}>
                  日前から
                </Form.Label>
              </Form.Group>        
            </Col>
          </Row>

          <Form.Group className='mb-3'>
            <Row>
              <Form.Label>受付締め切り</Form.Label>
              <Col>
                <Form.Check type='checkbox'
                            label='当日まで受付する'
                            inline
                            name='deadline'
                            checked={cancelReception === 'OnlyOnTheDay'}
                            onChange={() => dispatch(cancelReceptionChanged('OnlyOnTheDay'))} />
                <Form.Check type='checkbox'
                            label='前日以前を指定する'
                            inline
                            checked={cancelReception === 'PossibleBeforeTheDay'}
                            onChange={() => dispatch(cancelReceptionChanged('PossibleBeforeTheDay'))} />
              </Col>
            </Row>
            {cancelReception === 'OnlyOnTheDay' ? 
              <Row>
                <Col>
                <Form.Group as={Row} className='mb-3'>
                  <Col sm={2}>
                    <Form.Control
                      value={cancelReceptionHourBefore}
                      onChange={(e) => dispatch(cancelReceptionHourBeforeChanged(Number(e.target.value)))}
                      type='number'
                      min='0' />
                  </Col>
                  <Form.Label column sm={4}>
                    時間前まで受付をする
                  </Form.Label>
                </Form.Group>
              </Col>
            </Row> :
              <Row>
              <Col>
              <Form.Group as={Row} className='mb-3'>
                <Col sm={2}>
                  <Form.Control
                    value={cancelReceptionDayBefore}
                    onChange={(e) => dispatch(cancelReceptionDayBeforeChanged(Number(e.target.value)))}
                    type='number'
                    min='0' />
                </Col>
                <Form.Label column sm={4}>
                  日前まで受付をする
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>リソース設定</Form.Label>
            <br />
            リソースが設定されていません
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={() => dispatch(showReserveFrameModalChanged(false))}>閉じる</Button>
          <Button variant='primary' onClick={createReserveFrame}>登録する</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ReserveFrameModal
