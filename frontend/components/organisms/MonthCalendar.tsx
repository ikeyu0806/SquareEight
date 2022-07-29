import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import calendarStyles from 'styles/Calendar.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'

const MonthCalendar = (): JSX.Element => {
  const router = useRouter()

  const date = new Date()
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth() + 1)

  useEffect(() => {
    const fetchCalendarContent = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/calendar/monthly_reserve_frames`,
        {
          params: {
            target_year: year,
            target_month: month
          }
        }
      )
      .then(function (response) {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchCalendarContent()
  }, [router.query.id, router.query.ticket_master_id])

  return (
    <>
      <Container>
        <Row>
          <Col lg={1}></Col>
          <Col lg={10}>
            <h2>{year}年{month}月</h2>
            <table className={calendarStyles.calendar}>
              <thead>
                <tr>
                  <th>日</th>
                  <th>月</th>
                  <th>火</th>
                  <th>水</th>
                  <th>木</th>
                  <th>金</th>
                  <th>土</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>30</td>
                  <td>30</td>
                  <td>30</td>
                  <td>30</td>
                  <td>30</td>
                  <td>30</td>
                  <td>30</td>
                </tr>
                <tr>
                  <td>30</td>
                  <td>30</td>
                  <td>30</td>
                  <td>30</td>
                  <td>30</td>
                  <td>30</td>
                  <td>30</td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Container>
    </>
  )
}

export default MonthCalendar
