import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { CustomerGroupParam } from 'interfaces/CustomerGroupParam'
import axios from 'axios'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [customerGroups, setCustomerGroups] = useState<CustomerGroupParam[]>([])

  useEffect(() => {
    const fetchCustomerGroups = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/account/customer_groups`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        setCustomerGroups(response.data.customer_groups)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchCustomerGroups()
  }, [cookies._square_eight_merchant_session])
  
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <h4>顧客グループ</h4>
            <ListGroup>
            {customerGroups.map((group, i) => {
              return (
                <ListGroup.Item key={i}>
                  <Row>
                    <Col>
                      {group.name}
                    </Col>
                    <Col></Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
