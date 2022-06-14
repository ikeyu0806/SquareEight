import type { NextPage } from 'next'
import HomepageFeatures from '../../../components/organisms/HomepageFeatures'
import IntroductionNavbar from '../../../components/templates/IntroductionNavbar'
import RegularFooter from '../../../components/organisms/RegularFooter'

const Homepage: NextPage = () => {
  return(
    <>
      <IntroductionNavbar />
      <HomepageFeatures selectable={true} />
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Homepage
