import { ReactNode, useEffect } from 'react'
import CustomerPageNavbar from 'components/organisms/CustomerPageNavbar'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import LoginGuide from 'components/molecules/LoginGuide'
import { useCookies } from 'react-cookie'
import {  loginStatusChanged,
          todayReservationsCountChanged } from 'redux/currentEndUserSlice'
import WithoutSessionLayout from './WithoutSessionLayout'
import RegularFooter from 'components/organisms/RegularFooter'

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
        ? <>
            <CustomerPageNavbar />
              {children}
            <RegularFooter />
          </>
        :
        currentEndUserLogintStatus === 'Logout'
          ? <>
              <WithoutSessionLayout>
                  <div className='mt20'>
                    <LoginGuide />
                  </div>
              </WithoutSessionLayout>
            </>
          : <></>
      }
    </>
  )
}

export default EndUserLoginLayout
