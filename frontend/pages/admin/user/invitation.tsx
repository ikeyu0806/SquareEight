import React, { useState } from 'react'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { showPermissionGuideModalChanged } from 'redux/merchantUserPermissionSlice'
import { useDispatch } from 'react-redux'
import MerchantUserPermissionGuideModal from 'components/templates/MerchantUserPermissionGuideModal'
import axios from 'axios'
import { useRouter } from 'next/router'
import { alertChanged } from 'redux/alertSlice'

const Invitation: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [authorityCategory, setAuthorityCategory] = useState('AdminUser')

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/merchant_users/invite_additional_user`,
    {
      merchant_user: {
        last_name: lastName,
        first_name: firstName,
        email: email,
        authority_category: authorityCategory
      }
    }).then(response => {
      dispatch(alertChanged({message: '送信しました。', show: false}))
      router.push('/admin/user')
    }).catch(error => {
      dispatch(alertChanged({message: '送信失敗しました。', show: true, type: 'danger'}))
    })
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Form.Label>名前(姓)</Form.Label>
            <Form.Control onChange={(e) => setLastName(e.target.value)}></Form.Control>
            <Form.Label className='mt10'>名前(名)</Form.Label>
            <Form.Control onChange={(e) => setFirstName(e.target.value)}></Form.Control>
            <Form.Label className='mt10'>メールアドレス</Form.Label>
            <Form.Control onChange={(e) => setEmail(e.target.value)}></Form.Control>
            <Form.Label className='mt10'>管理者権限</Form.Label>
            <Row>
              <Col sm={7}>
                <Form.Select onChange={(e) => setAuthorityCategory(e.target.value)}>
                  <option value='SystemAdmin'>管理者</option>
                  <option value='CommonUser'>一般ユーザ</option>
                </Form.Select>
              </Col>
              <Col sm={5}>
                <Button
                  variant='info'
                  className='text-white'
                  onClick={() => dispatch(showPermissionGuideModalChanged(true))}>
                  ユーザ権限について
                </Button>
              </Col>
            </Row>

            <Button
              onClick={() => onSubmit()}
              className='mt30'>招待メールを送信する</Button>
          </Col>
        </Row>
      </Container>
      <MerchantUserPermissionGuideModal></MerchantUserPermissionGuideModal>
    </MerchantUserAdminLayout>
  )
}

export default Invitation
