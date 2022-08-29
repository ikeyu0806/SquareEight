import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DateWithTime } from 'interfaces/DateWithTime'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Card, Button, ListGroup, Form } from 'react-bootstrap'

const Index: NextPage = () => {
  const [inputDate, setInputDate] = useState('')
  const [inputTime, setInputTime] = useState('')
  const [datetimes, setDatetimes] = useState<DateWithTime[]>([])

  const addDatetime = () => {
    let updateDatetime: DateWithTime[]
    updateDatetime = datetimes
    updateDatetime = [...updateDatetime, { date: inputDate, time: inputTime }]
    setDatetimes(updateDatetime)
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Card>
              <Card.Body>
                <Form.Label>特例営業日時を入力してください</Form.Label>
                <Row>
                  <Col sm={4}>
                    <Form.Control
                      value={inputDate}
                      onChange={(e) => setInputDate(e.target.value)}
                      type='date'></Form.Control>
                  </Col>
                  <Col sm={4}>
                    <Form.Control
                      value={inputTime}
                      onChange={(e) => setInputTime(e.target.value)}
                      type='time'></Form.Control>
                  </Col>
                  <Col sm={4}>
                    <Button onClick={() => addDatetime()}>追加する</Button>
                  </Col>
                </Row>
                
                  <Row className='text-center'>
                    <Col lg={3}></Col>
                    <Col lg={6}>
                      <ListGroup>
                        {datetimes.map((datetime, i) => {
                          return (
                            <ListGroup.Item key={i}>{datetime.date} {datetime.time}</ListGroup.Item>
                          )
                        })}
                      </ListGroup>
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
