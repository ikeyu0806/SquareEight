import type { NextPage } from 'next'
import ServiceTemplate from '../../components/templates/ServiceTemplate'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'

const Service: NextPage = () => {
  return (
    <>
      <IntroductionNavbar />
      <ServiceTemplate/>
    </>
  )
}

export default Service
