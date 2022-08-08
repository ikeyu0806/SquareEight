import { Container, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import RequireBadge from 'components/atoms/RequireBadge'
import { prefecturesArray } from 'constants/prefecturesArray'
import {  lastNameChanged,
          firstNameChanged,
          postalCodeChanged,
          stateChanged,
          cityChanged,
          townChanged,
          line1Changed,
          line2Changed,
          phoneNumberChanged,
          isDefaultChanged } from 'redux/deliveryTargetSlice'

const CreateDeliveryTarget = (): JSX.Element => {
  const dispatch = useDispatch()
  const firstName = useSelector((state: RootState) => state.deliveryTarget.firstName)
  const lastName = useSelector((state: RootState) => state.deliveryTarget.lastName)
  const postalCode = useSelector((state: RootState) => state.deliveryTarget.postalCode)
  const state = useSelector((state: RootState) => state.deliveryTarget.state)
  const city = useSelector((state: RootState) => state.deliveryTarget.city)
  const town = useSelector((state: RootState) => state.deliveryTarget.town)
  const line1 = useSelector((state: RootState) => state.deliveryTarget.line1)
  const line2 = useSelector((state: RootState) => state.deliveryTarget.line2)
  const phoneNumber = useSelector((state: RootState) => state.deliveryTarget.phoneNumber)
  const isDefault = useSelector((state: RootState) => state.deliveryTarget.isDefault)

  return (
    <>
      <Container className='mt30'>
        <Row>
          <Col md={2} lg={3}></Col>
          <Col md={8} lg={6}>
            <Form.Label>名前（性）<RequireBadge /></Form.Label>
            <Form.Control
              onChange={(e) => dispatch(lastNameChanged(e.target.value))}
              value={lastName}></Form.Control>
            <Form.Label>名前（名）<RequireBadge /></Form.Label>
            <Form.Control
              onChange={(e) => dispatch(firstNameChanged(e.target.value))}
              value={firstName}></Form.Control>
            <Form.Label>携帯電話番号<RequireBadge /></Form.Label>
            <Form.Control
              onChange={(e) => dispatch(phoneNumberChanged(e.target.value))}
              value={phoneNumber}></Form.Control>
            <Form.Label className='mt10'>郵便番号<RequireBadge /></Form.Label>
            <Form.Control
              onChange={(e) => dispatch(postalCodeChanged(e.target.value))}
              value={postalCode}></Form.Control>
            <Form.Label className='mt10'>都道府県<RequireBadge /></Form.Label>
            <Form.Select onChange={(e) => dispatch(stateChanged(e.target.value))} value={state}>
              {prefecturesArray.map((p, i) => {
                return (
                  <option key={i} value={p}>{p}</option>
                )
              })}
            </Form.Select>
            <Form.Label className='mt10'>区市町村<RequireBadge /></Form.Label>
            <Form.Control
              onChange={(e) => dispatch(cityChanged(e.target.value))}
              value={city}></Form.Control>
            <Form.Label className='mt10'>町名<RequireBadge /></Form.Label>
            <Form.Control
              onChange={(e) => dispatch(townChanged(e.target.value))}
              value={town}></Form.Control>
            <Form.Label className='mt10'>番地、号<RequireBadge /></Form.Label>
            <Form.Control
              onChange={(e) => dispatch(line1Changed(e.target.value))}
              value={line1}></Form.Control>
            <Form.Label className='mt10'>建物・部屋番号・その他</Form.Label>
            <Form.Control
              onChange={(e) => dispatch(line2Changed(e.target.value))}
              value={line2}></Form.Control>
            <Form.Check
              className='mt20'
              checked={isDefault}
              onChange={() => dispatch(isDefaultChanged(!isDefault))}
              type='switch'
              label='デフォルトのお届け先に設定する'></Form.Check>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CreateDeliveryTarget
