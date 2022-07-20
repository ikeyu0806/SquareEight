import { ReactNode, useEffect } from 'react'
import CustomerPageNavbar from 'components/organisms/CustomerPageNavbar'
import RegularFooter from '../../components/organisms/RegularFooter'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { loginStatusChanged } from 'redux/currentEndUserSlice'

interface Props {
  children: ReactNode
}

const EndUserLoginLayout = ({children}: Props): JSX.Element => {
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_end_user_session'])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_user/sessions`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then((res) => {
      dispatch(loginStatusChanged('Login'))
    }).catch((e) => {
      console.log(e)
    })
  }, [dispatch, cookies._gybuilder_end_user_session, currentEndUserLogintStatus])

  return (
    <>
      {currentEndUserLogintStatus === 'Login'
        ? <><CustomerPageNavbar></CustomerPageNavbar><br/>{children}</>
        :
        currentEndUserLogintStatus === 'Logout'
          ? <div className='text-center'>ログインしてください</div>
          : <></>
      }
      <RegularFooter></RegularFooter>
    </>
  )
}

export default EndUserLoginLayout
