import React, { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import SetTargetProductModal from 'components/templates/SetTargetProductModal'
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
  showSetTargetProductModalChanged } from 'redux/deliveryDatetimeSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()

  const [inputTemporaryHoliday, setInputTemporaryHoliday] = useState('')

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

  const addIemporaryHolidays = () => {
    if (temporaryHolidays.includes(inputTemporaryHoliday)) {
      return
    }
    let updateTemporaryHolidays: string[]
    updateTemporaryHolidays = temporaryHolidays
    dispatch(temporaryHolidaysChanged([...updateTemporaryHolidays, inputTemporaryHoliday]))
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
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

            <div className='mb10'>エリア別追加お届け日数</div>
            <div>都道府県ごとに、「最短お届け日」から追加でかかるお届け日数を設定できます。</div>
            <Form.Check
              onChange={(e) => dispatch(isSetPerAreaDeliveryDateChanged(!isSetPerAreaDeliveryDate))}
              checked={isSetPerAreaDeliveryDate}
              label='エリア別の追加お届け日数を設定する'
              id='setAreaDeliveryDay'></Form.Check>
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
              <div>{inputTemporaryHoliday}</div>
              <Button
                onClick={() => addIemporaryHolidays()}
                className='mt20'>臨時休業日に追加</Button>
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
            <hr />
            <div className='mb20'>対象商品</div>
            <div>配送日時指定は今後追加される商品もふくめ、すべての商品に適用されます。</div>
            <div className='mb20'>配送日時指定を適用したくない商品がある場合は、「対象商品を変更する」の商品リストからチェックを外してください。</div>
            <Button
              onClick={() => dispatch(showSetTargetProductModalChanged(true))}>
              対象商品を変更する
            </Button>
          </Col>
        </Row>
      </Container>
      <SetTargetProductModal></SetTargetProductModal>
    </MerchantUserAdminLayout>
  )  
}

export default Index
