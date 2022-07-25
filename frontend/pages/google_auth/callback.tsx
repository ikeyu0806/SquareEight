import type { NextPage } from 'next'
import Spinner from 'react-bootstrap/Spinner'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const Callback: NextPage = () => {
  const router = useRouter()

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
            console.log('response body:', response.data);
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
