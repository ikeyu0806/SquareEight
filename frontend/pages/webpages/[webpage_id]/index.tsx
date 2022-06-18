import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { WebpageParam } from '../../../interfaces/WebpageParam'
import { webpageTagChanged, pageContentChanged } from '../../../redux/homepageSlice'
import MerchantWebpage from '../../../components/organisms/MerchantWebpage'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()

  useEffect(() => {
    const fetchWebpage = () => {
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
        dispatch(webpageTagChanged(webpageResponse.tag))
        dispatch(pageContentChanged(webpageResponse.block_contents || []))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchWebpage()
  }, [router.query.id, cookies._smartlesson_session, router.query.webpage_id, dispatch])

  return (
    <>
      <MerchantWebpage></MerchantWebpage>
    </>
  )
}

export default Index
