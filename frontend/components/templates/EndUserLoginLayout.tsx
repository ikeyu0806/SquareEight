import { ReactNode, useEffect } from 'react'
import CustomerPageNavbar from 'components/organisms/CustomerPageNavbar'
import RegularFooter from 'components/organisms/RegularFooter'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import {  loginStatusChanged,
          todayReservationsCountChanged } from 'redux/currentEndUserSlice'
import CommonNavbar from 'components/organisms/CommonNavbar'
interface Props {
  children: ReactNode
}

const EndUserLoginLayout = ({children}: Props): JSX.Element => {
  const currentEndUserLogintStatus = useSelector((state: RootState) => state.currentEndUser.loginStatus)
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_end_user_session'])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/end_user/sessions`,
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then((response) => {
      console.log(response.data)
      dispatch(loginStatusChanged('Login'))
      dispatch(todayReservationsCountChanged(response.data.user.today_reservations_count))
    }).catch((e) => {
      dispatch(loginStatusChanged('Logout'))
      console.log(e)
    })
  }, [dispatch, cookies._square_eight_end_user_session, currentEndUserLogintStatus])

  return (
    <>
      {currentEndUserLogintStatus === 'Login'
        ? <><CustomerPageNavbar></CustomerPageNavbar>{children}</>
        :
        currentEndUserLogintStatus === 'Logout'
          ? <><CommonNavbar></CommonNavbar><div className='text-center mt50 mb50'>ログインしてください</div></>
          : <></>
      }
      <RegularFooter></RegularFooter>
    </>
  )
}

export default EndUserLoginLayout
