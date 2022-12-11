import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'

const LineUser: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default LineUser
