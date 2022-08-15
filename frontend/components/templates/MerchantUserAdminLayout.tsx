import { ReactNode, useEffect } from 'react'
import AdminNavbarTemplate from 'components/organisms/AdminNavbarTemplate'
import RegularFooter from '../../components/organisms/RegularFooter'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import WithoutSessionLayout from './WithoutSessionLayout'
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
      dispatch(stripeAccountEnableChanged(response.data.user.stripe_account_enable ? 'Enable' : 'Disable'))
      dispatch(stripeCustomerEnableChanged(response.data.user.stripe_customer_enable ? 'Enable' : 'Disable'))
    }).catch((e) => {
      dispatch(loginStatusChanged('Logout'))
    })
  }, [dispatch, cookies._gybuilder_merchant_session, merchantUserLoginStatus])

  return (
    <>
      {merchantUserLoginStatus === 'Login'
        ? <><AdminNavbarTemplate></AdminNavbarTemplate><br/>{children}<RegularFooter></RegularFooter></>
        :
        merchantUserLoginStatus === 'Logout'
          ? <WithoutSessionLayout><div className='text-center mt30 mb30'>ログインしてください</div></WithoutSessionLayout>
          : <></>
      }
    </>
  )
}

export default MerchantUserAdminLayout
