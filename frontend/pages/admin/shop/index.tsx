import { NextPage } from 'next'
import { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  useEffect(() => {
    const fetchResources = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/shops`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchResources()
  }, [cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Table bordered>
          <thead>
            <tr>
              <th>店舗名</th>
              <th>住所</th>
              <th>編集</th>
              <th>店舗紹介ページ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td><a className='btn btn-primary'>編集</a></td>
              <td><a className='btn btn-primary'>店舗紹介ページ</a></td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
