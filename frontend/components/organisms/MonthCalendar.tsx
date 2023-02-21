import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import calendarStyles from 'styles/Calendar.module.css'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { MonthCalendarContentJson } from 'interfaces/MonthCalendarContentParam'
import { ReserveFrameParam } from 'interfaces/ReserveFrameParam'
import {  navbarBrandTextChanged,
          navbarBrandTypeChanged,
          navbarBrandImageChanged,
          navbarBrandImagePublicUrlChanged,
          navbarBrandImageWidthChanged,
          navbarBrandImageHeightChanged,
          navbarBrandBackgroundColorChanged,
          navbarBrandVariantColorChanged,
          footerCopyRightTextChanged } from 'redux/sharedComponentSlice'

const MonthCalendar = (): JSX.Element => {
  const router = useRouter()
  const dispatch = useDispatch()
  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1
  const [year, setYear] = useState(date.getFullYear())
  const [month, setMonth] = useState(date.getMonth() + 1)
  const [calendarContentArray, setCalendarContentArray] = useState<Array<Array<MonthCalendarContentJson>>>([[]])
  const [reserveFrame, setReserveFrame] = useState<ReserveFrameParam>()

  useEffect(() => {
    const fetchCalendarContent = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/calendar/${router.query.public_id}/monthly_reserve_frames`,
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
        setReserveFrame(response.data.reserve_frame)

        // ヘッダ、フッタ
        dispatch((navbarBrandTextChanged(response.data.shared_component.navbar_brand_text)))
        dispatch((navbarBrandTypeChanged(response.data.shared_component.navbar_brand_type)))
        dispatch((navbarBrandImageChanged(response.data.shared_component.navbar_brand_image_s3_object_public_url)))
        dispatch((navbarBrandImageWidthChanged(response.data.shared_component.nabvar_brand_image_width)))
        dispatch((navbarBrandImageHeightChanged(response.data.shared_component.nabvar_brand_image_height)))
        dispatch((navbarBrandBackgroundColorChanged(response.data.shared_component.navbar_brand_background_color)))
        dispatch((navbarBrandVariantColorChanged(response.data.shared_component.navbar_brand_variant_color)))
        dispatch((footerCopyRightTextChanged(response.data.shared_component.footer_copyright_text)))
        dispatch(navbarBrandImagePublicUrlChanged(response.data.shared_component.navbar_image_account_s3_image_public_url))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchCalendarContent()
  }, [dispatch, router.query.public_id, currentYear, currentMonth])

  const displayPrevMonth = () => {
    const fetchPrevMonthCalendarContent = () => {
      const prevYear = (month == 1 ? year - 1 : year)
      const prevMonth = (month == 1 ? 12 : month - 1)
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/calendar/${router.query.public_id}/monthly_reserve_frames`,
        {
          params: {
            target_year: prevYear,
            target_month: prevMonth
          }
        }
      )
      .then(function (response) {
        console.log(response)
        setCalendarContentArray(response.data.calendar_content)
        setReserveFrame(response.data.reserve_frame)
        setYear(prevYear)
        setMonth(prevMonth)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchPrevMonthCalendarContent()
  }

  const displayNextMonth = () => {
    const fetchNextMonthCalendarContent = () => {
      const nextYear = (month == 12 ? year + 1 : year)
      const nextMonth = (month == 12 ? 1 : month + 1)
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/calendar/${router.query.public_id}/monthly_reserve_frames`,
        {
          params: {
            target_year: nextYear,
            target_month: nextMonth
          }
        }
      )
      .then(function (response) {
        console.log(response)
        setCalendarContentArray(response.data.calendar_content)
        setReserveFrame(response.data.reserve_frame)
        setYear(nextYear)
        setMonth(nextMonth)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchNextMonthCalendarContent()
  }
 
  return (
    <>
      <Container className={calendarStyles.calendar}>
        {reserveFrame?.publish_status === 'Unpublish' &&
        <div className='text-center'>非公開です</div>}
        {reserveFrame?.publish_status === 'Publish' && <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <Row>
              <h2 className='mb50'>{reserveFrame && reserveFrame.title}</h2>
              <Col>
                <Button variant='outline-dark'
                        onClick={() => displayPrevMonth()}>
                  前の月
                </Button>
                <Button
                  className='ml10'
                  variant='outline-dark'
                  onClick={() => displayNextMonth()}>次の月</Button>
              </Col>
              <Col><h3>{year}年{month}月</h3></Col>
              <Col></Col>
            </Row>
            <table className='mt20'>
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
                            <a className={a.reservable ? 'badge bg-info mt10' : 'badge bg-danger mt10' }
                               href={a.reservable ? a.url : ''}>{a.title}</a>
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
        </Row>}
      </Container>
    </>
  )
}

export default MonthCalendar
