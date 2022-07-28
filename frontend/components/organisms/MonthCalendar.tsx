import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import calendarStyles from 'styles/Calendar.module.css'

const MonthCalendar = (): JSX.Element => {
  const date = new Date()
  // 週7日ってことくらいわかりそうだけど一応マジックナンバー対応で変数代入
  const weekDaysCount = 7
  const dayOfWeek = [
    { id: 0, value: '日' },
    { id: 1, value: '月' },
    { id: 2, value: '火' },
    { id: 3, value: '水' },
    { id: 4, value: '木' },
    { id: 5, value: '金' },
    { id: 6, value: '土' }
  ]

  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth() + 1)
  // 31日終わりの月
  const bigMoon = [1, 3, 5, 7, 8, 10, 12]
  // 閏年考慮して月の最終日時取得
  const [currentMonthEndDate, currentThisMonthEndDate] = useState(bigMoon.indexOf(month) ? 31 : month === 2 ? 28 : 30)
  const [lastMonthEndDate, setCurrentMonthEndDate] = useState(new Date(date.getFullYear(), date.getMonth(), 0).getDate())
  // 今月最初の曜日
  const [currentMonthFirstDay, setCurrentMonthFirstDay] = useState(new Date(date.getFullYear(), date.getMonth(), 1).getDay())
  // 先月最後の曜日
  const [lastMonthEndDay, setLastMonthEndDay] = useState(new Date(date.getFullYear(), date.getMonth(), 0).getDay())
  // カレンダーに表示する先月の
  const [displayLastMonthStartDate, setDisplayLastMonthStartDate] = useState(lastMonthEndDate - lastMonthEndDay + 1)
  // 表示するカレンダーの行数
  const [weekCount, setWeekCount] = useState(Math.ceil((currentMonthFirstDay + lastMonthEndDate + 1) / weekDaysCount))

  // [{date: 27, date: 28, date: 29, date: 30, date: 1, date: 2, date: 3},
  //  {date: 4, date: 5, date: 6, date: 7, date: 8, date: 9, date: 10},
  // これが月末まで続く
  //  {date: 25, date: 26, date: 27, date: 28, date: 29, date: 30, date: 1}
  const generateInitCalendarDateContent = () => {
    let result = []
    for (let currentWeekCount = 0; currentWeekCount < weekCount; currentWeekCount++) {
      if (currentWeekCount == 0) {
        for (let i = 0; i < weekDaysCount; i++) {
          // 前月の日付が入る一週目
          console.log(i)
        }
      }
    }
  }

  const [calendarDateContent, setCalendarDateContent] = useState(generateInitCalendarDateContent())

  return (
    <>
      <Container>
        <Row>
          <Col lg={1}></Col>
          <Col lg={10}>
            <h2>{year}年{month}月{currentMonthEndDate} {lastMonthEndDate} {lastMonthEndDay} {displayLastMonthStartDate} {weekCount}</h2>
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
