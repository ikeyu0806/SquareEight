import React, { useState } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import {
  isRepeatChanged,
  repeatIntervalTypeChanged,
  repeatIntervalNumberDayChanged,
  repeatIntervalNumberWeekChanged,
  repeatIntervalNumberMonthChanged,
  repeatIntervalMonthDateChanged,
  unreservableFramesChanged,
  repeatEndDateChanged } from 'redux/reserveFrameSlice'

const ReserveFrameRepeatSetting = () => {
  const dispatch = useDispatch()
  const isRepeat = useSelector((state: RootState) => state.reserveFrame.isRepeat)
  const repeatIntervalType = useSelector((state: RootState) => state.reserveFrame.repeatIntervalType)
  const repeatIntervalNumberDay = useSelector((state: RootState) => state.reserveFrame.repeatIntervalNumberDay)
  const repeatIntervalNumberWeek = useSelector((state: RootState) => state.reserveFrame.repeatIntervalNumberWeek)
  const repeatIntervalNumberMonth = useSelector((state: RootState) => state.reserveFrame.repeatIntervalNumberMonth)
  const repeatIntervalMonthDate = useSelector((state: RootState) => state.reserveFrame.repeatIntervalMonthDate)
  const repeatEndDate = useSelector((state: RootState) => state.reserveFrame.repeatEndDate)
  const unreservableFrames = useSelector((state: RootState) => state.reserveFrame.unreservableFrames)
  const [unreservableFramesStartDate, setUnreservableFramesStartDate] = useState('')
  const [unreservableFramesStartTime, setUnreservableFramesStartTime] = useState('')
  const [unreservableFramesEndDate, setUnreservableFramesEndDate] = useState('')
  const [unreservableFramesEndTime, setUnreservableFramesEndTime] = useState('')

  const addUnreservableFrames = () => {
    const startAt = unreservableFramesStartDate + ' ' + unreservableFramesStartTime
    const endAt = unreservableFramesEndDate + ' ' + unreservableFramesEndTime
    dispatch((unreservableFramesChanged([...unreservableFrames, { start_at: startAt, end_at: endAt }])))
  }

  return(
    <>
      <Form.Group className='mb-3'>
          <Form.Check
            type='checkbox'
            label='繰り返し設定を追加して他の日にも受付'
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
                    <span key={i} className='mb10'>
                      <span>開始日時: {frame.start_at}</span><br/>
                      <span>終了日時: {frame.end_at}</span>
                    </span>
                  )
                })}
              </>
            :
              <div className='mt10 mb10'>予約受付不可日時が設定されていません</div>
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
              <Button className='mt10 mb20' onClick={addUnreservableFrames}>予約受付不可日時に追加</Button>
            </Col>
            <Col></Col>
          </Row>
        </div>}
    </>
  )
}

export default ReserveFrameRepeatSetting
