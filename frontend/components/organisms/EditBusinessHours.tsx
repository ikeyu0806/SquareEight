import React from 'react'
import { Table, Col, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { monStartChanged,
         monEndChanged,
         tueStartChanged,
         tueEndChanged,
         wedStartChanged,
         wedEndChanged,
         thuStartChanged,
         thuEndChanged,
         friStartChanged,
         friEndChanged,
         satStartChanged,
         satEndChanged,
         sunStartChanged,
         sunEndChanged,
         holidayStartChanged,
         holidayEndChanged,
         monBreakStartChanged,
         monBreakEndChanged,
         tueBreakStartChanged,
         tueBreakEndChanged,
         wedBreakStartChanged,
         wedBreakEndChanged,
         thuBreakStartChanged,
         thuBreakEndChanged,
         friBreakStartChanged,
         friBreakEndChanged,
         satBreakStartChanged,
         satBreakEndChanged,
         sunBreakStartChanged,
         sunBreakEndChanged,
         holidayBreakStartChanged,
         holidayBreakEndChanged,  } from 'redux/businessHourSlice'

const EditBusinessHours = (): JSX.Element => {
  const dispatch = useDispatch()

  const monStart = useSelector((state: RootState) => state.businessHour.monStart)
  const monEnd = useSelector((state: RootState) => state.businessHour.monEnd)
  const tueStart = useSelector((state: RootState) => state.businessHour.tueStart)
  const tueEnd = useSelector((state: RootState) => state.businessHour.tueEnd)
  const wedStart = useSelector((state: RootState) => state.businessHour.wedStart)
  const wedEnd = useSelector((state: RootState) => state.businessHour.wedEnd)
  const thuStart = useSelector((state: RootState) => state.businessHour.thuStart)
  const thuEnd = useSelector((state: RootState) => state.businessHour.thuEnd)
  const friStart = useSelector((state: RootState) => state.businessHour.friStart)
  const friEnd = useSelector((state: RootState) => state.businessHour.friEnd)
  const satStart = useSelector((state: RootState) => state.businessHour.satStart)
  const satEnd = useSelector((state: RootState) => state.businessHour.satEnd)
  const sunStart = useSelector((state: RootState) => state.businessHour.sunStart)
  const sunEnd = useSelector((state: RootState) => state.businessHour.sunEnd)
  const holidayStart = useSelector((state: RootState) => state.businessHour.holidayStart)
  const holidayEnd = useSelector((state: RootState) => state.businessHour.holidayEnd)
  const monBreakStart = useSelector((state: RootState) => state.businessHour.monBreakStart)
  const monBreakEnd = useSelector((state: RootState) => state.businessHour.monBreakEnd)
  const tueBreakStart = useSelector((state: RootState) => state.businessHour.tueBreakStart)
  const tueBreakEnd = useSelector((state: RootState) => state.businessHour.tueBreakEnd)
  const wedBreakStart = useSelector((state: RootState) => state.businessHour.wedBreakStart)
  const wedBreakEnd = useSelector((state: RootState) => state.businessHour.wedBreakEnd)
  const thuBreakStart = useSelector((state: RootState) => state.businessHour.thuBreakStart)
  const thuBreakEnd = useSelector((state: RootState) => state.businessHour.thuBreakEnd)
  const friBreakStart = useSelector((state: RootState) => state.businessHour.friBreakStart)
  const friBreakEnd = useSelector((state: RootState) => state.businessHour.friBreakEnd)
  const satBreakStart = useSelector((state: RootState) => state.businessHour.satBreakStart)
  const satBreakEnd = useSelector((state: RootState) => state.businessHour.satBreakEnd)
  const sunBreakStart = useSelector((state: RootState) => state.businessHour.sunBreakStart)
  const sunBreakEnd = useSelector((state: RootState) => state.businessHour.sunBreakEnd)
  const holidayBreakStart = useSelector((state: RootState) => state.businessHour.holidayBreakStart)
  const holidayBreakEnd = useSelector((state: RootState) => state.businessHour.holidayBreakEnd)

  return (
    <>
      <Table bordered>
        <thead>
          <tr className='primary'>
            <th className='text-center col-lg-2 col-xs-2'>曜日</th>
            <th className='text-center col-lg-2 col-xs-1'></th>
            <th className='text-center col-lg-3 col-xs-3'>開始時間</th>
            <th className='text-center col-lg-3 col-xs-3'>終了時間</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={2} className='text-center'>日曜日</td>
            <td className='text-center'>営業時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(sunStartChanged(e.target.value))}
                defaultValue={sunStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(sunEndChanged(e.target.value))}
                defaultValue={sunEnd} />
            </td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(sunBreakStartChanged(e.target.value))}
                defaultValue={sunBreakStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(sunBreakEndChanged(e.target.value))}
                defaultValue={sunBreakEnd} />
            </td>
          </tr>
          <tr>
            <td rowSpan={2} className='text-center'>月曜日</td>
            <td className='text-center'>営業時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(monStartChanged(e.target.value))}
                defaultValue={monStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(monEndChanged(e.target.value))}
                defaultValue={monEnd} />
            </td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(monBreakStartChanged(e.target.value))}
                defaultValue={monBreakStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(monBreakEndChanged(e.target.value))}
                defaultValue={monBreakEnd} />
            </td>
          </tr>
          <tr>
            <td rowSpan={2} className='text-center'>火曜日</td>
            <td className='text-center'>営業時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(tueStartChanged(e.target.value))}
                defaultValue={tueStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(tueEndChanged(e.target.value))}
                defaultValue={tueEnd} />
            </td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(tueBreakStartChanged(e.target.value))}
                defaultValue={tueBreakStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(tueBreakEndChanged(e.target.value))}
                defaultValue={tueBreakEnd} />
            </td>
          </tr>
          <tr>
            <td rowSpan={2} className='text-center'>水曜日</td>
            <td className='text-center'>営業時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(wedStartChanged(e.target.value))}
                defaultValue={wedStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(wedEndChanged(e.target.value))}
                defaultValue={wedEnd} />
            </td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(wedBreakStartChanged(e.target.value))}
                defaultValue={wedBreakStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(wedBreakEndChanged(e.target.value))}
                defaultValue={wedBreakEnd} />
            </td>
          </tr>
          <tr>
            <td rowSpan={2} className='text-center'>木曜日</td>
            <td className='text-center'>営業時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(thuStartChanged(e.target.value))}
                defaultValue={thuStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(thuEndChanged(e.target.value))}
                defaultValue={thuEnd} />
            </td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(thuBreakStartChanged(e.target.value))}
                defaultValue={thuBreakStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(thuBreakEndChanged(e.target.value))}
                defaultValue={thuBreakEnd} />
            </td>
          </tr>
          <tr>
            <td rowSpan={2} className='text-center'>金曜日</td>
            <td className='text-center'>営業時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(friStartChanged(e.target.value))}
                defaultValue={friStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(friEndChanged(e.target.value))}
                defaultValue={friEnd} />
            </td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(friBreakStartChanged(e.target.value))}
                defaultValue={friBreakStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(friBreakEndChanged(e.target.value))}
                defaultValue={friBreakEnd} />
            </td>
          </tr>
          <tr>
            <td rowSpan={2} className='text-center'>土曜日</td>
            <td className='text-center'>営業時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(satStartChanged(e.target.value))}
                defaultValue={satStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(satEndChanged(e.target.value))}
                defaultValue={satEnd} />
            </td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(satBreakStartChanged(e.target.value))}
                defaultValue={satBreakStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(satBreakEndChanged(e.target.value))}
                defaultValue={satBreakEnd} />
            </td>
          </tr>
          <tr>
            <td rowSpan={2} className='text-center'>祝日</td>
            <td className='text-center'>営業時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(holidayStartChanged(e.target.value))}
                defaultValue={holidayStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(holidayEndChanged(e.target.value))}
                defaultValue={holidayEnd} />
            </td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(holidayBreakStartChanged(e.target.value))}
                defaultValue={holidayBreakStart} />
            </td>
            <td>
              <Form.Control
                type='time'
                onChange={(e) => dispatch(holidayBreakEndChanged(e.target.value))}
                defaultValue={holidayBreakEnd} />
            </td>
          </tr>
        </tbody>
      </Table>
      <Col></Col>
      <br />
    </>
  )
}

export default EditBusinessHours
