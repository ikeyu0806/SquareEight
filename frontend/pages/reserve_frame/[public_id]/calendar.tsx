import React from 'react'
import type { NextPage } from 'next'
import MerchantCustomLayout from 'components/templates/MerchantCustomLayout'
import MonthCalendar from 'components/organisms/MonthCalendar'

const SetReserveCalendar: NextPage = () => {
  return (
    <>
      <MerchantCustomLayout>
        &nbsp;
        <MonthCalendar></MonthCalendar>
      </MerchantCustomLayout>
    </>
  )
}

export default SetReserveCalendar
