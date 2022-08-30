import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import EditSharedComponent from 'components/templates/EditSharedComponent'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'
import { websiteHeaderChanged, websiteFooterChanged } from 'redux/webpageSlice'

const EditSharedComponentPage: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  
  const websiteHeader = useSelector((state: RootState) => state.webpage.websiteHeader)
  const websiteFooter = useSelector((state: RootState) => state.webpage.websiteFooter)

  useEffect(() => {
    const fetchWebpage = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/webpages/shared_component`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response)
        dispatch(websiteHeaderChanged(response.data.header_json))
        dispatch(websiteFooterChanged(response.data.footer_json))
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchWebpage()
  }, [router.query.id, cookies._square_eight_merchant_session, router.query.website_id, dispatch])

  const updateSharedComponent = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/webpages/update_shared_component`,
    {
      webpage: {
        website_id: router.query.website_id,
        default_header_content: websiteHeader,
        default_footer_content: websiteFooter
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      router.push('/admin/webpage')
      dispatch(alertChanged({message: '登録完了しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <MerchantUserAdminLayout>
      <EditSharedComponent></EditSharedComponent>
      <br />
      <div className='text-center'>
        <Button onClick={updateSharedComponent}>編集を完了</Button>
      </div>
      <Container></Container>
    </MerchantUserAdminLayout>
  )
}

export default EditSharedComponentPage
