import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import CreateHomepageTemplate from '../../../../../components/templates/CreateHomepageTemplate'
import RegularFooter from '../../../../../components/organisms/RegularFooter'
import AdminNavbarTemplate from '../../../../../components/templates/AdminNavbarTemplate'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { WebpageParam } from '../../../../../interfaces/WebpageParam'
import { webpagePathChanged, webpageTagChanged, pageContentChanged } from '../../../../../redux/homepageSlice'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()

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

  return (
    <>
      <AdminNavbarTemplate></AdminNavbarTemplate>
      <div className='mt30'></div>
      <CreateHomepageTemplate></CreateHomepageTemplate>
      <br/>
      <br/>
      <br/>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Edit
