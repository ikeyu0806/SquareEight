import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import calendarStyles from 'styles/Calendar.module.css'

const MonthCalendar = (): JSX.Element => {
  return (
    <>
      <Container>
        <Row>
          <Col md={1}></Col>
          <Col>
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
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
    </>
  )
}

export default MonthCalendar
