import React, { useState, useEffect, ChangeEvent, useRef, createRef } from 'react'
import { useRouter } from 'next/router'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from '../../redux/store'
import axios from 'axios'
import { alertChanged } from 'redux/alertSlice'
import { ResourceParam } from 'interfaces/ResourceParam'
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'
import { TicketMasterParam } from 'interfaces/TicketMasterParam'
import { ReservableFrameTicketMasterParam } from 'interfaces/ReservableFrameTicketMasterParam'
import {  showReserveFrameModalChanged,
          startDateChanged,
          startTimeChanged,
          endDateChanged,
          endTimeChanged,
          titleChanged,
          descriptionChanged,
          isRepeatChanged,
          repeatIntervalTypeChanged,
          repeatIntervalNumberDayChanged,
          repeatIntervalNumberWeekChanged,
          repeatIntervalNumberMonthChanged,
          repeatIntervalMonthDateChanged,
          capacityChanged,
          repeatEndDateChanged,
          localPaymentPriceChanged,
          publishStatusChanged,
          receptionTypeChanged,
          receptionStartDayBeforeChanged,
          cancelReceptionChanged,
          cancelReceptionHourBeforeChanged,
          cancelReceptionDayBeforeChanged,
          unreservableFramesChanged, 
          resourceIdsChanged,
          monthlyPaymentPlanIdsChanged,
          reservableFrameTicketMasterChanged } from 'redux/reserveFrameSlice'
