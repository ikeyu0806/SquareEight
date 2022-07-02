import React from 'react'
import EditBusinessHours from 'components/organisms/EditBusinessHours'
import { Container, Row, Col, FormControl, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { nameChanged, priceChanged, receptionTimeSettingChanged } from 'redux/resourceSlice'

const CreateResource = (): JSX.Element => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.resource.name)
  const price = useSelector((state: RootState) => state.resource.price)
  const receptionTimeSetting = useSelector((state: RootState) => state.resource.receptionTimeSetting)
  return (
    <>
      <Container>
        <div className='text-center mt50 mb50'>
          <h3 className='mb15'>リソース登録</h3>
          <span>スタッフや設備・備品を登録して予約者数を制限することができます。</span>
          <br />
        </div>
        <Row>
          <Col lg={2} md={3}></Col>
          <Col lg={8} md={6}>
            <Form.Label>リソース名</Form.Label>
            <FormControl
              value={name}
              onChange={(e) => dispatch(nameChanged(e.target.value))}
              placeholder=''
              aria-label='リソース名' />
            <Form.Label className='mt10'>月額料金</Form.Label>
            <FormControl
              value={price}
              onChange={(e) => dispatch(priceChanged(Number(e.target.value)))}
              placeholder=''
              aria-label='月額料金' />
            <Form.Label className='mt10'>曜日別予約受付設定</Form.Label>
            <Form.Check 
              type='radio'
              id='unlimited'
              label='制限なし'
              onChange={() => dispatch(receptionTimeSettingChanged('NotSet'))}
              checked={receptionTimeSetting === 'NotSet'} />
            <Form.Check 
              type='radio'
              id='limited'
              label='営業時間に準ずる'
              onChange={() => dispatch(receptionTimeSettingChanged('AccountBusinessHour'))}
              checked={receptionTimeSetting === 'AccountBusinessHour'} />
            <Form.Check 
              type='radio'
              id='limited'
              label='個別に設定する'
              onChange={() => dispatch(receptionTimeSettingChanged('ResourceBusinessHour'))}
              checked={receptionTimeSetting === 'ResourceBusinessHour'} />
            {receptionTimeSetting === 'ResourceBusinessHour'
              &&
              <>
                <div className='mt10 mb10'>予約受付可能時間を設定してください</div> 
                <EditBusinessHours></EditBusinessHours>
              </>}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CreateResource
