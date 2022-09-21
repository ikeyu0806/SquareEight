import React, { useState, useEffect, ChangeEvent, useRef, createRef } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import axios from 'axios'
import { ResourceParam } from 'interfaces/ResourceParam'
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'
import { TicketMasterParam } from 'interfaces/TicketMasterParam'
import { ReservableFrameTicketMasterParam } from 'interfaces/ReservableFrameTicketMasterParam'
import { getBase64 } from 'functions/getBase64'
import ReserveFrameRepeatSetting from './ReserveFrameRepeatSetting'
import TrashIcon from 'components/atoms/TrashIcon'
import RequireBadge from 'components/atoms/RequireBadge'
import {  startDateChanged,
          titleChanged,
          descriptionChanged,
          capacityChanged,
          localPaymentPriceChanged,
          creditCardPaymentPriceChanged,
          publishStatusChanged,
          receptionTypeChanged,
          receptionPhoneNumberChanged,
          receptionStartDayBeforeChanged,
          cancelReceptionChanged,
          cancelReceptionHourBeforeChanged,
          cancelReceptionDayBeforeChanged,
          isLocalPaymentEnableChanged,
          isCreditCardPaymentEnableChanged,
          isTicketPaymentEnableChanged,
          isMonthlyPlanPaymentEnableChanged,
          reserveFrameReceptionTimesChanged,
          resourceIdsChanged,
          monthlyPaymentPlanIdsChanged,
          reservableFrameTicketMasterChanged,
          base64ImageChanged,
          isSetPriceChanged } from 'redux/reserveFrameSlice'

const ReserveFrameForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const title = useSelector((state: RootState) => state.reserveFrame.title)
  const description = useSelector((state: RootState) => state.reserveFrame.description)
  const startDate = useSelector((state: RootState) => state.reserveFrame.startDate)
  const capacity = useSelector((state: RootState) => state.reserveFrame.capacity)
  const localPaymentPrice = useSelector((state: RootState) => state.reserveFrame.localPaymentPrice)
  const creditCardPaymentPrice = useSelector((state: RootState) => state.reserveFrame.creditCardPaymentPrice)
  const publishStatus = useSelector((state: RootState) => state.reserveFrame.publishStatus)
  const receptionStartDayBefore = useSelector((state: RootState) => state.reserveFrame.receptionStartDayBefore)
  const receptionPhoneNumber = useSelector((state: RootState) => state.reserveFrame.receptionPhoneNumber)
  const cancelReception = useSelector((state: RootState) => state.reserveFrame.cancelReception)
  const cancelReceptionHourBefore = useSelector((state: RootState) => state.reserveFrame.cancelReceptionHourBefore)
  const cancelReceptionDayBefore = useSelector((state: RootState) => state.reserveFrame.cancelReceptionDayBefore)
  const reserveFrameReceptionTimes = useSelector((state: RootState) => state.reserveFrame.reserveFrameReceptionTimes)
  const isLocalPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isLocalPaymentEnable)
  const isCreditCardPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isCreditCardPaymentEnable)
  const isTicketPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isTicketPaymentEnable)
  const isMonthlyPlanPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isMonthlyPlanPaymentEnable)
  const resourceIds = useSelector((state: RootState) => state.reserveFrame.resourceIds)
  const monthlyPaymentPlanIds = useSelector((state: RootState) => state.reserveFrame.monthlyPaymentPlanIds)
  const reservableFrameTicketMaster = useSelector((state: RootState) => state.reserveFrame.reservableFrameTicketMaster)
  const s3ObjectPublicUrl = useSelector((state: RootState) => state.reserveFrame.s3ObjectPublicUrl)
  const receptionType = useSelector((state: RootState) => state.reserveFrame.receptionType)
  const isSetPrice = useSelector((state: RootState) => state.reserveFrame.isSetPrice)

  const [reserveFrameReceptionStartTime, setReserveFrameReceptionStartTime] = useState('')
  const [reserveFrameReceptionEndTime, setReserveFrameReceptionEndTime] = useState('')
  const [selectableResources, setSelectableResources] = useState<ResourceParam[]>([])
  const [selectableTicketMasters, setSelectableTicketMasters] = useState<TicketMasterParam[]>([])
  const [selectableMonthlyPaymentPlans, setSelectableMonthlyPaymentPlans] = useState<MonthlyPaymentPlanParam[]>([])
  const [image, setImage] = useState('')
  const ticketRefs = useRef<any>([])

  useEffect(() => {
    const fetchResources = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames/settable_relation_data`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
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
  }, [router.query.id, cookies._square_eight_merchant_session])

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
    getBase64(files[0]).then(
      data => dispatch(base64ImageChanged(data))
    )
  }

  const addReserveFrameReceptionTimes = () => {
    if (!reserveFrameReceptionStartTime || !reserveFrameReceptionEndTime) {
      return
    }
    const startAt = reserveFrameReceptionStartTime
    const endAt = reserveFrameReceptionEndTime
    dispatch((reserveFrameReceptionTimesChanged([...reserveFrameReceptionTimes, { reception_start_time: startAt, reception_end_time: endAt }])))
  }

  const deleteReserveFrameReceptionTimes = (startAt: string, endAt: string) => {
    let updateReserveFrameReceptionTimes = reserveFrameReceptionTimes
    // filterの複数条件うまく動かないのでstart_atとend_at繋げた文字列でfilter
    updateReserveFrameReceptionTimes = updateReserveFrameReceptionTimes.filter(time => (time.reception_start_time + time.reception_end_time) !== (startAt + endAt))
    dispatch(reserveFrameReceptionTimesChanged(updateReserveFrameReceptionTimes))
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
    reservableFrameTicketMasterData = reservableFrameTicketMaster.filter(ticketMaster => ticketMaster.ticket_master_id !== ticketId)
    reservableFrameTicketMasterData.push({ticket_master_id: ticketId, consume_number: ticketRefs.current[ticketRefNumber].current?.value })
    dispatch(reservableFrameTicketMasterChanged(reservableFrameTicketMasterData))
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

  const validateAddReserveFrameReceptionTimes = () => {
    if (!reserveFrameReceptionStartTime && !reserveFrameReceptionEndTime) {
      return true
    }
    if (reserveFrameReceptionStartTime >= reserveFrameReceptionEndTime) {
      return true
    }
    return false
  }

  return (
    <>
      <Form>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>メニュー名<RequireBadge /></Form.Label>
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
            rows={20} />
        </Form.Group>

        {image && <img
          className='d-block w-100 mt30'
          src={image}
          alt='image'
        />}
        {s3ObjectPublicUrl && !image && <img
          className='d-block w-100 mt30'
          src={s3ObjectPublicUrl}
          alt='image'
        />}
        <Form.Group className='mb-3'>
          <Form.Label className='mt10'>イメージ画像</Form.Label>
          <Form.Control type="file" onChange={handleChangeFile} />
        </Form.Group>

        <hr/>

        <Row>
          <Col>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={2}>
                定員
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  type='number'
                  min={1}
                  value={capacity}
                  onChange={(e) => dispatch(capacityChanged(Number(e.target.value)))} />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <hr/>

        <Form.Group className='mb-3'>
          <Row>
            <Form.Label>料金</Form.Label>
            <Col>
            <Form.Group>
              <Form.Check type='checkbox'
                            label='設定する'
                            inline
                            id='setPrice'
                            name='price'
                            onChange={() => dispatch(isSetPriceChanged(true))}
                            checked={isSetPrice} />
              <Form.Check type='checkbox'
                          label='設定しない'
                          id='notSetPrice'
                          inline
                          name='price'
                          onChange={() => dispatch(isSetPriceChanged(false))}
                          checked={!isSetPrice} />
            </Form.Group>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          {isSetPrice &&
          <div className='ml10'>
            <Form.Check
              label='現地払い'
              id='localPayment'
              checked={isLocalPaymentEnable}
              onChange={() => dispatch(isLocalPaymentEnableChanged(!isLocalPaymentEnable))}></Form.Check>
            {isLocalPaymentEnable && <Row>
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
            {receptionType !== 'PhoneOnly' &&
            <Form.Check
              id='PhoneOnly'
              label='クレジットカード払い'
              checked={isCreditCardPaymentEnable}
              onChange={() => dispatch(isCreditCardPaymentEnableChanged(!isCreditCardPaymentEnable))}></Form.Check>}
            {isCreditCardPaymentEnable && receptionType !== 'PhoneOnly' && <Row>
              <Col>
                <Form.Group as={Row} className='mb-3'>
                  <Col sm={3}>
                    <Form.Control
                      value={creditCardPaymentPrice}
                      onChange={(e) => dispatch(creditCardPaymentPriceChanged(Number(e.target.value)))}
                      type='number'
                      min='0' />
                  </Col>
                  <Form.Label column sm={2}>
                    円
                  </Form.Label>
                </Form.Group>
              </Col>
            </Row>}
            {receptionType !== 'PhoneOnly' &&
              <Form.Check
                label='月額課金'
                id='monthlyPlanPayment'
                checked={isMonthlyPlanPaymentEnable}
                onChange={() => dispatch(isMonthlyPlanPaymentEnableChanged(!isMonthlyPlanPaymentEnable))}></Form.Check>}
            {isMonthlyPlanPaymentEnable && receptionType !== 'PhoneOnly' && 
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
                                        id={plan.name + String(i)}
                                        name={plan.name}
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
            {receptionType !== 'PhoneOnly' &&
              <Form.Check
                label='回数券'
                id='ticketPayment'
                checked={isTicketPaymentEnable}
                onChange={() => dispatch(isTicketPaymentEnableChanged(!isTicketPaymentEnable))}></Form.Check>}
            {isTicketPaymentEnable && receptionType !== 'PhoneOnly' && 
              <div className='ml20'>
                {selectableTicketMasters.map((ticket, i) => {
                  return (
                    <span key={i}>
                      <Form.Check type='checkbox'
                                  label={ticket.name}
                                  inline
                                  id={ticket.name + i}
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

        <hr/>

        <Form.Group className='mb-3'>
          <Form.Label>受付日</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type='date'
                  value={startDate}
                  onChange={(e) =>  dispatch(startDateChanged(e.target.value))} />
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </Form.Group>
        </Form>
    
        <Form.Group className='mb-3'>
          <Form.Label>受付時刻<RequireBadge /></Form.Label>
            <br/>
            {reserveFrameReceptionTimes.length
              ?
                <>
                  {reserveFrameReceptionTimes.map((times, i) => {
                    return (
                      <div key={i} className='mb10'>
                        <span>開始時刻: {times.reception_start_time}</span><br/>
                        <span>終了時刻: {times.reception_end_time}</span>
                        <a className='color-black none-under-decoration ml10'
                           onClick={() => deleteReserveFrameReceptionTimes(times.reception_start_time, times.reception_end_time)}>
                          <TrashIcon width={20} height={20} fill={'#ff0000'}></TrashIcon>
                        </a>
                      </div>
                    )
                  })}
                </>
              :
                <div className='mt10 mb10'>受付時刻が設定されていません</div>
            }
        </Form.Group>
    
        <Form.Group className='mb-3 mt10'>
          <Row>
            <Col>
              <Form.Label>開始時刻</Form.Label>
              <Form.Control
                      value={reserveFrameReceptionStartTime}
                      type='time'
                      onChange={(e) =>  setReserveFrameReceptionStartTime(e.target.value)} />
            </Col>
            <Col>
              <Form.Label>終了時刻</Form.Label>
              <Form.Control
                      value={reserveFrameReceptionEndTime}
                      type='time'
                      onChange={(e) =>  setReserveFrameReceptionEndTime(e.target.value)} />
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Button
            disabled={validateAddReserveFrameReceptionTimes()}
            className='mt20'
            onClick={addReserveFrameReceptionTimes}>開始/終了時刻に追加</Button>
        </Form.Group>

        <ReserveFrameRepeatSetting></ReserveFrameRepeatSetting>

        <hr/>

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
            {receptionType === 'PhoneOnly' && <div className='mt10 mb20'>
              <Form.Label>受付電話番号</Form.Label>
              <Form.Control
                value={receptionPhoneNumber}
                onChange={(e) => dispatch(receptionPhoneNumberChanged(e.target.value))}></Form.Control>
            </div>}
          </Col>
          <Col>
          </Col>
          <Col>
          </Col>
        </Row>

        <hr/>

      <Row>
        <Col>
          <Form.Group as={Row} className='mb-3'>
            <Form.Label>受付開始</Form.Label>
            <Col sm={2}>
              <Form.Control
                min={1}
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
                        id='onlyOntheDay'
                        inline
                        name='deadline'
                        checked={cancelReception === 'OnlyOnTheDay'}
                        onChange={() => dispatch(cancelReceptionChanged('OnlyOnTheDay'))} />
            <Form.Check type='checkbox'
                        label='前日以前を指定する'
                        id='possibleBeforeTheDay'
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
                  min='1' />
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

      <hr/>

      <Row>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label>公開設定</Form.Label>
            <Form.Select
              value={publishStatus}
              onChange={(e) => dispatch(publishStatusChanged(e.target.value))}>
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

      <hr/>

      <Form.Group className='mb-3'>
        <Form.Label>リソース設定</Form.Label>
        <br />
        
        {selectableResources.length
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
          <>
            リソースが登録されていません
            <br/>
            <a href='/admin/resource/new'
               target='_blank'
               rel='noreferrer'>
              リソース登録
            </a></>}
      </Form.Group>
    </>
  )
}

export default ReserveFrameForm
