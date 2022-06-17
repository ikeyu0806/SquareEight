import React from 'react'
import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/templates/IntroductionNavbar'
import CreateWebsiteTemplate from '../../components/templates/CreateWebsiteTemplate'
import RegularFooter from '../../components/organisms/RegularFooter'
import { Button } from 'react-bootstrap'

const CreateHomepage: NextPage = () => {
  const onSubmit = () => {
    
  }

  return (
    <>
      <IntroductionNavbar />
      <CreateWebsiteTemplate></CreateWebsiteTemplate>
      <br />
      <div className='text-center'>
        <Button onClick={onSubmit}>次へ</Button>
      </div>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default CreateHomepage
