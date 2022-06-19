import type { NextPage } from 'next'
import { Container, Button } from 'react-bootstrap'
import AdminNavbarTemplate from '../../../../components/templates/AdminNavbarTemplate'
import EditSharedComponent from '../../../../components/templates/EditSharedComponent'
import RegularFooter from '../../../../components/organisms/RegularFooter'
import { RootState } from '../../../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { alertChanged } from '../../../../redux/alertSlice'

const EditSharedComponentPage: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_smartlesson_session'])
  
  const websiteHeader = useSelector((state: RootState) => state.homepage.websiteHeader)
  const websiteFooter = useSelector((state: RootState) => state.homepage.websiteFooter)

  const updateSharedComponent = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/homepages/update_shared_component`,
    {
      homepage: {
        website_id: router.query.website_id,
        default_header_content: websiteHeader,
        default_footer_content: websiteFooter
      }
    },
    {
      headers: {
        'Session-Id': cookies._smartlesson_session
      }
    }).then(response => {
      router.push('/admin/homepage')
      dispatch(alertChanged({message: '登録完了しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <AdminNavbarTemplate></AdminNavbarTemplate>
      <EditSharedComponent></EditSharedComponent>
      <br />
      <div className='text-center'>
        <Button onClick={updateSharedComponent}>編集を完了</Button>
      </div>
      <Container></Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default EditSharedComponentPage
