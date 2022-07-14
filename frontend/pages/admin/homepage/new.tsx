import React from 'react'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import CreateWebsiteTemplate from 'components/templates/CreateWebsiteTemplate'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
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
        'Session-Id': cookies._gybuilder_merchant_session
      }
    }).then(response => {
      router.push(`/admin/homepage/${response.data.website_id}/webpages/new`)
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        <CreateWebsiteTemplate></CreateWebsiteTemplate>
        <div className='text-center'>
          <Button onClick={createHomepage}>次へ</Button>
        </div>
      </MerchantUserAdminLayout>
    </>
  )
}

export default New
