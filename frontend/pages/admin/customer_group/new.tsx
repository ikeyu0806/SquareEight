import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { RootState } from 'redux/store'
import { unselectedCustomersChanged } from 'redux/customerGroupSlice'
import CreateCustomerGroup from 'components/templates/CreateCustomerGroup'

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
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <h4>顧客グループ作成</h4>
            <ListGroup>
              <CreateCustomerGroup />
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default New
