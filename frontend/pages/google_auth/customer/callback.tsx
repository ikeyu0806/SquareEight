import type { NextPage } from 'next'
import Spinner from 'react-bootstrap/Spinner'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const Callback: NextPage = () => {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['_gybuilder_end_user_session'])

  const findOrCreateEndUserByGoogleAuth = (googleAuthId: string, GoogleAuthEmail: string) => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/end_users/find_or_create_by_google_auth`, {
      end_user: {
        google_auth_id: googleAuthId,
        google_auth_email: GoogleAuthEmail
      }
    })
    .then(function (response) {
      createEndUserSesssionByGoogleAuth(googleAuthId)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const createEndUserSesssionByGoogleAuth = (googleAuthId: string) => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/end_user/sessions/create_by_google_auth`, {
      end_user: {
        google_auth_id: googleAuthId
      }
    })
    .then(function (response) {
      setCookie('_gybuilder_end_user_session', response.data.session_id.public_id, { path: '/'})
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
      params.append('client_id', process.env.GOOGLE_AUTH_CLIENT_ID || '')
      params.append('client_secret', process.env.GOOGLE_AUTH_CLIENT_SECRET || '')
      params.append('redirect_uri', process.env.GOOGLE_AUTH_REDIRECT_URL  || '')
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
