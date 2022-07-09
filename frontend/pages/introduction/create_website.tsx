import React from 'react'
import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/templates/IntroductionNavbar'
import CreateWebsiteTemplate from '../../components/templates/CreateWebsiteTemplate'
import RegularFooter from '../../components/organisms/RegularFooter'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { useCookies } from 'react-cookie'
import { alertChanged } from '../../redux/alertSlice'

const CreateHomepage: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_gybuilder_session'])
  const websiteTag = useSelector((state: RootState) => state.homepage.websiteTag)

  const createHomepage = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/homepages`,
    {
      homepage: {
        website_tag: websiteTag
      },
    },
    {
      headers: { 
        'Session-Id': cookies._gybuilder_session
      }
    }).then(response => {
      router.push(`/introduction/${response.data.website_id}/create_webpage`)
    }).catch(error => {
      dispatch(alertChanged(error.response.data.error))
    })
  }

  return (
    <>
      <IntroductionNavbar />
      <CreateWebsiteTemplate></CreateWebsiteTemplate>
      <br />
      <div className='text-center'>
        <Button onClick={createHomepage}>次へ</Button>
      </div>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default CreateHomepage
