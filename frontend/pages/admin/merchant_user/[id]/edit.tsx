import React, { useState } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import axios from 'axios'

const Edit: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()
  const dispatch = useDispatch()
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/merchant_users/${router.query.id}/update`,
    {
      merchant_user: {
        last_name: lastName,
        first_name: firstName
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
            <Form.Control onChange={(e) => setLastName(e.target.value)}></Form.Control>
            <Form.Label className='mt10'>名前（名）</Form.Label>
            <Form.Control onChange={(e) => setFirstName(e.target.value)}></Form.Control>
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
