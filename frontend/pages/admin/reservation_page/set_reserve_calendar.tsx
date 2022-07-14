import { NextPage } from 'next'
import React from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import SetReserveCalendarTemplate from 'components/templates/SetReserveCalendarTemplate'

const SetReserveCalendar: NextPage = () => {
  return (
    <>
      <MerchantUserAdminLayout>
        <br/>
        <br/>
        <SetReserveCalendarTemplate></SetReserveCalendarTemplate>
      </MerchantUserAdminLayout>
    </>
  )
}

export default SetReserveCalendar
