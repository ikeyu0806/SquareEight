import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import calendarStyles from 'styles/Calendar.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import { MonthCalendarContentJson } from 'interfaces/MonthCalendarContentParam'

const MonthCalendar = (): JSX.Element => {
  const router = useRouter()

  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth() + 1)
  const [calendarContentArray, setCalendarContentArray] = useState<Array<Array<MonthCalendarContentJson>>>([[]])

  useEffect(() => {
    const fetchCalendarContent = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/calendar/${router.query.reserve_frame_id}/monthly_reserve_frames`,
        {
          params: {
            target_year: currentYear,
            target_month: currentMonth
          }
        }
      )
      .then(function (response) {
        console.log(response)
        setCalendarContentArray(response.data.calendar_content)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchCalendarContent()
  }, [router.query.id, router.query.reserve_frame_id, currentYear, currentMonth])

  return (
    <>
      <Container className={calendarStyles.calendar}>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <h2>{year}年{month}月</h2>
            <table>
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
              {calendarContentArray.map((array, i) => {
                return (
                  <tbody key={i}>
                    <tr>
                      {array.map((a, i) => {
                        return (
                          <td key={i} valign='top'>
                            <div className='date-text'>{a.date_text}</div>
                            <a className='badge bg-info mt10' href={a.url}>{a.title}</a>
                          </td>
                        )
                      })}
                    </tr>
                  </tbody>
                )
              })}            
            </table>
          </Col>
          <Col lg={2}></Col>
        </Row>
      </Container>
    </>
  )
}

export default MonthCalendar
