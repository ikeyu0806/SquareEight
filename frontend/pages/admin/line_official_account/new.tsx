import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Container, Row, Col, ListGroup, Card, Button, Form, Alert } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'

const New = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
        <Col lg={3}></Col>
          <Col lg={6}>
            <div>LINE公式アカウントのChannel情報を登録してください</div>
            <div className='mt20'>Channel ID</div>
            <Form.Control></Form.Control>
            <div>Channel secret</div>
            <Form.Control></Form.Control>
            <Button className='mt20'>登録する</Button>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default New
