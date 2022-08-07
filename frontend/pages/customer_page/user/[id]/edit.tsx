import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import EndUserLoginLayout from 'components/templates/EndUserLoginLayout'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import axios from 'axios'

const Edit: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_end_user_session'])
  const router = useRouter()
  const dispatch = useDispatch()
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastNameKana, setLastNameKana] = useState('')
  const [firstNameKana, setFirstNameKana] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [state, setState] = useState('')
  const [stateKana, setStateKana] = useState('')
  const [city, setCity] = useState('')
  const [cityKana, setCityKana] = useState('')
  const [town, setTown] = useState('')
  const [townKana, setTownKana] = useState('')
  const [line1, setLine1] = useState('')
  const [line1Kana, setLine1Kana] = useState('')
  const [line2, setLine2] = useState('')
  const [line2Kana, setLine2Kana] = useState('')

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_users/current_end_user_info`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then((response) => {
      setLastName(response.data.end_user.last_name)
      setFirstName(response.data.end_user.first_name)
      setLastNameKana(response.data.end_user.last_name_kana)
      setFirstNameKana(response.data.end_user.first_name_kana)
      setEmail(response.data.end_user.email)
      setPostalCode(response.data.end_user.postal_code)
      setState(response.data.end_user.state)
      setStateKana(response.data.end_user.state_kana)
      setCity(response.data.end_user.city)
      setCityKana(response.data.end_user.city_kana)
      setTown(response.data.end_user.town)
      setTownKana(response.data.end_user.town_kana)
      setLine1(response.data.end_user.line1)
      setLine1Kana(response.data.end_user.line1_kana)
      setLine2(response.data.end_user.line2)
      setLine2Kana(response.data.end_user.line2_kana)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._gybuilder_end_user_session])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/end_users/${router.query.id}/update`,
    {
      end_user: {
        last_name: lastName,
        first_name: firstName,
        last_name_kana: lastNameKana,
        first_name_kana: firstNameKana,
        email: email,
        password: password,
        postal_code: postalCode,
        state: state,
        state_kana: stateKana,
        city: city,
        city_kana: cityKana,
        town: town,
        town_kana: townKana,
        line1: line1,
        line1_kana: line1Kana,
        line2: line2,
        line2_kana: line2Kana,
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
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}></Form.Control>
            <Form.Label className='mt10'>名前（名）</Form.Label>
            <Form.Control
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}></Form.Control>
            <Form.Label className='mt10'>名前カナ（性）</Form.Label>
            <Form.Control
              onChange={(e) => setLastNameKana(e.target.value)}
              value={lastNameKana}></Form.Control>
            <Form.Label className='mt10'>名前カナ（名）</Form.Label>
            <Form.Control
              onChange={(e) => setFirstNameKana(e.target.value)}
              value={firstNameKana}></Form.Control>
            <Form.Label className='mt10'>メールアドレス</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}></Form.Control>
            <Form.Label className='mt10'>パスワード</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}></Form.Control>
            <Form.Label className='mt10'>郵便番号</Form.Label>
            <Form.Control
              onChange={(e) => setPostalCode(e.target.value)}
              value={postalCode}></Form.Control>
            <Form.Label className='mt10'>都道府県</Form.Label>
            <Form.Control
              onChange={(e) => setState(e.target.value)}
              value={state}></Form.Control>
            <Form.Label className='mt10'>都道府県（カナ）</Form.Label>
            <Form.Control
              onChange={(e) => setStateKana(e.target.value)}
              value={stateKana}></Form.Control>
            <Form.Label className='mt10'>区市町村</Form.Label>
            <Form.Control
              onChange={(e) => setCity(e.target.value)}
              value={city}></Form.Control>
            <Form.Label className='mt10'>区市町村（カナ）</Form.Label>
            <Form.Control
              onChange={(e) => setCityKana(e.target.value)}
              value={cityKana}></Form.Control>
            <Form.Label className='mt10'>町名（丁目まで）</Form.Label>
            <Form.Control
              onChange={(e) => setTown(e.target.value)}
              value={town}></Form.Control>
            <Form.Label className='mt10'>町名（丁目まで、カナ）</Form.Label>
            <Form.Control
              onChange={(e) => setTownKana(e.target.value)}
              value={townKana}></Form.Control>
            <Form.Label className='mt10'>番地、号</Form.Label>
            <Form.Control
              onChange={(e) => setLine1(e.target.value)}
              value={line1}></Form.Control>
            <Form.Label className='mt10'>番地、号（カナ）</Form.Label>
            <Form.Control
              onChange={(e) => setLine1Kana(e.target.value)}
              value={line1Kana}></Form.Control>
            <Form.Label className='mt10'>建物・部屋番号・その他</Form.Label>
            <Form.Control
              onChange={(e) => setLine2(e.target.value)}
              value={line2}></Form.Control>
            <Form.Label className='mt10'>建物・部屋番号・その他</Form.Label>
            <Form.Control
              onChange={(e) => setLine2Kana(e.target.value)}
              value={line2Kana}></Form.Control>
            <div className='mt30 text-center'>
              <Button onClick={onSubmit}>更新する</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </EndUserLoginLayout>
  )
}

export default Edit
