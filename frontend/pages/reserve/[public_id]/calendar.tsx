import type { NextPage } from 'next'
import EndUserReserveCalendarTemplate from '../../../components/templates/EndUserReserveCalendarTemplate'
import IntroductionNavbar from '../../../components/templates/IntroductionNavbar'
import RegularFooter from '../../../components/organisms/RegularFooter'

const Service: NextPage = () => {
  return (
    <>
      <IntroductionNavbar />
      <EndUserReserveCalendarTemplate/>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Service
