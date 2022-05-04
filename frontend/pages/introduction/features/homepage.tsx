import type { NextPage } from 'next'
import HomepageFeatures from '../../../components/organisms/HomepageFeatures'
import IntroductionNavbar from '../../../components/atoms/IntroductionNavbar'

const Homepage: NextPage = () => {
  return(
    <>
      <IntroductionNavbar />
      <HomepageFeatures selectable={true} />
    </>
  )
}

export default Homepage
