import React, { useState } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import TrashIcon from 'components/atoms/TrashIcon'
import { UnreservableFrameParam } from 'interfaces/UnreservableFrameParam'
import { OutOfRepeatReservableFrameParam } from 'interfaces/OutOfRepeatReservableFrameParam'
import RequireBadge from 'components/atoms/RequireBadge'
import {
  isRepeatChanged,
  isEveryDayRepeatChanged,
  isEveryWeekRepeatChanged,
  isEveryMonthRepeatChanged,
  repeatIntervalTypeChanged,
  repeatIntervalNumberDayChanged,
  repeatIntervalNumberWeekChanged,
  repeatIntervalNumberMonthChanged,
  repeatIntervalMonthDateChanged,
  outOfRangeFramesChanged,
  unreservableFramesChanged,
  repeatEndDateChanged,
  repeatWDaysChanged } from 'redux/reserveFrameSlice'

const ReserveFrameRepeatSetting = () => {
  const dispatch = useDispatch()
  const isRepeat = useSelector((state: RootState) => state.reserveFrame.isRepeat)
  const [outOfRangeFramesStartDate, setOutOfRangeFramesStartDate] = useState('')
  const [outOfRangeFramesEndDate, setOutOfRangeFramesEndDate] = useState('')
  const [unreservableFramesStartDate, setUnreservableFramesStartDate] = useState('')
  const [unreservableFramesEndDate, setUnreservableFramesEndDate] = useState('')
  const repeatIntervalType = useSelector((state: RootState) => state.reserveFrame.repeatIntervalType)
  const repeatIntervalNumberDay = useSelector((state: RootState) => state.reserveFrame.repeatIntervalNumberDay)
  const repeatIntervalNumberWeek = useSelector((state: RootState) => state.reserveFrame.repeatIntervalNumberWeek)
  const repeatIntervalNumberMonth = useSelector((state: RootState) => state.reserveFrame.repeatIntervalNumberMonth)
  const repeatIntervalMonthDate = useSelector((state: RootState) => state.reserveFrame.repeatIntervalMonthDate)
  const repeatWDays = useSelector((state: RootState) => state.reserveFrame.repeatWDays)
  const isEveryDayRepeat = useSelector((state: RootState) => state.reserveFrame.isEveryDayRepeat)
  const isEveryWeekRepeat = useSelector((state: RootState) => state.reserveFrame.isEveryWeekRepeat)
  const isEveryMonthRepeat = useSelector((state: RootState) => state.reserveFrame.isEveryMonthRepeat)
  const repeatEndDate = useSelector((state: RootState) => state.reserveFrame.repeatEndDate)
  const outOfRangeFrames = useSelector((state: RootState) => state.reserveFrame.outOfRangeFrames)
  const unreservableFrames = useSelector((state: RootState) => state.reserveFrame.unreservableFrames)

  const addOutOfRangeReservableFrames = () => {
    const startAt = outOfRangeFramesStartDate
    const endAt = outOfRangeFramesEndDate
    dispatch((outOfRangeFramesChanged([...outOfRangeFrames, { start_at: startAt, end_at: endAt }])))
    setOutOfRangeFramesStartDate('')
    setOutOfRangeFramesEndDate('')
  }

  const addUnreservableFrames = () => {
    const startAt = unreservableFramesStartDate
    const endAt = unreservableFramesEndDate
    dispatch((unreservableFramesChanged([...unreservableFrames, { start_at: startAt, end_at: endAt }])))
    setUnreservableFramesStartDate('')
    setUnreservableFramesEndDate('')
  }

  const validateAddOutOfRangeFrame = () => {
    // 入力されているか
    if (!outOfRangeFramesStartDate) {
      return true
    }
    // 開始日が終了日以降になってないか
    if (outOfRangeFramesEndDate) {
      if (outOfRangeFramesStartDate >= outOfRangeFramesEndDate) {
        return true
      }
    }
    return false
  }

  const validateAddUnreservableFrame = () => {
    // 入力されているか
    if (!unreservableFramesStartDate) {
      return true
    }
    // 開始日が終了日以降になってないか
    if (unreservableFramesEndDate) {
      if (unreservableFramesStartDate >= unreservableFramesEndDate) {
        return true
      }
    }
    return false
  }

  const deleteOutOfRangeFrame = (startAt: string, endAt: string) => {
    let updateOutOfRangeFrame: OutOfRepeatReservableFrameParam[]
    updateOutOfRangeFrame = outOfRangeFrames.filter(frame => { (frame.start_at + frame.end_at) !== (startAt + endAt) })
    dispatch(outOfRangeFramesChanged(updateOutOfRangeFrame))
  }

  const deleteUnreservableFrame = (startAt: string, endAt: string) => {
    let updateUnreservableFrame: UnreservableFrameParam[]
    updateUnreservableFrame = unreservableFrames.filter(frame => { (frame.start_at + frame.end_at) !== (startAt + endAt) })
    dispatch(unreservableFramesChanged(updateUnreservableFrame))
  }

  const addRepeatWDay = (wday: string) => {
    let updateWdays: string[]
    updateWdays = repeatWDays
    updateWdays = [...updateWdays, wday]
    dispatch((repeatWDaysChanged(updateWdays)))
  }

  const removeRepeatWDay = (wday: string) => {
    let updateWdays: string[]
    updateWdays = repeatWDays
    updateWdays = updateWdays.filter(w => wday !== w)
    dispatch((repeatWDaysChanged(updateWdays)))
  }

  const updateRepeatWDay = (event: any, wday: string) => {
    const target = event.target
    if (target.checked) {
      addRepeatWDay(wday)
    } else {
      removeRepeatWDay(wday)
    }
  }

  return(
    <>
      <hr />
      <Form.Group className='mb-3'>
          <Form.Check
            type='checkbox'
            id='repeatSetting'
            label='繰り返し設定を追加して他の日にも受付'
            checked={isRepeat}
            onChange={() => dispatch(isRepeatChanged(!isRepeat))} />
        </Form.Group>

        {isRepeat && <div className='ml20'>
          <Form.Group className='mb-3'>
            <Form.Check type='checkbox'
                        label='日ごと'
                        id='repeatDay'
                        inline
                        name='repeatPeriod'
                        onChange={() => dispatch(repeatIntervalTypeChanged('Day'))}
                        checked={repeatIntervalType === 'Day'} />
            <Form.Check type='checkbox'
                        label='週ごと'
                        id='repeatWeek'
                        inline
                        name='repeatPeriod'
                        onChange={() => dispatch(repeatIntervalTypeChanged('Week'))}
                        checked={repeatIntervalType === 'Week'} />
            <Form.Check type='checkbox'
                        label='月ごと'
                        id='repeatMonth'
                        inline
                        name='repeatPeriod'
                        onChange={() => dispatch(repeatIntervalTypeChanged('Month'))}
                        checked={repeatIntervalType === 'Month'} />
            <Form.Check type='checkbox'
                        label='曜日ごと'
                        id='repeatWDay'
                        inline
                        name='repeatPeriod'
                        onChange={() => dispatch(repeatIntervalTypeChanged('WDay'))}
                        checked={repeatIntervalType === 'WDay'} />
          </Form.Group>
          {repeatIntervalType === 'Day' &&
            <>
              <Form.Check
                type='radio'
                label='毎日'
                id='repeatIntervalDay'
                onChange={() => dispatch((isEveryDayRepeatChanged(!isEveryDayRepeat)))}
                checked={isEveryDayRepeat} />
              <Form.Check
                type='radio'
                label='間隔を空けて繰り返し'
                id='repeatIntervalDayWithInterval'
                onChange={() => dispatch((isEveryDayRepeatChanged(!isEveryDayRepeat)))}
                checked={!isEveryDayRepeat} />
              <Row>
                <Col>
                {!isEveryDayRepeat && <Form.Group as={Row} className='mb-3'>
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
                </Form.Group>}
                </Col>
              </Row>
            </>
          }
          {repeatIntervalType === 'Week' &&
            <>
              <Form.Check
                type='radio'
                label='毎週'
                id='repeatIntervalWeek'
                onChange={() => dispatch((isEveryWeekRepeatChanged(!isEveryWeekRepeat)))}
                checked={isEveryWeekRepeat} />
              <Form.Check
                type='radio'
                label='間隔を空けて繰り返し'
                id='repeatIntervalWeekWithInterval'
                onChange={() => dispatch((isEveryWeekRepeatChanged(!isEveryWeekRepeat)))}
                checked={!isEveryWeekRepeat} />
              <Row>
                <Col>
                {!isEveryWeekRepeat && <Form.Group as={Row} className='mb-3'>
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
                </Form.Group>}
                
                </Col>
              </Row>
            </>
          }
          {repeatIntervalType === 'Month' &&
            <>
              <Form.Check
                type='radio'
                label='毎月'
                id='repeatIntervalMonth'
                onChange={() => dispatch((isEveryMonthRepeatChanged(!isEveryMonthRepeat)))}
                checked={isEveryMonthRepeat} />
              <Form.Check
                type='radio'
                label='間隔を空けて繰り返し'
                id='repeatIntervalMonthWithInterval'
                onChange={() => dispatch((isEveryMonthRepeatChanged(!isEveryMonthRepeat)))}
                checked={!isEveryMonthRepeat} />
              <Row>
                <Col>
                {!isEveryMonthRepeat && <Form.Group as={Row} className='mb-3'>
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
                  </Form.Group>}
                </Col>
              </Row>
            </>
          }
          {repeatIntervalType === 'WDay' &&
            <>
              <Form.Check type='checkbox'
                          label='日曜日'
                          id='repeatSun'
                          name='repeatWDay'
                          onChange={(e) => updateRepeatWDay(e, 'Sun')}
                          checked={repeatWDays.includes('Sun')} />
              <Form.Check type='checkbox'
                          label='月曜日'
                          id='repeatMon'
                          name='repeatWDay'
                          onChange={(e) => updateRepeatWDay(e, 'Mon')}
                          checked={repeatWDays.includes('Mon')} />
              <Form.Check type='checkbox'
                          label='火曜日'
                          id='repeatTue'
                          name='repeatWDay'
                          onChange={(e) => updateRepeatWDay(e, 'Tue')}
                          checked={repeatWDays.includes('Tue')} />
              <Form.Check type='checkbox'
                          label='水曜日'
                          id='repeatWed'
                          name='repeatWDay'
                          onChange={(e) => updateRepeatWDay(e, 'Wed')}
                          checked={repeatWDays.includes('Wed')} />
              <Form.Check type='checkbox'
                          label='木曜日'
                          id='repeatThu'
                          name='repeatWDay'
                          onChange={(e) => updateRepeatWDay(e, 'Thu')}
                          checked={repeatWDays.includes('Thu')} />
              <Form.Check type='checkbox'
                          label='金曜日'
                          id='repeatFri'
                          name='repeatWDay'
                          onChange={(e) => updateRepeatWDay(e, 'Fri')}
                          checked={repeatWDays.includes('Fri')} />
              <Form.Check type='checkbox'
                          label='土曜日'
                          id='repeatSat'
                          name='repeatWDay'
                          onChange={(e) => updateRepeatWDay(e, 'Sat')}
                          checked={repeatWDays.includes('Sat')} />
            </>
          }

          <Form.Group className='mt20 mb5'>
            <Row>
              <Form.Label>繰り返し終了日</Form.Label>
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

          <hr />

          <Row className='mt20'>
            <h5>繰り返し範囲外予約受付日</h5>
            <div className='font-size-15 mt20'>繰り返し範囲外で予約を受け付けたい日があれば追加してください</div>
            {outOfRangeFrames && outOfRangeFrames.length
            ?
              <>
                {outOfRangeFrames.map((frame, i) => {
                  return (
                    <span key={i} className='mb10'>
                      <span>開始日: {frame.start_at}</span><br/>
                      <span>終了日: {frame.end_at}</span>
                      <a className='color-black none-under-decoration' onClick={() => deleteOutOfRangeFrame(frame.start_at, frame.end_at)}><TrashIcon width={20} height={20} fill={'#ff0000'} /></a>
                    </span>
                  )
                })}
              </>
            :
              <div className='mt20 mb10'>繰り返し範囲外予約受付日が設定されていません</div>
            }
            <Col>
              <Form.Group>
              <Form.Label>繰り返し範囲外予約受付開始日<RequireBadge /></Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type='date'
                      value={outOfRangeFramesStartDate}
                      onChange={(e) =>  setOutOfRangeFramesStartDate(e.target.value)} />
                  </Col>
                  <Col>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>繰り返し範囲外予約受付終了日</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type='date'
                      value={outOfRangeFramesEndDate}
                      onChange={(e) =>  setOutOfRangeFramesEndDate(e.target.value)} />
                  </Col>
                  <Col>
                  </Col>
                </Row>
              </Form.Group>
              <Button
                disabled={validateAddOutOfRangeFrame()}
                className='mt10 mb20'
                onClick={addOutOfRangeReservableFrames}>繰り返し範囲外予約受付日に追加</Button>
            </Col>
            <Col></Col>
          </Row>

          <hr />

          <Row className='mt20'>
            <h5>予約受付不可日設定</h5>
            <div className='font-size-15 mt20'>繰り返し日時の中で予約を受け付けたくない日があれば追加してください</div>
            {unreservableFrames && unreservableFrames.length
            ?
              <>
                {unreservableFrames.map((frame, i) => {
                  return (
                    <span key={i} className='mb10'>
                      <span>開始日: {frame.start_at}</span><br/>
                      <span>終了日: {frame.end_at}</span>
                      <a className='color-black none-under-decoration' onClick={() => deleteUnreservableFrame(frame.start_at, frame.end_at)}><TrashIcon width={20} height={20} fill={'#ff0000'} /></a>
                    </span>
                  )
                })}
              </>
            :
              <div className='mt20 mb10'>予約受付不可日が設定されていません</div>
            }
            <Col>
              <Form.Group>
              <Form.Label>予約不可開始日<RequireBadge /></Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type='date'
                      value={unreservableFramesStartDate}
                      onChange={(e) =>  setUnreservableFramesStartDate(e.target.value)} />
                  </Col>
                  <Col>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>予約不可終了日</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type='date'
                      value={unreservableFramesEndDate}
                      onChange={(e) =>  setUnreservableFramesEndDate(e.target.value)} />
                  </Col>
                  <Col>
                  </Col>
                </Row>
              </Form.Group>
              <Button
                disabled={validateAddUnreservableFrame()}
                className='mt10 mb20'
                onClick={addUnreservableFrames}>予約受付不可日に追加</Button>
            </Col>
            <Col></Col>
          </Row>
        </div>}
    </>
  )
}

export default ReserveFrameRepeatSetting
