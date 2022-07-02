import React from 'react'
import { Table, Col, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { nameChanged, priceChanged, receptionTimeSettingChanged } from 'redux/resourceSlice'
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
  const name = useSelector((state: RootState) => state.resource.name)
  const price = useSelector((state: RootState) => state.resource.price)
  const receptionTimeSetting = useSelector((state: RootState) => state.resource.receptionTimeSetting)
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

  return( 
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
            <td><Form.Control type='time' defaultValue={monStart} /></td>
            <td><Form.Control type='time'defaultValue={monEnd} /></td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td><Form.Control type='time' defaultValue={monBreakStart} /></td>
            <td><Form.Control type='time'defaultValue={monBreakEnd} /></td>
          </tr>
          <tr>
            <td rowSpan={2} className='text-center'>月曜日</td>
            <td className='text-center'>営業時間</td>
            <td><Form.Control type='time' defaultValue={tueStart} /></td>
            <td><Form.Control type='time'defaultValue={tueEnd} /></td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td><Form.Control type='time' defaultValue={monStart} /></td>
            <td><Form.Control type='time'defaultValue={monEnd} /></td>
          </tr>
          <tr>
            <td rowSpan={2} className='text-center'>火曜日</td>
            <td className='text-center'>営業時間</td>
            <td><Form.Control type='time' defaultValue={tueStart} /></td>
            <td><Form.Control type='time'defaultValue={tueEnd} /></td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td><Form.Control type='time' defaultValue={tueBreakStart} /></td>
            <td><Form.Control type='time'defaultValue={tueBreakEnd} /></td>
          </tr>
          <tr>
            <td rowSpan={2} className='text-center'>水曜日</td>
            <td className='text-center'>営業時間</td>
            <td><Form.Control type='time' defaultValue={wedStart} /></td>
            <td><Form.Control type='time'defaultValue={wedEnd} /></td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td><Form.Control type='time' defaultValue={wedBreakStart} /></td>
            <td><Form.Control type='time'defaultValue={wedBreakEnd} /></td>
          </tr>
          <tr>
            <td rowSpan={2} className='text-center'>木曜日</td>
            <td className='text-center'>営業時間</td>
            <td><Form.Control type='time' defaultValue={thuStart} /></td>
            <td><Form.Control type='time'defaultValue={thuEnd} /></td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td><Form.Control type='time' defaultValue={thuBreakStart} /></td>
            <td><Form.Control type='time'defaultValue={thuBreakEnd} /></td>
          </tr>
          <tr>
            <td rowSpan={2} className='text-center'>金曜日</td>
            <td className='text-center'>営業時間</td>
            <td><Form.Control type='time' defaultValue={friStart} /></td>
            <td><Form.Control type='time'defaultValue={friEnd} /></td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td><Form.Control type='time' defaultValue={friBreakStart} /></td>
            <td><Form.Control type='time'defaultValue={friBreakEnd} /></td>
          </tr>
          <tr>
            <td rowSpan={2} className='text-center'>土曜日</td>
            <td className='text-center'>営業時間</td>
            <td><Form.Control type='time' defaultValue={satStart} /></td>
            <td><Form.Control type='time'defaultValue={satEnd} /></td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td><Form.Control type='time' defaultValue={satStart} /></td>
            <td><Form.Control type='time'defaultValue={satEnd} /></td>
          </tr>
          <tr>
            <td rowSpan={2} className='text-center'>祝日</td>
            <td className='text-center'>営業時間</td>
            <td><Form.Control type='time' defaultValue={holidayStart} /></td>
            <td><Form.Control type='time'defaultValue={holidayEnd} /></td>
          </tr>
          <tr>
            <td className='text-center'>休憩時間</td>
            <td><Form.Control type='time' defaultValue={holidayBreakStart} /></td>
            <td><Form.Control type='time'defaultValue={holidayBreakEnd} /></td>
          </tr>
        </tbody>
      </Table>
      <Col></Col>
      <br />
    </>
  )
}

export default EditBusinessHours
