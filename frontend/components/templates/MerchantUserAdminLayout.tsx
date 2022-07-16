import { ReactNode, useEffect } from 'react'
import AdminNavbarTemplate from 'components/organisms/AdminNavbarTemplate'
import RegularFooter from '../../components/organisms/RegularFooter'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { loginStatusChanged } from 'redux/currentMerchantUserSlice'

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
    }).then((res) => {
      dispatch(loginStatusChanged('Login'))
    }).catch((e) => {
      console.log(e)
    })
  }, [dispatch, cookies._gybuilder_merchant_session, merchantUserLoginStatus])

  return (
    <>
      {merchantUserLoginStatus === 'Login'
        ? <><AdminNavbarTemplate></AdminNavbarTemplate><br/>{children}</>
        :
        merchantUserLoginStatus === 'Logout'
          ? <div className='text-center'>ログインしてください</div>
          : <></>
      }
      <RegularFooter></RegularFooter>
    </>
  )
}

export default MerchantUserAdminLayout
