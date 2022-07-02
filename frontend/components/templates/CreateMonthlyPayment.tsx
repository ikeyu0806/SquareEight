import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Container, FormControl, Row, Col, Form } from 'react-bootstrap'
import { priceChanged,
         nameChanged,
         reserveIsUnlimitedChanged,
         reserveIntervalNumberChanged,
         reserveIntervalUnitChanged,
         enableReserveCountChanged,
         descriptionChanged } from 'redux/monthlyPaymentPlanSlice'

const CreateMonthlyPayment = (): JSX.Element => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.monthlyPaymentPlan.name)
  const price = useSelector((state: RootState) => state.monthlyPaymentPlan.price)
  const reserveIsUnlimited = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIsUnlimited)
  const reserveIntervalNumber = useSelector((state: RootState) => state.monthlyPaymentPlan.reserveIntervalNumber)
  const enableReserveCount = useSelector((state: RootState) => state.monthlyPaymentPlan.enableReserveCount)
  const description = useSelector((state: RootState) => state.monthlyPaymentPlan.description)

  return (
    <>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
          <div className='text-center mt50 mb50'>
          <h3 className='mb15'>月額課金プラン作成</h3>
          <span></span>
          </div>
          <Form.Label>プラン名</Form.Label>
          <FormControl
            value={name}
            onChange={(e) => dispatch(nameChanged(e.target.value))}
            placeholder='週2レッスンプラン 受講し放題プランなど'
            aria-label='リソース名' />
          <Form.Label className='mt10'>月額料金</Form.Label>
          <FormControl
            value={price}
            onChange={(e) => dispatch(priceChanged(Number(e.target.value)))}
            placeholder='10000'
            aria-label='10000' />
          <Form.Label className='mt10'>予約可能数{reserveIsUnlimited}</Form.Label>
          <Form.Check 
            type='radio'
            id='unlimited'
            label='無制限'
            onChange={() => dispatch(reserveIsUnlimitedChanged(!reserveIsUnlimited))}
            checked={reserveIsUnlimited} />
          <Form.Check 
            type='radio'
            id='limited'
            label='制限あり'
            onChange={() => dispatch(reserveIsUnlimitedChanged(!reserveIsUnlimited))}
            checked={!reserveIsUnlimited} />
            {!reserveIsUnlimited &&
            <Row>
              <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
                <Col sm={2}>
                  <Form.Control type='number'
                                value={reserveIntervalNumber}
                                onChange={(e) => dispatch(reserveIntervalNumberChanged(Number(e.target.value)))}
                                placeholder='1' />
                </Col>
                <Col xs={3}>
                  <Form.Select onChange={(e) => dispatch(reserveIntervalUnitChanged(e.target.value))}>
                    <option value='Day'>日に</option>
                    <option value='Week'>週間に</option>
                  </Form.Select>
                </Col>
                <Col sm={2}>
                  <Form.Control type='number'
                                value={enableReserveCount}
                                onChange={(e) => dispatch(enableReserveCountChanged(Number(e.target.value)))} />
                </Col>
                <Form.Label column sm={4}>
                  回予約可能
                </Form.Label>
              </Form.Group>
            </Row>}
          <Form.Label className='mt10'>プランの説明</Form.Label>
          <FormControl
            value={description}
            onChange={(e) => dispatch(descriptionChanged(e.target.value))}
            as='textarea'
            rows={20}
            placeholder=''
            aria-label='' />
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default CreateMonthlyPayment
