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

const Index: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <h4>顧客グループ</h4>
            <ListGroup>

            </ListGroup>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
