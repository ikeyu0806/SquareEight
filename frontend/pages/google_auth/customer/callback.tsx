import type { NextPage } from 'next'
import Spinner from 'react-bootstrap/Spinner'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch } from 'react-redux'
import { getEndUserGoogleAuthLocalStorage,
         removeEndUserGoogleAuthLocalStorage,
         SIGNUP_CONSTANT,
         LOGIN_CONSTANT } from 'functions/googleAuthLocalStorage'

const Callback: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [cookies, setCookie] = useCookies(['_square_eight_end_user_session'])

  const findOrCreateEndUserByGoogleAuth = (googleAuthId: string, GoogleAuthEmail: string) => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/end_users/find_or_create_by_google_auth`, {
      end_user: {
        google_auth_id: googleAuthId,
        google_auth_email: GoogleAuthEmail,
        google_end_user_auth_type: getEndUserGoogleAuthLocalStorage()
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_end_user_session
      }
    })
    .then(function (response) {
      createEndUserSesssionByGoogleAuth(googleAuthId)
      removeEndUserGoogleAuthLocalStorage()
    })
    .catch(err => {
      console.log(err)
      let google_auth_type = getEndUserGoogleAuthLocalStorage()
      if (google_auth_type === SIGNUP_CONSTANT) {
        router.push('/customer/signup')
      }
      if (google_auth_type === LOGIN_CONSTANT) {
        router.push('/customer/login')
      }
      removeEndUserGoogleAuthLocalStorage()
      dispatch(alertChanged({message: "認証失敗しました。ユーザが見つかりません", show: true, type: 'danger'}))
    })
  }

  const createEndUserSesssionByGoogleAuth = (googleAuthId: string) => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/end_user/sessions/create_by_google_auth`, {
      end_user: {
        google_auth_id: googleAuthId
      }
    })
    .then(function (response) {
      setCookie('_square_eight_end_user_session', response.data.session_id.public_id, { path: '/'})
      router.push('/customer_page')
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    const fetchAccessToken = () => {
      var params = new URLSearchParams()
      params.append('code', String(router.query.code) || '')
      params.append('client_id', process.env.GOOGLE_AUTH_END_USER_CLIENT_ID || '')
      params.append('client_secret', process.env.GOOGLE_AUTH_END_USER_CLIENT_SECRET || '')
      params.append('redirect_uri', process.env.GOOGLE_AUTH_END_USER_REDIRECT_URL  || '')
      params.append('grant_type', 'authorization_code')
      params.append('access_type', 'offline')

      axios.post('https://www.googleapis.com/oauth2/v4/token', params)
      .then(function (response) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.data.access_token}`)
        .then(response => {
          console.log(response.data)
          findOrCreateEndUserByGoogleAuth(response.data.id, response.data.email)
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
  }, [router.query.code])

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
