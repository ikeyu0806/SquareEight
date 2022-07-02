import { NextPage } from 'next'
import CreateResource from 'components/templates/CreateResource'
import { Container } from 'react-bootstrap'
import AdminNavbarTemplate from 'components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'

const New: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_smartlesson_session'])
  const router = useRouter()

  const onSubmit = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/resources`,
    {
      resources: {
      }
    },
    {
      headers: {
        'Session-Id': cookies._smartlesson_session
      }
    }).then(response => {
      router.push('/admin/monthly_payment')
      dispatch(alertChanged({message: '月額課金プランを登録しました', show: true}))
    }).catch(error => {
      dispatch(alertChanged({message: error, show: true, type: 'danger'}))
    })
  }

  return (
    <>
      <AdminNavbarTemplate></AdminNavbarTemplate>
      <Container>
        <CreateResource></CreateResource>
      </Container>
      <div className='text-center'>
        <Button onClick={onSubmit} className='mt10'>登録する</Button>
      </div>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default New
