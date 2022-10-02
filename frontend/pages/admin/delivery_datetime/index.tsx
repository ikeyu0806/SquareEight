import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import type { NextPage } from 'next'
import { useDispatch } from 'react-redux'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import SetTargetProductModal from 'components/templates/SetTargetProductModal'
import { showSetTargetProductModalChanged } from 'redux/deliveryDatetimeSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()

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
                <Form.Select>
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
                <Form.Select>
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
                <Form.Control type='time'></Form.Control>
              </Col>
              <Col sm={8}></Col>
            </Row>
            <hr />

            <div className='mb10'>エリア別追加お届け日数</div>
            <div>都道府県ごとに、「最短お届け日」から追加でかかるお届け日数を設定できます。</div>
            <Form.Check label='エリア別の追加お届け日数を設定する' id='setAreaDeliveryDay'></Form.Check>
            <hr />

            <div className='mb10'>休業日の設定</div>
            <div className='mb10'>定休日と臨時休業日を設定してください。臨時休業日は、翌々月まで設定できます。</div>
            <div>定休日</div>
              <Form.Check
                inline
                label='日'
                name='holidayWday'
                type='checkbox'
                id='holidaySun' />
              <Form.Check
                inline
                label='月'
                name='holidayWday'
                type='checkbox'
                id='holidayMon' />
              <Form.Check
                inline
                label='火'
                name='holidayWday'
                type='checkbox'
                id='holidayTue' />
              <Form.Check
                inline
                label='水'
                name='holidayWday'
                type='checkbox'
                id='holidayWed' />
              <Form.Check
                inline
                label='木'
                name='holidayWday'
                type='checkbox'
                id='holidayThu' />
              <Form.Check
                inline
                label='金'
                name='holidayWday'
                type='checkbox'
                id='holidayFri' />
              <Form.Check
                inline
                label='土'
                name='holidayWday'
                type='checkbox'
                id='holidaySat' />
              <div className='mt20'>臨時休業日</div>
              <Form.Control type='date'></Form.Control>
              <Button className='mt20'>臨時休業日に追加</Button>
            <hr/>

            <div className='mb10'>配送時間の設定</div>
            <Form.Check
              type='radio'
              id='yamato'
              name='setDeliveryTime'
              label='ヤマト宅急便'></Form.Check>
            <div className='ml30 mb10'>午前中 / 14時〜16時 / 16時〜18時 / 18時〜20時 / 19時〜21時</div>
            <Form.Check
              type='radio'
              id='yamato'
              name='setDeliveryTime'
              label='佐川急便'></Form.Check>
            <div className='ml30 mb10'>午前中 / 12時〜14時 / 14時〜16時 / 16時〜18時 / 18時〜20時 / 18時〜21時 / 19時〜21時</div>
            <Form.Check
              type='radio'
              id='yamato'
              name='setDeliveryTime'
              label='ゆうパック'></Form.Check>
            <div className='ml30 mb10'>午前中 / 12時〜14時 / 14時〜16時 / 16時〜18時 / 18時〜20時 / 19時〜21時 / 20時〜21時</div>
            <Form.Check
              type='radio'
              id='yamato'
              name='setDeliveryTime'
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
