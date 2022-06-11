import React from 'react'
import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'
import CreateHomepageTemplate from '../../components/templates/CreateHomepageTemplate'
import RegularFooter from '../../components/organisms/RegularFooter'
import HomepageIntoroductionButtons from '../../components/templates/HomepageIntoroductionButtons'

const CreateHomepage: NextPage = () => {
  return (
    <>
      <IntroductionNavbar />
      <div className='text-center mt50 mb50'>
        <h2>ホームページを作成します</h2>
      </div>
      <CreateHomepageTemplate></CreateHomepageTemplate>
      <br />
      <HomepageIntoroductionButtons></HomepageIntoroductionButtons>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default CreateHomepage
