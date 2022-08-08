import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import axios from 'axios'
import { lastNameChanged,
         firstNameChanged,
         postalCodeChanged,
         stateChanged,
         cityChanged,
         townChanged,
         line1Changed,
         line2Changed,
         phoneNumberChanged,
         isDefaultChanged } from 'redux/deliveryTargetSlice'

const EditTargetDelivery: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const router = useRouter()
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

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/delivery_targets/`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then((response) => {
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._gybuilder_end_user_session])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/end_users/${router.query.id}/register_delivery_target`,
    {
      delivery_target: {
      }
    },
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then(response => {
      router.push('/customer_page/mypage')
      dispatch(alertChanged({message: '更新しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <EndUserLoginLayout>
      <Container className='mt30'>
        <Row>
          <Col md={2} lg={3}></Col>
          <Col md={8} lg={6}>
            <Form.Label>名前（性）</Form.Label>
            <Form.Control
              onChange={(e) => dispatch(lastNameChanged(e.target.value))}
              value={lastName}></Form.Control>
            <Form.Label>名前（名）</Form.Label>
            <Form.Control
              onChange={(e) => dispatch(firstNameChanged(e.target.value))}
              value={firstName}></Form.Control>
            <Form.Label>携帯電話番号</Form.Label>
            <Form.Control
              onChange={(e) => dispatch(phoneNumberChanged(e.target.value))}
              value={phoneNumber}></Form.Control>
            <Form.Label className='mt10'>郵便番号</Form.Label>
            <Form.Control
              onChange={(e) => dispatch(postalCodeChanged(e.target.value))}
              value={postalCode}></Form.Control>
            <Form.Label className='mt10'>都道府県</Form.Label>
            <Form.Control
              onChange={(e) => dispatch(stateChanged(e.target.value))}
              value={state}></Form.Control>
            <Form.Label className='mt10'>区市町村</Form.Label>
            <Form.Control
              onChange={(e) => dispatch(cityChanged(e.target.value))}
              value={city}></Form.Control>
            <Form.Label className='mt10'>町名</Form.Label>
            <Form.Control
              onChange={(e) => dispatch(townChanged(e.target.value))}
              value={town}></Form.Control>
            <Form.Label className='mt10'>番地、号</Form.Label>
            <Form.Control
              onChange={(e) => dispatch(line1Changed(e.target.value))}
              value={line1}></Form.Control>
            <Form.Label className='mt10'>建物・部屋番号・その他</Form.Label>
            <Form.Control
              onChange={(e) => dispatch(line2Changed(e.target.value))}
              value={line2}></Form.Control>
            <div className='mt30 text-center'>
              <Button onClick={onSubmit}>更新する</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </EndUserLoginLayout>
  )
}

export default EditTargetDelivery
