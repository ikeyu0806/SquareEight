import { NextPage } from 'next'
import React from 'react'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import SetReserveCalendarTemplate from 'components/templates/SetReserveCalendarTemplate'

const SetReserveCalendar: NextPage = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
        <br/>
        <br/>
        <SetReserveCalendarTemplate></SetReserveCalendarTemplate>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default SetReserveCalendar
