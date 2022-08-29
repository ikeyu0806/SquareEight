import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { DateWithTime } from 'interfaces/DateWithTime'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Card, Button, ListGroup, Form } from 'react-bootstrap'
import TrashIcon from 'components/atoms/TrashIcon'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const Index: NextPage = () => {
  const [inputDate, setInputDate] = useState('')
  const [inputStartTime, setInputStartTime] = useState('')
  const [inputEndTime, setInputEndTime] = useState('')
  const [datetimes, setDatetimes] = useState<DateWithTime[]>([])
  const [addDatetimeAlert, setAddDatetimeAlert] = useState('')
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  useEffect(() => {
    const fetchSpecialBusinessHour = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/special_business_hours`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        setDatetimes(response.data.datetimes)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchSpecialBusinessHour()
  }, [cookies._square_eight_merchant_session])


  const addDatetime = () => {
    if (!inputDate || !inputStartTime || !inputEndTime) {
      setAddDatetimeAlert('時間と日時を入力してください')
      return
    }
    let updateDatetime: DateWithTime[]
    updateDatetime = datetimes
    updateDatetime = [...updateDatetime, { date: inputDate,
                                           start_time: inputStartTime,
                                           end_time: inputEndTime,
                                           manage_id: new Date().getTime().toString(16) }]
    setDatetimes(updateDatetime)
    setAddDatetimeAlert('')
  }

  const deleteDatetime = (manage_id: string) => {
    let updateDatetime: DateWithTime[]
    updateDatetime = datetimes.filter(datetime => datetime.manage_id !== manage_id)
    setDatetimes(updateDatetime)
  }

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/special_business_hours`,
    {
      special_business_hour: {
        datetimes: datetimes
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      swalWithBootstrapButtons.fire({
        title: '送信しました',
        icon: 'info'
      })
    }).catch(error => {
      swalWithBootstrapButtons.fire({
        title: '送信失敗しました',
        icon: 'error'
      })
    })
  }

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <Card>
              <Card.Body>
                <Form.Label>特例営業日時を入力してください</Form.Label>
                <Row>
                  <Col sm={4}>対象日</Col>
                  <Col sm={4}>開始時間</Col>
                  <Col sm={4}>終了時間</Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Control
                      value={inputDate}
                      onChange={(e) => setInputDate(e.target.value)}
                      type='date'></Form.Control>
                  </Col>
                  <Col sm={4}>
                    <Form.Control
                      value={inputStartTime}
                      onChange={(e) => setInputStartTime(e.target.value)}
                      type='time'></Form.Control>
                  </Col>
                  <Col sm={4}>
                    <Form.Control
                      value={inputEndTime}
                      onChange={(e) => setInputEndTime(e.target.value)}
                      type='time'></Form.Control>
                  </Col>
                </Row>
                <div className='mt20 mb20 text-center'>
                  <Button
                    onClick={() => addDatetime()}>追加する</Button>
                </div>
                {addDatetimeAlert && <div className='color-red mt10 mb10'>{addDatetimeAlert}</div>}
                <br/>
                <Row className='text-center'>
                  <Col lg={3}></Col>
                  <Col lg={6}>
                    <ListGroup>
                      {datetimes.map((datetime, i) => {
                        return (
                          <ListGroup.Item key={i}>
                            <span className='mr10'>{datetime.date} {datetime.start_time}~{datetime.end_time}</span>
                            <a onClick={() => deleteDatetime(datetime.manage_id)}>
                              <TrashIcon width={20} height={20} fill={'#ff0000'}></TrashIcon>
                            </a>
                          </ListGroup.Item>
                        )
                      })}
                    </ListGroup>
                  </Col>
                </Row>
                <div className='mt30 text-center'>
                  <Button onClick={() => onSubmit()}>登録する</Button>
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
