import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { ShopParam } from 'interfaces/ShopParam'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [shops, setShops] = useState<ShopParam[]>([])
  const allowReadShop = useSelector((state: RootState) => state.merchantUserPermission.allowReadShop)
  const allowUpdateShop = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateShop)

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
      <br />
      {allowReadShop === 'Allow' && <Container>
        <Table bordered>
          <thead>
            <tr>
              <th>店舗名</th>
              <th>住所</th>
              {allowUpdateShop === 'Allow' && <th>編集</th>}
              <th>店舗紹介ページ</th>
              <th>公開設定</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((shop, i) => {
              return (
                <tr key={i}>
                  <td>{shop.name}</td>
                  <td>{shop.postal_code}<br />{shop.state}{shop.city}{shop.line1}{shop.line2}</td>
                  {allowUpdateShop === 'Allow' &&
                  <td className='text-center'>
                    <a
                      href={`/admin/shop/${shop.public_id}/edit`}
                      className='btn btn-primary'>編集</a>
                  </td>}
                  <td className='text-center'>
                    <a
                      href={`/shop/${shop.public_id}`}
                      className='btn btn-primary'
                      target='_blank' rel='noreferrer'>店舗紹介ページ</a>
                  </td>
                  <td className='text-center'>
                    <PublishStatusBadge publishStatus={shop.publish_status} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {shops.length === 0 &&
         <div className='text-center font-size-20'>
          店舗が登録されていません。
         </div>}
      </Container>}
      {allowReadShop === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Index
