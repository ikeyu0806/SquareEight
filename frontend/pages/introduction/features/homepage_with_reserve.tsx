import type { NextPage } from 'next'
import FeaturesTemplates from '../../../components/templates/FeaturesTemplates'
import IntroductionNavbar from '../../../components/atoms/IntroductionNavbar'

const HomepageWithReserve: NextPage = () => {
  return(
    <>
      <IntroductionNavbar />
      <FeaturesTemplates selectable={true} />
    </>
  )
}

export default HomepageWithReserve
