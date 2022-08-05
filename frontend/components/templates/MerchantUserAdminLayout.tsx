import { ReactNode, useEffect } from 'react'
import AdminNavbarTemplate from 'components/organisms/AdminNavbarTemplate'
import RegularFooter from '../../components/organisms/RegularFooter'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { loginStatusChanged,
         stripeAccountEnableChanged,
         stripeCustomerEnableChanged } from 'redux/currentMerchantUserSlice'

interface Props {
  children: ReactNode
}

const MerchantUserAdminLayout = ({children}: Props): JSX.Element => {
  const merchantUserLoginStatus = useSelector((state: RootState) => state.currentMerchantUser.loginStatus)
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/internal/merchant/sessions`,
    {
      headers: {
        'Session-Id': cookies._gybuilder_merchant_session
      }
    }).then((response) => {
      dispatch(loginStatusChanged('Login'))
      dispatch(stripeAccountEnableChanged(response.data.user.stripe_account_enable))
      dispatch(stripeCustomerEnableChanged(response.data.user.stripe_customer_enable))
    }).catch((e) => {
      dispatch(loginStatusChanged('Logout'))
      console.log(e)
    })
  }, [dispatch, cookies._gybuilder_merchant_session, merchantUserLoginStatus])

  return (
    <>
      {merchantUserLoginStatus === 'Login'
        ? <><AdminNavbarTemplate></AdminNavbarTemplate><br/>{children}</>
        :
        merchantUserLoginStatus === 'Logout'
          ? <div className='text-center mt30 mb30'>ログインしてください</div>
          : <></>
      }
      <RegularFooter></RegularFooter>
    </>
  )
}

export default MerchantUserAdminLayout
