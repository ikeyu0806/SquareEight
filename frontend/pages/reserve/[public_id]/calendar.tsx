import type { NextPage } from 'next'
import EndUserReserveCalendarTemplate from '../../../components/templates/EndUserReserveCalendarTemplate'
import IntroductionNavbar from '../../../components/atoms/IntroductionNavbar'

const Service: NextPage = () => {
  return (
    <>
      <IntroductionNavbar />
      <EndUserReserveCalendarTemplate/>
    </>
  )
}

export default Service
