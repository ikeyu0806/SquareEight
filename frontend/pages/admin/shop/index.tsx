import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { ShopParam } from 'interfaces/ShopParam'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [shops, setShops] = useState<ShopParam[]>([])

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
        setShops(response.data.shops)
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
            {shops.map((shop, i) => {
              return (
                <tr key={i}>
                  <td>{shop.name}</td>
                  <td>{shop.postal_code}</td>
                  <td className='text-center'><a className='btn btn-primary'>編集</a></td>
                  <td className='text-center'>
                    <a
                      href={`/shop/${shop.public_id}`}
                      className='btn btn-primary'
                      target='_blank' rel='noreferrer'>店舗紹介ページ</a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
