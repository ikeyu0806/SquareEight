import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import type { NextPage } from 'next'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import SetTargetProductModal from 'components/templates/SetTargetProductModal'
import { PrefecturesDeliveryTargetType } from 'interfaces/PrefecturesDeliveryTargetType'
import { DeliveryTimes } from 'interfaces/DeliveryTimes'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useRouter } from 'next/router'
import { 
  shortestDeliveryDayChanged,
  longestDeliveryDayChanged,
  deadlineTimeChanged,
  isSetPerAreaDeliveryDateChanged,
  isHolidaySunChanged,
  isHolidayMonChanged,
  isHolidayTueChanged,
  isHolidayWedChanged,
  isHolidayThuChanged,
  isHolidayFriChanged,
  isHolidaySatChanged,
  temporaryHolidaysChanged,
  deliveryTimeTypeChanged,
  targetProductsChanged,
  showSetTargetProductModalChanged,
  deliveryTimesChanged,
  prefecturesDeliveryTargetChanged } from 'redux/deliveryDatetimeSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const [inputTemporaryHoliday, setInputTemporaryHoliday] = useState('')
  const [inputDeliveryTimeStartAt, setInputDeliveryTimeStartAt] = useState('00:00')
  const [inputDeliveryTimeEndAt, setInputDeliveryTimeEndAt] = useState('00:00')

  const shortestDeliveryDay = useSelector((state: RootState) => state.deliveryDatetime.shortestDeliveryDay)
  const longestDeliveryDay = useSelector((state: RootState) => state.deliveryDatetime.longestDeliveryDay)
  const deadlineTime = useSelector((state: RootState) => state.deliveryDatetime.deadlineTime)
  const isSetPerAreaDeliveryDate = useSelector((state: RootState) => state.deliveryDatetime.isSetPerAreaDeliveryDate)
  const isHolidaySun = useSelector((state: RootState) => state.deliveryDatetime.isHolidaySun)
  const isHolidayMon = useSelector((state: RootState) => state.deliveryDatetime.isHolidayMon)
  const isHolidayTue = useSelector((state: RootState) => state.deliveryDatetime.isHolidayTue)
  const isHolidayWed = useSelector((state: RootState) => state.deliveryDatetime.isHolidayWed)
  const isHolidayThu = useSelector((state: RootState) => state.deliveryDatetime.isHolidayThu)
  const isHolidayFri = useSelector((state: RootState) => state.deliveryDatetime.isHolidayFri)
  const isHolidaySat = useSelector((state: RootState) => state.deliveryDatetime.isHolidaySat)
  const temporaryHolidays = useSelector((state: RootState) => state.deliveryDatetime.temporaryHolidays)
  const deliveryTimeType = useSelector((state: RootState) => state.deliveryDatetime.deliveryTimeType)
  const targetProducts = useSelector((state: RootState) => state.deliveryDatetime.targetProducts)
  const prefecturesDeliveryTarget = useSelector((state: RootState) => state.deliveryDatetime.prefecturesDeliveryTarget)
  const deliveryTimes = useSelector((state: RootState) => state.deliveryDatetime.deliveryTimes)
  
  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/delivery_datetime_settings`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      dispatch(shortestDeliveryDayChanged(response.data.delivery_datetime_setting.shortest_delivery_day))
      dispatch(longestDeliveryDayChanged(response.data.delivery_datetime_setting.longest_delivery_day))
      dispatch(deadlineTimeChanged(response.data.delivery_datetime_setting.deadline_time || '00:00'))
      dispatch(isHolidaySunChanged(response.data.delivery_datetime_setting.is_holiday_sun))
      dispatch(isHolidayMonChanged(response.data.delivery_datetime_setting.is_holiday_mon))
      dispatch(isHolidayTueChanged(response.data.delivery_datetime_setting.is_holiday_tue))
      dispatch(isHolidayWedChanged(response.data.delivery_datetime_setting.is_holiday_wed))
      dispatch(isHolidayThuChanged(response.data.delivery_datetime_setting.is_holiday_thu))
      dispatch(isHolidayFriChanged(response.data.delivery_datetime_setting.is_holiday_fri))
      dispatch(isHolidaySatChanged(response.data.delivery_datetime_setting.is_holiday_sat))
      dispatch(deliveryTimeTypeChanged(response.data.delivery_datetime_setting.delivery_time_type))
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, dispatch])

  const addIemporaryHolidays = () => {
    if (temporaryHolidays.includes(inputTemporaryHoliday)) {
      return
    }
    let updateTemporaryHolidays: string[]
    updateTemporaryHolidays = temporaryHolidays
    dispatch(temporaryHolidaysChanged([...updateTemporaryHolidays, inputTemporaryHoliday]))
  }

  const addDeliveryTimes = () => {
    console.log("!!!", inputDeliveryTimeStartAt, inputDeliveryTimeEndAt, deliveryTimes)
    let updateTemporaryHolidays: DeliveryTimes[]
    updateTemporaryHolidays = deliveryTimes
    let addTemporaryHolidays: DeliveryTimes
    addTemporaryHolidays = { start_at: inputDeliveryTimeStartAt, end_at: inputDeliveryTimeEndAt }
    dispatch(deliveryTimesChanged([...updateTemporaryHolidays, addTemporaryHolidays]))
  }

  const updatePrefectureDeliveryTarget = (region :string, shortest_delivery_add_date: number) => {
    let updateDeliveryTarget: PrefecturesDeliveryTargetType[] = prefecturesDeliveryTarget
    updateDeliveryTarget = updateDeliveryTarget.map(
      chargeObj => chargeObj.region === region
      ?
        {region: chargeObj.region, shortest_delivery_add_date: shortest_delivery_add_date}
      :
        chargeObj)
    dispatch(prefecturesDeliveryTargetChanged(updateDeliveryTarget))
  }

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/delivery_datetime_settings/register`,
    {
      delivery_datetime_setting: {
        shortest_delivery_day: shortestDeliveryDay,
        longest_delivery_day: longestDeliveryDay,
        deadline_time: deadlineTime,
        is_set_per_area_delivery_date: isSetPerAreaDeliveryDate,
        is_holiday_sun: isHolidaySun,
        is_holiday_mon: isHolidayMon,
        is_holiday_tue: isHolidayTue,
        is_holiday_wed: isHolidayWed,
        is_holiday_thu: isHolidayThu,
        is_holiday_fri: isHolidayFri,
        is_holiday_sat: isHolidaySat,
        delivery_time_type: deliveryTimeType,
        delivery_datetime_temporary_holidays: temporaryHolidays,
        custom_delivery_times: deliveryTimes,
        target_products: targetProducts
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '送信しました',
        icon: 'info'
      })
      location.reload()
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '送信失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <h3>配送日時設定</h3>
            <div className='mt20'>
              商品購入時に、お客様が配送日に指定できる期間を「最短お届け日（＋エリア別追加お届け日数）」〜「最長お届け日」で設定します。
            </div>
            <hr />
            <div className='mt20 mb10'>最短お届け日</div>
            <Row>
              <Col>
                注文から
              </Col>
              <Col>
                <Form.Select
                  onChange={(e) => dispatch(shortestDeliveryDayChanged(Number(e.target.value)))}>
                  {[...Array(30)].map((_, i) => {
                    return (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    )
                  })}
                </Form.Select>
              </Col>
              <Col>営業日</Col>
              <Col sm={6}></Col>
            </Row>
            <hr />
            <div className='mt20 mb10'>最長お届け日</div>
            <Row>
              <Col>
                注文から
              </Col>
              <Col>
                <Form.Select
                  onChange={(e) => dispatch(longestDeliveryDayChanged(Number(e.target.value)))}>
                {[...Array(30)].map((_, i) => {
                  return (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  )
                })}
                </Form.Select>
              </Col>
              <Col>日</Col>
              <Col sm={6}></Col>
            </Row>
            <hr />

            <div className='mb10'>注文日の当日扱い締め切り時間</div>
            <div>設定した時間を過ぎた注文の注文日を翌日扱いにして、お届け可能日が計算されるようになります。</div>
            <Row>
              <Col>
                <Form.Control
                  value={deadlineTime}
                  onChange={(e) => dispatch(deadlineTimeChanged(e.target.value))}
                  type='time'></Form.Control>
              </Col>
              <Col sm={8}></Col>
            </Row>
            <hr />

            <div className='mb10'>都道府県別追加お届け日数</div>
            <div className='mb10'>都道府県ごとに、「最短お届け日」から追加でかかるお届け日数を設定できます。</div>
            <Form.Check
              onChange={(e) => dispatch(isSetPerAreaDeliveryDateChanged(!isSetPerAreaDeliveryDate))}
              checked={isSetPerAreaDeliveryDate}
              label='エリア別の追加お届け日数を設定する'
              id='setAreaDeliveryDay'></Form.Check>
            {isSetPerAreaDeliveryDate &&
              <div>
                <div className='mt10 mb10'>最短お届け日に加算する都道府県別日数</div>
                {prefecturesDeliveryTarget.map((target, i) => {
                  return (
                    <div key={i} className='mb10'>
                      <Row>
                        <Col>{target.region}</Col>
                        <Col>
                          <Form.Control
                            type='number'
                            onChange={(e) => updatePrefectureDeliveryTarget(target.region, Number(e.target.value))}
                            value={target.shortest_delivery_add_date}></Form.Control>
                        </Col>
                        <Col sm={8}></Col>
                      </Row>
                    </div>
                  )
                })}
              </div>
            }
            <hr />

            <div className='mb10'>休業日の設定</div>
            <div className='mb10'>定休日と臨時休業日を設定してください。臨時休業日は、翌々月まで設定できます。</div>
            <div>定休日</div>
              <Form.Check
                inline
                onChange={() => dispatch(isHolidaySunChanged(!isHolidaySun))}
                checked={isHolidaySun}
                label='日'
                name='holidayWday'
                type='checkbox'
                id='holidaySun' />
              <Form.Check
                inline
                onChange={() => dispatch(isHolidayMonChanged(!isHolidayMon))}
                checked={isHolidayMon}
                label='月'
                name='holidayWday'
                type='checkbox'
                id='holidayMon' />
              <Form.Check
                inline
                onChange={() => dispatch(isHolidayTueChanged(!isHolidayTue))}
                checked={isHolidayTue}
                label='火'
                name='holidayWday'
                type='checkbox'
                id='holidayTue' />
              <Form.Check
                inline
                onChange={() => dispatch(isHolidayWedChanged(!isHolidayWed))}
                checked={isHolidayWed}
                label='水'
                name='holidayWday'
                type='checkbox'
                id='holidayWed' />
              <Form.Check
                inline
                onChange={() => dispatch(isHolidayThuChanged(!isHolidayThu))}
                checked={isHolidayThu}
                label='木'
                name='holidayWday'
                type='checkbox'
                id='holidayThu' />
              <Form.Check
                inline
                onChange={() => dispatch(isHolidayFriChanged(!isHolidayFri))}
                checked={isHolidayFri}
                label='金'
                name='holidayWday'
                type='checkbox'
                id='holidayFri' />
              <Form.Check
                inline
                onChange={() => dispatch(isHolidaySatChanged(!isHolidaySat))}
                checked={isHolidaySat}
                label='土'
                name='holidayWday'
                type='checkbox'
                id='holidaySat' />
              <div className='mt20'>臨時休業日</div>
              <Form.Control
                value={inputTemporaryHoliday}
                onChange={(e) => setInputTemporaryHoliday(e.target.value)}
                type='date'></Form.Control>
              <Button
                variant='info'
                onClick={() => addIemporaryHolidays()}
                className='mt20 text-white'>臨時休業日に追加</Button>
              {temporaryHolidays.map((holiday, i) => {
                return (
                  <div key={i}>{holiday}</div>
                )
              })}
            <hr/>

            <div className='mb10'>配送時間の設定</div>
            <Form.Check
              type='radio'
              id='yamato'
              name='setDeliveryTime'
              onChange={() => dispatch(deliveryTimeTypeChanged('yamato'))}
              checked={deliveryTimeType === 'yamato'}
              label='ヤマト宅急便'></Form.Check>
            <div className='ml30 mb10'>午前中 / 14時〜16時 / 16時〜18時 / 18時〜20時 / 19時〜21時</div>
            <Form.Check
              type='radio'
              id='sagawa'
              name='setDeliveryTime'
              onChange={() => dispatch(deliveryTimeTypeChanged('sagawa'))}
              checked={deliveryTimeType === 'sagawa'}
              label='佐川急便'></Form.Check>
            <div className='ml30 mb10'>午前中 / 12時〜14時 / 14時〜16時 / 16時〜18時 / 18時〜20時 / 18時〜21時 / 19時〜21時</div>
            <Form.Check
              type='radio'
              id='yupack'
              name='setDeliveryTime'
              onChange={() => dispatch(deliveryTimeTypeChanged('yupack'))}
              checked={deliveryTimeType === 'yupack'}
              label='ゆうパック'></Form.Check>
            <div className='ml30 mb10'>午前中 / 12時〜14時 / 14時〜16時 / 16時〜18時 / 18時〜20時 / 19時〜21時 / 20時〜21時</div>
            <Form.Check
              type='radio'
              id='other'
              name='setDeliveryTime'
              onChange={() => dispatch(deliveryTimeTypeChanged('other'))}
              checked={deliveryTimeType === 'other'}
              label='その他'></Form.Check>
            <div className='ml30 mb10'>時間区分を自分で設定する</div>
            {deliveryTimeType === 'other'
            &&
              <>
                {deliveryTimes.map((time, i) => {
                  return (
                    <div key={i}>{time.start_at} ~ {time.end_at}</div> 
                  )
                })}
                <Row>
                  <Col sm={4}>
                    <Form.Control
                      value={inputDeliveryTimeStartAt}
                      onChange={(e) => setInputDeliveryTimeStartAt(e.target.value)}
                      type='time'
                    ></Form.Control>
                  </Col>
                  ~
                  <Col sm={4}>
                    <Form.Control
                      value={inputDeliveryTimeEndAt}
                      onChange={(e) => setInputDeliveryTimeEndAt(e.target.value)}
                      type='time'
                    ></Form.Control>
                  </Col>
                  <Col sm={8}></Col>
                </Row>
                <Button
                  variant='info'
                  onClick={() => addDeliveryTimes()}
                  className='mt10 text-white'>
                  配送日時に追加
                </Button>
              </>
            }
            <hr />
            <div className='mb20'>対象商品</div>
            <div>配送日時指定は今後追加される商品もふくめ、すべての商品に適用されます。</div>
            <div className='mb20'>配送日時指定を適用したくない商品がある場合は、「対象商品を変更する」の商品リストからチェックを外してください。</div>
            <Button
              variant='info'
              className='text-white'
              onClick={() => dispatch(showSetTargetProductModalChanged(true))}>
              対象商品を変更する
            </Button>
            <div className='text-center mt20'>
              <Button
                onClick={() => onSubmit()}>保存する</Button>
            </div>
          </Col>
        </Row>
      </Container>
      <SetTargetProductModal></SetTargetProductModal>
    </MerchantUserAdminLayout>
  )  
}

export default Index
