import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import CreateWebpageTemplate from 'components/templates/CreateWebpageTemplate'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { WebpageParam } from 'interfaces/WebpageParam'
import { webpageTagChanged, pageContentChanged, isTopPageChanged } from 'redux/homepageSlice'
import { Button } from 'react-bootstrap'
import { alertChanged } from 'redux/alertSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()
  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)
  const webpageTag = useSelector((state: RootState) => state.homepage.webpageTag)
  const isTopPage = useSelector((state: RootState) => state.homepage.isTopPage)

  useEffect(() => {
    const fetchWebpage = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/webpages/edit?id=${router.query.webpage_id}`, {
          headers: { 
            'Session-Id': cookies._gybuilder_merchant_session
          },
        }
      )
      .then(function (response) {
        const webpageResponse: WebpageParam = response.data.webpage
        console.log({webpageResponse})
        dispatch(webpageTagChanged(webpageResponse.tag))
        dispatch(isTopPageChanged(webpageResponse.is_top_page))
        dispatch(pageContentChanged(webpageResponse.block_contents || []))
      })
      .catch(error => {
        dispatch(alertChanged({message: error, show: true, type: 'danger'}))
        console.log(error)
      })
    }
    fetchWebpage()
  }, [router.query.id, cookies._gybuilder_merchant_session, router.query.webpage_id, dispatch])

  const updateWebpage = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/webpages/update`,
    {
      webpage: {
        id: router.query.webpage_id,
        page_content: pageContent,
        tag: webpageTag,
        is_top_page: isTopPage
      }
    },
    {
      headers: {
        'Session-Id': cookies._gybuilder_merchant_session
      }
    }).then(response => {
      router.push(`/admin/homepage/${router.query.website_id}/webpages`)
    }).catch(error => {
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
      <div className='mt30'></div>
      <CreateWebpageTemplate></CreateWebpageTemplate>
      <br/>
      <br/>
      <br/>
      <div className='text-center'>
        <Button onClick={updateWebpage}>更新する</Button>
      </div>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Edit
