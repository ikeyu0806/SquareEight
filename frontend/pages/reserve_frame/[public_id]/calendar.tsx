import React from 'react'
import type { NextPage } from 'next'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import Calendar from 'components/templates/Calendar'

const SetReserveCalendar: NextPage = () => {
  return (
    <>
      <MerchantCustomLayout>
        &nbsp;
        <Calendar></Calendar>
      </MerchantCustomLayout>
    </>
  )
}

export default SetReserveCalendar
