import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import CreateWebpageTemplate from 'components/templates/CreateWebpageTemplate'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { webpageTagChanged,
         pageContentChanged,
         currentMaxSortOrderChanged,
         publishStatusChanged,
         selectedShopIdsChanged } from 'redux/webpageSlice'
import { Button } from 'react-bootstrap'
import { alertChanged } from 'redux/alertSlice'
import Unauthorized from 'components/templates/Unauthorized'

const Edit: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)
  const webpageTag = useSelector((state: RootState) => state.webpage.webpageTag)
  const publishStatus = useSelector((state: RootState) => state.webpage.publishStatus)
  const allowUpdateWebpage = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateWebpage)
  const shops = useSelector((state: RootState) => state.account.shops)

  useEffect(() => {
    const fetchWebpage = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/webpages/${router.query.public_id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        dispatch(publishStatusChanged(response.data.webpage.publish_status))
        dispatch(webpageTagChanged(response.data.webpage.tag))
        dispatch(pageContentChanged({blockContent: response.data.webpage.block_contents}))
        dispatch(currentMaxSortOrderChanged(response.data.webpage.max_sort_order))
        dispatch(selectedShopIdsChanged(response.data.webpage.selected_shop_ids))
      })
      .catch(error => {
        dispatch(alertChanged({message: error, show: true, type: 'danger'}))
        console.log(error)
      })
    }
    fetchWebpage()
  }, [router.query.public_id, cookies._square_eight_merchant_session, dispatch])

  const updateWebpage = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/webpages/${router.query.public_id}/update`,
    {
      webpage: {
        id: router.query.public_id,
        page_content: pageContent,
        tag: webpageTag,
        publish_status: publishStatus,
        shops: shops
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      router.push(`/admin/webpage/`)
    }).catch(error => {
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
      {allowUpdateWebpage === 'Allow' &&
        <>
          <div className='mt30'></div>
          <CreateWebpageTemplate showDeleteButton={true}></CreateWebpageTemplate>
          <br/>
          <br/>
          <br/>
          <div className='text-center'>
            <Button onClick={updateWebpage}>更新する</Button>
          </div>
        </>}
        {allowUpdateWebpage === 'Forbid' && <Unauthorized />}
      </MerchantUserAdminLayout>
    </>
  )
}

export default Edit
