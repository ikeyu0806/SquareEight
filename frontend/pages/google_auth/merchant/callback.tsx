import type { NextPage } from 'next'
import Spinner from 'react-bootstrap/Spinner'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { alertChanged } from 'redux/alertSlice'
import { getMerchantUserGoogleAuthLocalStorage,
         removeMerchantUserGoogleAuthLocalStorage,
         SIGNUP_CONSTANT,
         LOGIN_CONSTANT } from 'functions/googleAuthLocalStorage'

const Callback: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [cookies, setCookie] = useCookies(['_square_eight_merchant_session'])

  const findOrCreateMerchantByGoogleAuth = (googleAuthId: string, GoogleAuthEmail: string) => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/merchant_users/find_or_create_by_google_auth`, {
      merchant_user: {
        google_auth_id: googleAuthId,
        google_auth_email: GoogleAuthEmail,
        google_merchant_user_auth_type: getMerchantUserGoogleAuthLocalStorage()
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    })
    .then(function (response) {
      createMerchantSesssionByGoogleAuth(googleAuthId)
      removeMerchantUserGoogleAuthLocalStorage()
    })
    .catch(err => {
      console.log(err)
      let google_auth_type = getMerchantUserGoogleAuthLocalStorage()
      if (google_auth_type === SIGNUP_CONSTANT) {
        router.push('/merchant/signup')
      }
      if (google_auth_type === LOGIN_CONSTANT) {
        router.push('/merchant/login')
      }
      removeMerchantUserGoogleAuthLocalStorage()
      dispatch(alertChanged({message: "認証失敗しました。ユーザが見つかりません", show: true, type: 'danger'}))
    })
  }

  const createMerchantSesssionByGoogleAuth = (googleAuthId: string) => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/merchant/sessions/create_by_google_auth`, {
      merchant_user: {
        google_auth_id: googleAuthId
      }
    })
    .then(function (response) {
      setCookie('_square_eight_merchant_session', response.data.session_id.public_id, { path: '/'})
      router.push('/admin/dashboard')
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    const fetchAccessToken = () => {
      var params = new URLSearchParams()
      params.append('code', String(router.query.code) || '')
      params.append('client_id', process.env.GOOGLE_AUTH_MERCHANT_USER_CLIENT_ID || '')
      params.append('client_secret', process.env.GOOGLE_AUTH_MERCHANT_USER_CLIENT_SECRET || '')
      params.append('redirect_uri', process.env.GOOGLE_AUTH_MERCHANT_USER_REDIRECT_URL  || '')
      params.append('grant_type', 'authorization_code')
      params.append('access_type', 'offline')

      axios.post('https://www.googleapis.com/oauth2/v4/token', params)
      .then(function (response) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.data.access_token}`)
        .then(response => {
          console.log(response.data)
          findOrCreateMerchantByGoogleAuth(response.data.id, response.data.email)
        })
        .catch(err => {
            console.log('err:', err);
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchAccessToken()
  }, [router.query.code, findOrCreateMerchantByGoogleAuth])

  return (
    <WithoutSessionLayout>
      <div className='text-center mt50 mb50'>
        <Spinner animation='border' role='status'>
        </Spinner>
      </div>
    </WithoutSessionLayout>
  )
}

export default Callback
