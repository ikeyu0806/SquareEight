import React, { useState, useEffect, ChangeEvent, useRef, createRef } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import axios from 'axios'
import { ResourceParam } from 'interfaces/ResourceParam'
import { QuestionnaireMasterParam } from 'interfaces/QuestionnaireMasterParam'
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'
import { TicketMasterParam } from 'interfaces/TicketMasterParam'
import { ReservableFrameTicketMasterParam } from 'interfaces/ReservableFrameTicketMasterParam'
import { getBase64 } from 'functions/getBase64'
import ReserveFrameRepeatSetting from './ReserveFrameRepeatSetting'
import TrashIcon from 'components/atoms/TrashIcon'
import RequireBadge from 'components/atoms/RequireBadge'
import { MultiPaymentMethod } from 'interfaces/MultiPaymentMethod'
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
          receptionDeadlineChanged,
          receptionDeadlineHourBeforeChanged,
          receptionDeadlineDayBeforeChanged,
          isLocalPaymentEnableChanged,
          isCreditCardPaymentEnableChanged,
          isTicketPaymentEnableChanged,
          applyMultiLocalPaymentPriceChanged,
          applyMultiCreditCardPaymentPriceChanged,
          multiLocalPaymentPricesChanged,
          multiCreditCardPaymentPricesChanged,
          isMonthlyPlanPaymentEnableChanged,
          reserveFrameReceptionTimesChanged,
          resourceIdsChanged,
          questionnaireMasterIdChanged,
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
  const receptionDeadline = useSelector((state: RootState) => state.reserveFrame.receptionDeadline)
  const receptionDeadlineHourBefore = useSelector((state: RootState) => state.reserveFrame.receptionDeadlineHourBefore)
  const receptionDeadlineDayBefore = useSelector((state: RootState) => state.reserveFrame.receptionDeadlineDayBefore)
  const reserveFrameReceptionTimes = useSelector((state: RootState) => state.reserveFrame.reserveFrameReceptionTimes)
  const isLocalPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isLocalPaymentEnable)
  const isCreditCardPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isCreditCardPaymentEnable)
  const isTicketPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isTicketPaymentEnable)
  const isMonthlyPlanPaymentEnable = useSelector((state: RootState) => state.reserveFrame.isMonthlyPlanPaymentEnable)
  const applyMultiLocalPaymentPrice = useSelector((state: RootState) => state.reserveFrame.applyMultiLocalPaymentPrice)
  const applyMultiCreditCardPaymentPrice = useSelector((state: RootState) => state.reserveFrame.applyMultiCreditCardPaymentPrice)
  const multiLocalPaymentPrices = useSelector((state: RootState) => state.reserveFrame.multiLocalPaymentPrices)
  const multiCreditCardPaymentPrices = useSelector((state: RootState) => state.reserveFrame.multiCreditCardPaymentPrices)
  const multiLocalPaymentNameRefs = useRef<any>([])
  multiLocalPaymentNameRefs.current = multiLocalPaymentPrices.map((_, i) => multiLocalPaymentNameRefs.current[i] ?? createRef())
  const multiCreditCardPaymentPriceRefs = useRef<any>([])
  multiCreditCardPaymentPriceRefs.current = multiCreditCardPaymentPrices.map((_, i) => multiCreditCardPaymentPriceRefs.current[i] ?? createRef())
  const resourceIds = useSelector((state: RootState) => state.reserveFrame.resourceIds)
  const questionnaireMasterId = useSelector((state: RootState) => state.reserveFrame.questionnaireMasterId)
  const monthlyPaymentPlanIds = useSelector((state: RootState) => state.reserveFrame.monthlyPaymentPlanIds)
  const reservableFrameTicketMaster = useSelector((state: RootState) => state.reserveFrame.reservableFrameTicketMaster)
  const s3ObjectPublicUrl = useSelector((state: RootState) => state.reserveFrame.s3ObjectPublicUrl)
  const receptionType = useSelector((state: RootState) => state.reserveFrame.receptionType)
  const isSetPrice = useSelector((state: RootState) => state.reserveFrame.isSetPrice)

  const [reserveFrameReceptionStartTime, setReserveFrameReceptionStartTime] = useState('')
  const [reserveFrameReceptionEndTime, setReserveFrameReceptionEndTime] = useState('')
  const [selectableResources, setSelectableResources] = useState<ResourceParam[]>([])
  const [selectedQuestionnaireMasters, setSelectedQuestionnaireMasters] = useState<QuestionnaireMasterParam[]>([])
  const [selectableTicketMasters, setSelectableTicketMasters] = useState<TicketMasterParam[]>([])
  const [selectableMonthlyPaymentPlans, setSelectableMonthlyPaymentPlans] = useState<MonthlyPaymentPlanParam[]>([])
  const [image, setImage] = useState('')
  const ticketRefs = useRef<any>([])

  useEffect(() => {
    const fetchRelatedData = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/reserve_frames/settable_relation_data`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        setSelectedQuestionnaireMasters(response.data.questionnaire_masters)
        setSelectableResources(response.data.resources)
        setSelectableMonthlyPaymentPlans(response.data.monthly_payment_plans)
        const ticketMasterResponse: TicketMasterParam[] = response.data.ticket_masters
        setSelectableTicketMasters(response.data.ticket_masters)
        ticketRefs.current = ticketMasterResponse.map((_, i) => ticketRefs.current[i] ?? createRef())
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchRelatedData()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

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

  // 現地払い関連メソッド
  const enableMultiLocalPaymentPriceForm = () => {
    dispatch(applyMultiLocalPaymentPriceChanged(true))
  }

  const updateMultiLocalPaymentName = (event: React.ChangeEvent<HTMLInputElement>, localPaymentNameRef: number) => {
    let updateLocalPaymentPrice: MultiPaymentMethod
    let updateLocalPaymentPrices: MultiPaymentMethod[]
    updateLocalPaymentPrices = []
    updateLocalPaymentPrice = {name: '', price: 0}
    updateLocalPaymentPrice.name = event.target.value
    updateLocalPaymentPrice.price = multiLocalPaymentPrices[localPaymentNameRef].price
    multiLocalPaymentPrices.map((p, i) => {
      if (i == localPaymentNameRef) {
        updateLocalPaymentPrices.push(updateLocalPaymentPrice)
      } else {
        updateLocalPaymentPrices.push(p)
      }
    })
    dispatch(multiLocalPaymentPricesChanged(updateLocalPaymentPrices))
  }

  const updateMultiLocalPaymentPrice = (event: React.ChangeEvent<HTMLInputElement>, localPaymentPriceRef: number) => {
    let updateLocalPaymentPrice: MultiPaymentMethod
    let updateLocalPaymentPrices: MultiPaymentMethod[]
    updateLocalPaymentPrices = []
    updateLocalPaymentPrice = {name: '', price: 0}
    updateLocalPaymentPrice.price = Number(event.target.value)
    updateLocalPaymentPrice.name = multiLocalPaymentPrices[localPaymentPriceRef].name
    multiLocalPaymentPrices.map((p, i) => {
      if (i == localPaymentPriceRef) {
        updateLocalPaymentPrices.push(updateLocalPaymentPrice)
      } else {
        updateLocalPaymentPrices.push(p)
      }
    })
    dispatch(multiLocalPaymentPricesChanged(updateLocalPaymentPrices))
  }

  const deleteMultiLocalPayment = (formNum: number) => {
    if (multiLocalPaymentPrices.length <= 2 ) {
      dispatch(applyMultiLocalPaymentPriceChanged(false))
      return
    }
    let updateLocalPaymentPrices: MultiPaymentMethod[]
    updateLocalPaymentPrices = []
    multiLocalPaymentPrices.map((p, i) => {
      if (i !== formNum) {
        updateLocalPaymentPrices.push(p)
      }
    })
    dispatch(multiLocalPaymentPricesChanged(updateLocalPaymentPrices))
  }

  const addLocalPaymentPriceForm = () => {
    let updateLocalPaymentPrices: MultiPaymentMethod[]
    updateLocalPaymentPrices = []
    multiLocalPaymentPrices.map((p, i) => {
      updateLocalPaymentPrices.push(p)
    })
    updateLocalPaymentPrices.push({name: '', price: 0})
    dispatch(multiLocalPaymentPricesChanged(updateLocalPaymentPrices))
  }

  // クレジットカード払い関連メソッド
  const enableMultiCreditCardPaymentPriceForm = () => {
    dispatch(applyMultiCreditCardPaymentPriceChanged(true))
  }

  const updateMultiCreditCardPaymentName = (event: React.ChangeEvent<HTMLInputElement>, creditCardPaymentNameRef: number) => {
    let updateCreditCardPaymentPrice: MultiPaymentMethod
    let updateCreditCardPaymentPrices: MultiPaymentMethod[]
    updateCreditCardPaymentPrices = []
    updateCreditCardPaymentPrice = {name: '', price: 0}
    updateCreditCardPaymentPrice.name = event.target.value
    updateCreditCardPaymentPrice.price = multiCreditCardPaymentPrices[creditCardPaymentNameRef].price
    multiCreditCardPaymentPrices.map((p, i) => {
      if (i == creditCardPaymentNameRef) {
        updateCreditCardPaymentPrices.push(updateCreditCardPaymentPrice)
      } else {
        updateCreditCardPaymentPrices.push(p)
      }
    })
    dispatch(multiCreditCardPaymentPricesChanged(updateCreditCardPaymentPrices))
  }
  
  const updateMultiCreditCardPaymentPrice = (event: React.ChangeEvent<HTMLInputElement>, CreditCardPaymentPriceRef: number) => {
    let updateCreditCardPaymentPrice: MultiPaymentMethod
    let updateCreditCardPaymentPrices: MultiPaymentMethod[]
    updateCreditCardPaymentPrices = []
    updateCreditCardPaymentPrice = {name: '', price: 0}
    updateCreditCardPaymentPrice.price = Number(event.target.value)
    updateCreditCardPaymentPrice.name = multiCreditCardPaymentPrices[CreditCardPaymentPriceRef].name
    multiCreditCardPaymentPrices.map((p, i) => {
      if (i == CreditCardPaymentPriceRef) {
        updateCreditCardPaymentPrices.push(updateCreditCardPaymentPrice)
      } else {
        updateCreditCardPaymentPrices.push(p)
      }
    })
    dispatch(multiCreditCardPaymentPricesChanged(updateCreditCardPaymentPrices))
  }
  
  const deleteMultiCreditCardPayment = (formNum: number) => {
    if (multiCreditCardPaymentPrices.length <= 2 ) {
      dispatch(applyMultiCreditCardPaymentPriceChanged(false))
      return
    }
    let updateCreditCardPaymentPrices: MultiPaymentMethod[]
    updateCreditCardPaymentPrices = []
    multiCreditCardPaymentPrices.map((p, i) => {
      if (i !== formNum) {
        updateCreditCardPaymentPrices.push(p)
      }
    })
    dispatch(multiCreditCardPaymentPricesChanged(updateCreditCardPaymentPrices))
  }

  const addCreditCardPaymentPriceForm = () => {
    let updateCreditCardPaymentPrices: MultiPaymentMethod[]
    updateCreditCardPaymentPrices = []
    multiLocalPaymentPrices.map((p, i) => {
      updateCreditCardPaymentPrices.push(p)
    })
    updateCreditCardPaymentPrices.push({name: '', price: 0})
    dispatch(multiCreditCardPaymentPricesChanged(updateCreditCardPaymentPrices))
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
            {isLocalPaymentEnable &&
            <Row>
              <Col>
              {!applyMultiLocalPaymentPrice && 
                <>
                  <Form.Group as={Row} className='mb-3'>
                    <Col sm={3}>
                      <Form.Control
                        value={localPaymentPrice}
                        onChange={(e) => dispatch(localPaymentPriceChanged(Number(e.target.value)))}
                        type='number'
                        min='0' />
                    </Col>
                    <Col sm={2}>
                      <Form.Label>
                        円
                      </Form.Label>
                    </Col>
                  </Form.Group>
                  <Row>
                    <Col sm={4}>
                      <Button
                        onClick={() => enableMultiLocalPaymentPriceForm()}
                        className='mb20 text-white'
                        variant='info'>料金種別を追加する</Button>
                    </Col>
                  </Row>
                </>}
              {applyMultiLocalPaymentPrice &&
                <>
                  {multiLocalPaymentPrices.map((p, local_pay_index) => {
                    return (
                      <Row key={local_pay_index}>
                        <Col sm={6}>
                          <Form.Label>種別</Form.Label>
                          <Form.Control
                            value={p.name}
                            onChange={(e: any) => updateMultiLocalPaymentName(e, local_pay_index)}
                            placeholder='大人'>
                          </Form.Control>
                        </Col>
                        <Col sm={3}>
                          <Form.Label>料金</Form.Label>
                          <Row>
                            <Col sm={10}>
                              <Form.Control placeholder='料金'
                                    value={p.price}
                                    min={0}
                                    type='number'
                                    onChange={(e: any) => updateMultiLocalPaymentPrice(e, local_pay_index)} />
                            </Col>
                            <Col sm={2}>
                              <a onClick={() => deleteMultiLocalPayment(local_pay_index)}><TrashIcon
                                width={20}
                                height={20}
                                fill={'#ff0000'}></TrashIcon></a>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    )
                  })}
                  <Button
                    onClick={() => addLocalPaymentPriceForm()}
                    className='mt10 text-white'
                    variant='info'>追加する</Button>
                </>
              }
              </Col>
            </Row>}
            {receptionType !== 'PhoneOnly' &&
            <Form.Check
              id='PhoneOnly'
              label='クレジットカード払い'
              checked={isCreditCardPaymentEnable}
              onChange={() => dispatch(isCreditCardPaymentEnableChanged(!isCreditCardPaymentEnable))}></Form.Check>}
            {isCreditCardPaymentEnable &&
            receptionType !== 'PhoneOnly' &&
            <Row>
              <Col>
              {!applyMultiCreditCardPaymentPrice &&
                <>
                  <Form.Group as={Row} className='mb-3'>
                    <Col sm={3}>
                      <Form.Control
                        value={creditCardPaymentPrice}
                        onChange={(e) => dispatch(creditCardPaymentPriceChanged(Number(e.target.value)))}
                        type='number'
                        min='0' />
                    </Col>
                    <Col sm={2}>
                      <Form.Label>
                        円
                      </Form.Label>
                    </Col>
                  </Form.Group>
                  <Row>
                    <Col sm={4}>
                      <Button
                        onClick={() => enableMultiCreditCardPaymentPriceForm()}
                        className='mb20 text-white'
                        variant='info'>料金種別を追加する</Button>
                    </Col>
                  </Row>
                </>
              }
              {applyMultiCreditCardPaymentPrice &&
                <>
                  {multiCreditCardPaymentPrices.map((p, credit_pay_index) => {
                    return (
                      <Row key={credit_pay_index}>
                        <Col sm={6}>
                          <Form.Label>種別</Form.Label>
                          <Form.Control
                            value={p.name}
                            onChange={(e: any) => updateMultiCreditCardPaymentName(e, credit_pay_index)}
                            placeholder='大人'>
                          </Form.Control>
                        </Col>
                        <Col sm={3}>
                          <Form.Label>料金</Form.Label>
                          <Row>
                            <Col sm={10}>
                              <Form.Control placeholder='料金'
                                    value={p.price}
                                    min={0}
                                    type='number'
                                    onChange={(e: any) => updateMultiCreditCardPaymentPrice(e, credit_pay_index)} />
                            </Col>
                            <Col sm={2}>
                              <a onClick={() => deleteMultiCreditCardPayment(credit_pay_index)}><TrashIcon
                                width={20}
                                height={20}
                                fill={'#ff0000'}></TrashIcon></a>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    )
                  })}
                  <Button
                    onClick={() => addCreditCardPaymentPriceForm()}
                    className='mt10 text-white'
                    variant='info'>追加する</Button>
                </>
              }
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
          <Form.Label>受付日<RequireBadge /></Form.Label>
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
                        checked={receptionDeadline === 'OnlyOnTheDay'}
                        onChange={() => dispatch(receptionDeadlineChanged('OnlyOnTheDay'))} />
            <Form.Check type='checkbox'
                        label='前日以前を指定する'
                        id='possibleBeforeTheDay'
                        inline
                        checked={receptionDeadline === 'PossibleBeforeTheDay'}
                        onChange={() => dispatch(receptionDeadlineChanged('PossibleBeforeTheDay'))} />
          </Col>
        </Row>
        {receptionDeadline === 'OnlyOnTheDay' ? 
          <Row>
            <Col>
            <Form.Group as={Row} className='mb-3'>
              <Col sm={2}>
                <Form.Control
                  value={receptionDeadlineHourBefore}
                  onChange={(e) => dispatch(receptionDeadlineHourBeforeChanged(Number(e.target.value)))}
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
                value={receptionDeadlineDayBefore}
                onChange={(e) => dispatch(receptionDeadlineDayBeforeChanged(Number(e.target.value)))}
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
              value={publishStatus || 'Unpublish'}
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

      <hr />

      <Form.Group className='mb-3'>
        <Form.Label>アンケート設定</Form.Label>
        <div>予約時にアンケートを受け付けることができます</div>
        <br />
        
        {selectedQuestionnaireMasters.length
        ?
          <>
            {selectedQuestionnaireMasters.map((questionnaire, i) => {
            return (
                <span key={i}>
                  <Form.Check
                    checked={questionnaireMasterId === questionnaire.id}
                    label={questionnaire.title}
                    name='reserveFrameQuestionnaireMaster'
                    id={'questionnaire' + String(i)}
                    onChange={() => dispatch(questionnaireMasterIdChanged(questionnaire.id))}
                    type='radio'></Form.Check>
                </span>
              )
            })}
          </>
        :
          <>
            アンケートが登録されていません
            <br/>
            <a href='/admin/questionnaire/master/new'
               target='_blank'
               rel='noreferrer'>
              アンケート登録
            </a></>}
      </Form.Group>

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
                    id={'resource' + String(i)}
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
