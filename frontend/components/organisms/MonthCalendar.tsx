import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import calendarStyles from 'styles/Calendar.module.css'

const MonthCalendar = (): JSX.Element => {
  return (
    <>
      <Container>
        <Row>
          <Col lg={1}></Col>
          <Col lg={10}>
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
