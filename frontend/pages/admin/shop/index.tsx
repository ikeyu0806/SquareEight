import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Container, Table, Pagination } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { ShopParam } from 'interfaces/ShopParam'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import { usePagenationNumber } from 'hooks/usePagenationNumber'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [shops, setShops] = useState<ShopParam[]>([])
  const allowReadShop = useSelector((state: RootState) => state.merchantUserPermission.allowReadShop)
  const allowUpdateShop = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateShop)
  // Pagenation用
  // 表示するレコード数
  const displayCount = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1000)
  let usePagenationNumberReturnVal = usePagenationNumber(currentPage, lastPage)
  let firstPagenationNum: number = usePagenationNumberReturnVal[0]
  let secondPagenationNum: number = usePagenationNumberReturnVal[1]
  let thirdPagenationNum: number = usePagenationNumberReturnVal[2]
  let forthPagenationNum: number = usePagenationNumberReturnVal[3]
  let fifthPagenationNum: number = usePagenationNumberReturnVal[4]

  useEffect(() => {
    const fetchResources = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/shops`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
          params: {
            current_page: currentPage,
            display_count: displayCount
          }
        }
      )
      .then(function (response) {
        setShops(response.data.shops)
        setLastPage(response.data.last_page)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchResources()
  }, [cookies._square_eight_merchant_session, currentPage, lastPage])

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowReadShop === 'Allow' && <Container>
        <h4>店舗一覧</h4>
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
        <Pagination>
          <Pagination.First onClick={() => setCurrentPage(1)} />
          {currentPage > 1 && <Pagination.Prev
            onClick={() => setCurrentPage(currentPage - 1)} />}
          <Pagination.Item
            active={currentPage == firstPagenationNum}
            onClick={() => setCurrentPage(firstPagenationNum)}>{firstPagenationNum}</Pagination.Item>
          {lastPage > 1 && <Pagination.Item
            active={currentPage == secondPagenationNum}
            onClick={() => setCurrentPage(secondPagenationNum)}>{secondPagenationNum}</Pagination.Item>}
          {lastPage > 2 && <Pagination.Item
            active={currentPage == thirdPagenationNum}
            onClick={() => setCurrentPage(thirdPagenationNum)}>{thirdPagenationNum}</Pagination.Item>}
          {lastPage > 3 && currentPage < lastPage &&  <Pagination.Item
            active={currentPage == forthPagenationNum}
            onClick={() => setCurrentPage(forthPagenationNum)}>{forthPagenationNum}</Pagination.Item>}
          {lastPage > 4 && currentPage < lastPage - 1 && <Pagination.Item
            active={currentPage == fifthPagenationNum}
            onClick={() => setCurrentPage(fifthPagenationNum)}>{fifthPagenationNum}</Pagination.Item>}
          {currentPage !== lastPage && <Pagination.Next
            onClick={() => setCurrentPage(currentPage + 1)} />}
          <Pagination.Last onClick={() => setCurrentPage(lastPage)} />
        </Pagination>
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