import resourceSlice from 'redux/resourceSlice'

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
  const repeatIntervalType = useSelector((state: RootState) => state.reserveFrame.repeatIntervalType)
  const repeatIntervalNumberDay = useSelector((state: RootState) => state.reserveFrame.repeatIntervalNumberDay)
  const repeatIntervalNumberWeek = useSelector((state: RootState) => state.reserveFrame.repeatIntervalNumberWeek)
  const repeatIntervalNumberMonth = useSelector((state: RootState) => state.reserveFrame.repeatIntervalNumberMonth)
  const repeatIntervalMonthDate = useSelector((state: RootState) => state.reserveFrame.repeatIntervalMonthDate)
  const repeatEndDate = useSelector((state: RootState) => state.reserveFrame.repeatEndDate)
  const localPaymentPrice = useSelector((state: RootState) => state.reserveFrame.localPaymentPrice)
  const publishStatus = useSelector((state: RootState) => state.reserveFrame.publishStatus)
  const receptionType = useSelector((state: RootState) => state.reserveFrame.receptionType)
  const receptionStartDayBefore = useSelector((state: RootState) => state.reserveFrame.receptionStartDayBefore)
  const cancelReception = useSelector((state: RootState) => state.reserveFrame.cancelReception)
  const cancelReceptionHourBefore = useSelector((state: RootState) => state.reserveFrame.cancelReceptionHourBefore)
  const cancelReceptionDayBefore = useSelector((state: RootState) => state.reserveFrame.cancelReceptionDayBefore)
  const unreservableFrames = useSelector((state: RootState) => state.reserveFrame.unreservableFrames)
  const resourceIds = useSelector((state: RootState) => state.reserveFrame.resourceIds)
  const monthlyPaymentPlanIds = useSelector((state: RootState) => state.reserveFrame.monthlyPaymentPlanIds)
  const reservableFrameTicketMaster = useSelector((state: RootState) => state.reserveFrame.reservableFrameTicketMaster)

  const [isSetPrice, setIsSetPrice] = useState(true)
  const [enableLocalPayment, setEnableLocalPayment] = useState(false)
  const [enableMonthlyPayment, setEnableMonthlyPayment] = useState(false)
  const [enableReservationTicket, setEnableReservationTicket] = useState(false)
  const [unreservableFramesStartDate, setUnreservableFramesStartDate] = useState('')
  const [unreservableFramesStartTime, setUnreservableFramesStartTime] = useState('')
  const [unreservableFramesEndDate, setUnreservableFramesEndDate] = useState('')
  const [unreservableFramesEndTime, setUnreservableFramesEndTime] = useState('')
  const [selectableResources, setSelectableResources] = useState<ResourceParam[]>([])
  const [selectableTicketMasters, setSelectableTicketMasters] = useState<TicketMasterParam[]>([])
  const [selectableMonthlyPaymentPlans, setSelectableMonthlyPaymentPlans] = useState<MonthlyPaymentPlanParam[]>([])
  const ticketRefs = useRef<any>([])

  useEffect(() => {
    const fetchResources = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames/settable_relation_data`, {
          headers: { 
            'Session-Id': cookies._smartlesson_session
          },
        }
      )
      .then(function (response) {
        console.log(response)
        const resourceResponse: ResourceParam[] = response.data.resources
        setSelectableResources(resourceResponse)
        const ticketMasterResponse: TicketMasterParam[] = response.data.ticket_masters
        setSelectableTicketMasters(ticketMasterResponse)
        const monthlyPaymentPlanResponse: MonthlyPaymentPlanParam[] = response.data.monthly_payment_plans
        setSelectableMonthlyPaymentPlans(monthlyPaymentPlanResponse)
        ticketRefs.current = ticketMasterResponse.map((_, i) => ticketRefs.current[i] ?? createRef())
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchResources()
  }, [router.query.id, cookies._smartlesson_session])

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
        repeat_interval_type: repeatIntervalType,
        repeat_interval_number_day: repeatIntervalNumberDay,
        repeat_interval_number_week: repeatIntervalNumberWeek,
        repeat_interval_number_month: repeatIntervalNumberMonth,
        repeat_interval_number_month_date: repeatIntervalMonthDate,
        repeat_end_date: repeatEndDate,
        local_payment_price: localPaymentPrice,
        publish_status: publishStatus,
        reception_type: receptionType,
        reception_start_day_before: receptionStartDayBefore,
        cancel_reception: cancelReception,
        unreservable_frames: unreservableFrames,
        resource_ids: resourceIds,
        monthly_payment_plan_ids: monthlyPaymentPlanIds
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

  const addUnreservableFrames = () => {
    const startAt = unreservableFramesStartDate + ' ' + unreservableFramesStartTime
    const endAt = unreservableFramesEndDate + ' ' + unreservableFramesEndTime
    dispatch((unreservableFramesChanged([...unreservableFrames, { start_at: startAt, end_at: endAt }])))
  }

  const updateMonthlyPaymentPlans = (e: ChangeEvent) => {
    const target = e.target as any
    let monthlyPaymentPlanData: number[]
    const planId = target.value
    if (target.checked === true) {
      monthlyPaymentPlanData = [...monthlyPaymentPlanIds, Number(planId)]
      dispatch(monthlyPaymentPlanIdsChanged(monthlyPaymentPlanData))
    } else {
      monthlyPaymentPlanData = monthlyPaymentPlanIds.filter(id => id !== Number(planId))
      dispatch(monthlyPaymentPlanIdsChanged(monthlyPaymentPlanData))
    }
  }

  const updateTicketMasters = (e: ChangeEvent, ticketId: number, ticketRefNumber: number) => {
    const target = e.target as any
    let reservableFrameTicketMasterData: ReservableFrameTicketMasterParam[]
    if (target.checked === true) {
      reservableFrameTicketMasterData = [...reservableFrameTicketMaster, { ticket_master_id: ticketId, consume_number: ticketRefs.current[ticketRefNumber].current?.value }]
      dispatch(reservableFrameTicketMasterChanged(reservableFrameTicketMasterData))
    } else {
      reservableFrameTicketMasterData = reservableFrameTicketMaster.filter(ticketMaster => ticketMaster.ticket_master_id !== ticketId)
      dispatch(reservableFrameTicketMasterChanged(reservableFrameTicketMasterData))
    }
  }

  const updateTicketMasterConsumeNumber = (ticketId: number, ticketRefNumber: number) => {
    let reservableFrameTicketMasterData: ReservableFrameTicketMasterParam[]
    reservableFrameTicketMasterData = reservableFrameTicketMaster
    if (reservableFrameTicketMasterData.find(ticketMaster => ticketMaster.ticket_master_id === ticketId) !== undefined) {
      reservableFrameTicketMasterData.find(ticketMaster => ticketMaster.ticket_master_id === ticketId).consume_number = ticketRefNumber
    }
  }

  const updateResourceIds = (resourceId: number) => {
    let filterResourceIds: number[]
    if (resourceIds.includes(resourceId)) {
      filterResourceIds = resourceIds.filter((id) => id !== resourceId)
    } else {

      filterResourceIds = [...resourceIds, resourceId]
    }
    dispatch(resourceIdsChanged(filterResourceIds))
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
                            onChange={() => dispatch(repeatIntervalTypeChanged('Day'))}
                            checked={repeatIntervalType === 'Day'} />
                <Form.Check type='checkbox'
                            label='週ごと'
                            inline
                            name='repeatPeriod'
                            onChange={() => dispatch(repeatIntervalTypeChanged('Week'))}
                            checked={repeatIntervalType === 'Week'} />
                <Form.Check type='checkbox'
                            label='月ごと'
                            inline
                            name='repeatPeriod'
                            onChange={() => dispatch(repeatIntervalTypeChanged('Month'))}
                            checked={repeatIntervalType === 'Month'} />
              </Form.Group>
              {repeatIntervalType === 'Day' &&
                <>
                  <Row>
                    <Col>
                    <Form.Group as={Row} className='mb-3'>
                      <Form.Label column sm={1}>
                        間隔
                      </Form.Label>
                      <Col sm={2}>
                        <Form.Control
                          min={1}
                          max={31}
                          type='number'
                          value={repeatIntervalNumberDay}
                          onChange={(e) => dispatch(repeatIntervalNumberDayChanged(Number(e.target.value)))}
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
              {repeatIntervalType === 'Week' &&
                <>
                  <Row>
                    <Col>
                    <Form.Group as={Row} className='mb-3'>
                      <Form.Label column sm={1}>
                        間隔
                      </Form.Label>
                      <Col sm={2}>
                        <Form.Control
                          min={1}
                          type='number'
                          value={repeatIntervalNumberWeek}
                          onChange={(e) => dispatch(repeatIntervalNumberWeekChanged(Number(e.target.value)))}
                          placeholder='1' />
                      </Col>
                      <Form.Label column sm={2}>
                        週ごと
                      </Form.Label>
                    </Form.Group>
                    
                    </Col>
                  </Row>
                </>
              }
              {repeatIntervalType === 'Month' &&
                <>
                  <Row>
                    <Col>
                      <Form.Group as={Row} className='mb-3'>
                        <Col sm={2}>
                          <Form.Control
                            min={1}
                            max={12}
                            value={repeatIntervalNumberMonth}
                            onChange={(e) => dispatch(repeatIntervalNumberMonthChanged(Number(e.target.value)))}
                            type='number' />
                        </Col>
                        <Form.Label column sm={2}>
                          ヶ月ごとの
                        </Form.Label>
                        <Col sm={2}>
                          <Form.Control
                            min={1}
                            max={31}
                            value={repeatIntervalMonthDate}
                            onChange={(e) => dispatch(repeatIntervalMonthDateChanged(Number(e.target.value)))}
                            type='number' />
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
                      placeholder='繰り返し終了日時'
                      type='date' />
                  </Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
              </Form.Group>

              <Row>
                <Form.Label>予約受付不可日時</Form.Label>
                {unreservableFrames.length
                ?
                  <>
                    {unreservableFrames.map((frame, i) => {
                      return (
                        <span key={i}>
                          <span>開始日時: {frame.start_at}</span><br/>
                          <span>終了日時: {frame.end_at}</span>
                        </span>
                      )
                    })}
                  </>
                :
                  <div className='mt10 mb10'>なし</div>
                }
                <Col>
                  <Form.Group>
                  <Form.Label>予約不可開始日時</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          type='date'
                          value={unreservableFramesStartDate}
                          onChange={(e) =>  setUnreservableFramesStartDate(e.target.value)} />
                      </Col>
                      <Col>
                        <Form.Control
                          value={unreservableFramesStartTime}
                          type='time'
                          onChange={(e) =>  setUnreservableFramesStartTime(e.target.value)} />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>予約不可終了日時</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          type='date'
                          value={unreservableFramesEndDate}
                          onChange={(e) =>  setUnreservableFramesEndDate(e.target.value)} />
                      </Col>
                      <Col>
                        <Form.Control
                          value={unreservableFramesEndTime}
                          type='time'
                          onChange={(e) =>  setUnreservableFramesEndTime(e.target.value)} />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Button className='mt10' onClick={addUnreservableFrames}>予約受付不可日時に追加</Button>
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
                          {selectableMonthlyPaymentPlans.map((plan, i) => {
                            return (
                              <span key={i}>
                                <Form.Check type='checkbox'
                                            label={plan.name}
                                            inline
                                            value={plan.id}
                                            onChange={(e) => updateMonthlyPaymentPlans(e)}
                                            checked={monthlyPaymentPlanIds.includes(plan.id)} />
                                <br />
                              </span>
                            )
                          })}
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                }
                <Form.Check label='回数券' checked={enableReservationTicket} onChange={() => setEnableReservationTicket(!enableReservationTicket)}></Form.Check>
                {enableReservationTicket && 
                  <div className='ml20'>
                    {selectableTicketMasters.map((ticket, i) => {
                      return (
                        <span key={i}>
                          <Form.Check type='checkbox'
                                      label={ticket.name}
                                      inline
                                      name='oneWeek'
                                      onChange={(e) => updateTicketMasters(e, ticket.id, i)}
                                      checked={reservableFrameTicketMaster.map((json) => json.ticket_master_id).includes(ticket.id)} />
                          <Row>
                            <Col>
                            <Form.Group as={Row} className='mb-3'>
                              <Form.Label column sm={2}>
                                消費枚数
                              </Form.Label>
                              <Col sm={2}>
                                <Form.Control
                                  ref={ticketRefs.current[i]}
                                  defaultValue={1}
                                  type='number'
                                  onChange={() => updateTicketMasterConsumeNumber(ticket.id, i)}
                                  min={1} />
                              </Col>
                              <Form.Label column sm={2}>
                                枚
                              </Form.Label>
                            </Form.Group>
                            </Col>
                          </Row>
                        </span>
                      )
                    })}
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
            {resourceSlice.length
            ?
              <>
                {selectableResources.map((resource, i) => {
                return (
                    <span key={i}>
                      <Form.Check
                        checked={resourceIds.includes(resource.id)}
                        label={resource.name}
                        onChange={() => updateResourceIds(resource.id)}
                        type='checkbox'></Form.Check>
                    </span>
                  )
                })}
              </>
            :
              <>リソースが登録されていません</>}
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
