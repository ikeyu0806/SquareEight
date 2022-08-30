import type { NextPage } from 'next'
import CreateWebpageTemplate from 'components/templates/CreateWebpageTemplate'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { RootState } from 'redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { alertChanged } from 'redux/alertSlice'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)
  const webpageTag = useSelector((state: RootState) => state.webpage.webpageTag)

  const createWebpage = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/webpages`,
    {
      webpage: {
        page_content: pageContent,
        tag: webpageTag
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      router.push('/admin/webpage/')
      dispatch(alertChanged({message: 'ページを登録しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        <div className='mt30'></div>
        <CreateWebpageTemplate></CreateWebpageTemplate>
        <div className='text-center mt50'>
          <Button onClick={createWebpage}>登録する</Button>
        </div>
      </MerchantUserAdminLayout>
    </>
  )
}

export default New
