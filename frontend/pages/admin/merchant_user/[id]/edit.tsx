import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import axios from 'axios'
import { MerchantUserParam } from 'interfaces/MerchantUserParam'

const Edit: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()
  const dispatch = useDispatch()
  const [merchantUser, setMerchantUser] = useState<MerchantUserParam>()
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastNameKana, setLastNameKana] = useState('')
  const [firstNameKana, setFirstNameKana] = useState('')

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/merchant_users/current_merchant_user_info`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_merchant_session
      }
    }).then((response) => {
      setLastName(response.data.merchant_user.last_name)
      setFirstName(response.data.merchant_user.first_name)
      setLastNameKana(response.data.merchant_user.last_name_kana)
      setFirstNameKana(response.data.merchant_user.first_name_kana)
    }).catch((error) => {
      console.log(error)
    })
  }, [dispatch, cookies._gybuilder_merchant_session])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/merchant_users/${router.query.id}/update`,
    {
      merchant_user: {
        last_name: lastName,
        first_name: firstName,
        last_name_kana: lastNameKana,
        first_name_kana: firstNameKana,
      }
    },
    {
      headers: {
        'Session-Id': cookies._gybuilder_merchant_session
      }
    }).then(response => {
      router.push('/admin/login_user_info')
      dispatch(alertChanged({message: '更新しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <MerchantUserAdminLayout>
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
            <div className='mt30 text-center'>
              <Button onClick={onSubmit}>更新する</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Edit
