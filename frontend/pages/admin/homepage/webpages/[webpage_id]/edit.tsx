import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import CreateWebpageTemplate from '../../../../../components/templates/CreateWebpageTemplate'
import RegularFooter from '../../../../../components/organisms/RegularFooter'
import AdminNavbarTemplate from '../../../../../components/templates/AdminNavbarTemplate'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { RootState } from '../../../../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { WebpageParam } from '../../../../../interfaces/WebpageParam'
import { webpagePathChanged, webpageTagChanged, pageContentChanged } from '../../../../../redux/homepageSlice'
import { Button } from 'react-bootstrap'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()
  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)
  const webpagePath = useSelector((state: RootState) => state.homepage.webpagePath)
  const webpageTag = useSelector((state: RootState) => state.homepage.webpageTag)

  useEffect(() => {
    const fetchHomepages = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/webpages/edit?id=${router.query.webpage_id}`, {
          headers: { 
            'Session-Id': cookies._smartlesson_session
          },
        }
      )
      .then(function (response) {
        const webpageResponse: WebpageParam = response.data.webpage
        console.log({webpageResponse})
        dispatch(webpagePathChanged(webpageResponse.path))
        dispatch(webpageTagChanged(webpageResponse.tag))
        dispatch(pageContentChanged(webpageResponse.block_contents || []))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchHomepages()
  }, [router.query.id, cookies._smartlesson_session, router.query.webpage_id, dispatch])

  const updateWebpage = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/webpages/update`,
    {
      webpage: {
        id: router.query.webpage_id,
        page_content: pageContent,
        path: webpagePath,
        tag: webpageTag
      }
    },
    {
      headers: {
        'Session-Id': cookies._smartlesson_session
      }
    }).then(response => {
      // router.push('/admin/homepage/')
    }).catch(error => {
    })
  }

  return (
    <>
      <AdminNavbarTemplate></AdminNavbarTemplate>
      <div className='mt30'></div>
      <CreateWebpageTemplate></CreateWebpageTemplate>
      <br/>
      <br/>
      <br/>
      <div className='text-center'>
        <Button onClick={updateWebpage}>更新する</Button>
      </div>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Edit
