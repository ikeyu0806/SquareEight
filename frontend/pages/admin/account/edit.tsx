import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useRouter } from 'next/router'
import axios from 'axios'

const Edit: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [businessName, setBusinessName] = useState('')

  useEffect(() => {
    const fetchAccountInfo = () => {
      axios.get(`${process.env.BACKEND_URL}/api/internal/accounts/account_info`,
      {
        headers: {
          'Session-Id': cookies._square_eight_merchant_session
        }
      }).then((response) => {
        console.log(response.data)
        setBusinessName(response.data.account.business_name)
      }).catch((e) => {
        console.log(e)
      })
    }
    fetchAccountInfo()
  }, [cookies._square_eight_merchant_session])

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/accounts/update`,
    {
      account: {
        business_name: businessName,
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '更新しました',
        icon: 'info'
      })
      router.push('/admin/account')
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '更新失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6}>
            <Form.Label>ビジネス名称</Form.Label>
            <Form.Control
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}></Form.Control>
            <div className='text-center mt30'>
              <Button onClick={() => onSubmit()}>登録する</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Edit
