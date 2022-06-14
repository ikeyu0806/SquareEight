import type { NextPage } from 'next'
import FeaturesTemplates from '../../../components/templates/FeaturesTemplates'
import IntroductionNavbar from '../../../components/templates/IntroductionNavbar'
import RegularFooter from '../../../components/organisms/RegularFooter'

const HomepageWithReserve: NextPage = () => {
  return(
    <>
      <IntroductionNavbar />
      <FeaturesTemplates selectable={true} />
      <RegularFooter></RegularFooter>
    </>
  )
}

export default HomepageWithReserve
