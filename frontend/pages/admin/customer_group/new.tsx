import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { RootState } from 'redux/store'
import { unselectedCustomersChanged } from 'redux/customerGroupSlice'
import CreateCustomerGroup from 'components/templates/CreateCustomerGroup'
import { nameChanged } from 'redux/customerGroupSlice'

const New: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()

  const selectedCustomers = useSelector((state: RootState) => state.customerGroup.selectedCustomers)

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/account/customers`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then((response) => {
      console.log(response.data)
      dispatch(unselectedCustomersChanged(response.data.customers))
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, dispatch])

  return (
    <MerchantUserAdminLayout>
      <ListGroup>
        <Container>
          <Row>
            <Col md={1}>
            </Col>
            <Col md={3}>
              <h4 className='mb20'>顧客グループ作成</h4>
              <Form.Label>グループ名</Form.Label>
              <Form.Control
                onChange={(e) => dispatch(nameChanged(e.target.value))}></Form.Control>
            </Col>
            <Col md={4}>
            </Col>
            <Col md={2}>
              <Button className='mt10'>保存する</Button>
            </Col>
            <Col md={1}>
            </Col>
          </Row>
        </Container>
        &emsp;
        <CreateCustomerGroup />
      </ListGroup>
    </MerchantUserAdminLayout>
  )
}

export default New
