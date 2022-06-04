import type { NextPage } from 'next'
import SetReserveCalendarTemplate from '../../components/templates/SetReserveCalendarTemplate'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'
import RegularFooter from '../../components/organisms/RegularFooter'

const Service: NextPage = () => {
  return (
    <>
      <IntroductionNavbar />
      <SetReserveCalendarTemplate/>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Service
