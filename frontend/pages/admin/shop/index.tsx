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
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [shops, setShops] = useState<ShopParam[]>([])
  const allowReadShop = useSelector((state: RootState) => state.merchantUserPermission.allowReadShop)
  const allowUpdateShop = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateShop)
  // Pagination用
  // 表示するレコード数
  const displayCount = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1000)
  let usePaginationNumberReturnVal = usePaginationNumber(currentPage, lastPage)
  let firstPaginationNum: number = usePaginationNumberReturnVal[0]
  let secondPaginationNum: number = usePaginationNumberReturnVal[1]
  let thirdPaginationNum: number = usePaginationNumberReturnVal[2]
  let forthPaginationNum: number = usePaginationNumberReturnVal[3]
  let fifthPaginationNum: number = usePaginationNumberReturnVal[4]

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
            active={currentPage == firstPaginationNum}
            onClick={() => setCurrentPage(firstPaginationNum)}>{firstPaginationNum}</Pagination.Item>
          {lastPage > 1 && <Pagination.Item
            active={currentPage == secondPaginationNum}
            onClick={() => setCurrentPage(secondPaginationNum)}>{secondPaginationNum}</Pagination.Item>}
          {lastPage > 2 && <Pagination.Item
            active={currentPage == thirdPaginationNum}
            onClick={() => setCurrentPage(thirdPaginationNum)}>{thirdPaginationNum}</Pagination.Item>}
          {lastPage > 3 && currentPage < lastPage &&  <Pagination.Item
            active={currentPage == forthPaginationNum}
            onClick={() => setCurrentPage(forthPaginationNum)}>{forthPaginationNum}</Pagination.Item>}
          {lastPage > 4 && currentPage < lastPage - 1 && <Pagination.Item
            active={currentPage == fifthPaginationNum}
            onClick={() => setCurrentPage(fifthPaginationNum)}>{fifthPaginationNum}</Pagination.Item>}
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
