import React from 'react'
import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/templates/IntroductionNavbar'
import CreateHomepageTemplate from '../../components/templates/CreateHomepageTemplate'
import RegularFooter from '../../components/organisms/RegularFooter'

const CreateHomepage: NextPage = () => {
  return (
    <>
      <IntroductionNavbar />
      <CreateHomepageTemplate></CreateHomepageTemplate>
      <br />
      
      <RegularFooter></RegularFooter>
    </>
  )
}

export default CreateHomepage
