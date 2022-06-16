import React from 'react'
import type { NextPage } from 'next'
import IntroductionNavbar from '../../../components/templates/IntroductionNavbar'
import CreateWebpageTemplate from '../../../components/templates/CreateWebpageTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import HomepageIntoroductionButtons from '../../../components/templates/HomepageIntoroductionButtons'

const CreateHomepage: NextPage = () => {
  return (
    <>
      <IntroductionNavbar />
      <div className='text-center mt50 mb50'>
        <h2>ホームページを作成します</h2>
      </div>
      <CreateWebpageTemplate></CreateWebpageTemplate>
      <br />
      <HomepageIntoroductionButtons></HomepageIntoroductionButtons>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default CreateHomepage
