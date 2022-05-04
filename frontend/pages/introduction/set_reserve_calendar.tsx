import type { NextPage } from 'next'
import SetReserveCalendarTemplate from '../../components/templates/SetReserveCalendarTemplate'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'

const Service: NextPage = () => {
  return (
    <>
      <IntroductionNavbar />
      <SetReserveCalendarTemplate/>
    </>
  )
}

export default Service
