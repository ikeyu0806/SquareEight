import React, { useState } from 'react'
import type { NextPage } from 'next'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import CreateHomepageTemplate from '../../../components/templates/CreateHomepageTemplate'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useCookies } from 'react-cookie'

const New: NextPage = () => {
  const router = useRouter()
  const [cookies] = useCookies(['_smartlesson_session'])
  const websiteTag = useSelector((state: RootState) => state.homepage.websiteTag)
  const [alertMessage, setAlertMessage] = useState('')

  const createHomepage = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/homepages`,
    {
      homepage: {
        website_tag: websiteTag
      },
    },
    {
      headers: { 
        'Session-Id': cookies._smartlesson_session
      }
    }).then(response => {
      router.push(`/admin/homepage/${response.data.website_id}/webpages/new`)
    }).catch(error => {
      setAlertMessage(error.response.data.error)
    })
  }

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <CreateHomepageTemplate></CreateHomepageTemplate>
      <div className='text-center'>
        <Button onClick={createHomepage}>次へ</Button>
      </div>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default New
