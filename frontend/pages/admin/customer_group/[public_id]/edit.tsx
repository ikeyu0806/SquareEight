import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import CreateCustomerGroup from 'components/templates/CreateCustomerGroup'
import {  nameChanged,
          selectedCustomersChanged,
          unselectedCustomersChanged } from 'redux/customerGroupSlice'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { useRouter } from 'next/router'
import Unauthorized from 'components/templates/Unauthorized'

const Edit: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const router = useRouter()

  const name = useSelector((state: RootState) => state.customerGroup.name)
  const selectedCustomers = useSelector((state: RootState) => state.customerGroup.selectedCustomers)
  const allowUpdateCustomerGroup = useSelector((state: RootState) => state.merchantUserPermission.allowCreateCustomerGroup)

  useEffect(() => {
    const fetchCustomerGroups = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/account/customer_groups/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        dispatch(nameChanged(response.data.customer_group.name))
        dispatch(selectedCustomersChanged(response.data.selected_customers))
        dispatch(unselectedCustomersChanged(response.data.unselected_customers))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchCustomerGroups()
  }, [cookies._square_eight_merchant_session, router.query.public_id, dispatch])

  const updateCustomerGroup = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/account/customer_groups/${router.query.public_id}/update`,
    {
      customer_group: {
        name: name,
        selected_customers: selectedCustomers
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '登録しました',
        icon: 'info'
      })
      router.push('/admin/customer_group')
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '登録失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <MerchantUserAdminLayout>
      {allowUpdateCustomerGroup === 'Allow' && <ListGroup>
        <Container>
          <Row>
            <Col md={1}>
            </Col>
            <Col md={3}>
              <h4 className='mb20'>顧客グループ作成</h4>
              <Form.Label>グループ名</Form.Label>
              <Form.Control
                value={name || ''}
                onChange={(e) => dispatch(nameChanged(e.target.value))}></Form.Control>
            </Col>
            <Col md={4}>
            </Col>
            <Col md={2}>
              <Button
                disabled={!name}
                onClick={() => updateCustomerGroup()}
                className='mt10'>保存する</Button>
            </Col>
            <Col md={1}>
            </Col>
          </Row>
        </Container>
        &emsp;
        <CreateCustomerGroup />
      </ListGroup>}
      {allowUpdateCustomerGroup === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Edit
