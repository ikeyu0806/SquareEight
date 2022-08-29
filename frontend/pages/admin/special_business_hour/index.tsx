import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap'

const Index: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Form.Label>特例営業日時を入力してください</Form.Label>
                <Row>
                  <Col sm={4}>
                    <Form.Control type='date'></Form.Control>
                  </Col>
                  <Col sm={4}>
                    <Form.Control type='time'></Form.Control>
                  </Col>
                  <Col sm={4}>
                    <Button>追加する</Button>
                  </Col>
                </Row>
                <div className='mt30 text-center'>
                  <Button>登録する</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
