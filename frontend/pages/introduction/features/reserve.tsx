import type { NextPage } from 'next'
import ReserveFeatures from '../../../components/organisms/ReserveFeatures'
import IntroductionNavbar from '../../../components/atoms/IntroductionNavbar'

const Reserve: NextPage = () => {
  return(
    <>
      <IntroductionNavbar />
      <ReserveFeatures selectable={true} />
    </>
  )
}

export default Reserve
