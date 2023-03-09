import React, { useEffect, useState } from 'react'
import { Container, Table, Button, Pagination } from 'react-bootstrap'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { ProductParam } from 'interfaces/ProductParam'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Unauthorized from 'components/templates/Unauthorized'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import { inventoryChanged, publicIdChanged,
         showInventoryDescriptionModalChanged,
         showInventoryReplenishmentModalChanged,
         inventoryReplenishmentModalTargetChanged } from 'redux/productSlice'
import InventoryDescriptionModal from 'components/templates/InventoryDescriptionModal'
import InventoryReplenishmentModal from 'components/templates/InventoryReplenishmentModal'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [products, setProducts] = useState<ProductParam[]>([])
  const allowReadProduct = useSelector((state: RootState) => state.merchantUserPermission.allowReadProduct)
  const allowCreateProduct = useSelector((state: RootState) => state.merchantUserPermission.allowCreateProduct)
  const allowUpdateProduct = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateProduct)
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
    const fetchProducts = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/products`, {
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
        const productResponse: ProductParam[] = response.data.products
        setProducts(productResponse)
        setLastPage(response.data.last_page)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchProducts()
  }, [router.query.public_id, cookies._square_eight_merchant_session, currentPage, lastPage])

  return (
    <>
      <MerchantUserAdminLayout>
        <br />
        <Container>
        <h4>商品一覧</h4>
        {allowCreateProduct === 'Allow' &&
          <a
            href='/admin/product/new'
            className='btn btn-primary mb10'>新規作成</a>}
        {allowReadProduct === 'Allow' &&
          products.length > 0 &&
          <>
            <Table bordered>
              <thead>
                <tr>
                  <th>商品名</th>
                  <th>値段</th>
                  <th>税率</th>
                  <th>
                    種別と在庫
                    <Button
                      onClick={() => dispatch(showInventoryDescriptionModalChanged(true))}
                      variant='info'
                      className='text-white ml10'
                      size='sm'>在庫管理について</Button>
                  </th>
                  <th>公開ステータス</th>
                  <th>編集</th>
                  <th>購入ページ</th>
                </tr>
              </thead>
              <tbody>
                {products && products.map((p, i) => {
                  return (
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td>￥{p.price}</td>
                      <td>{p.tax_rate}%</td>
                      <td>
                        {!p.show_product_type_form &&
                        <>
                          <div>在庫数: {p.inventory}</div>
                          <div>在庫引当数: {p.inventory_allocation}</div>
                          <Button
                            onClick={() => {
                              dispatch(showInventoryReplenishmentModalChanged(true))
                              dispatch(publicIdChanged(p.public_id))
                              dispatch(inventoryChanged(p.inventory))
                              dispatch(inventoryReplenishmentModalTargetChanged('Product'))
                            }}
                            className='mr10'
                            size='sm'>在庫数を変更する</Button>
                            <br />
                            <a href='/admin/order_item'>在庫引当は注文管理画面から発注済みに更新できます</a>
                        </>}
                        {p.show_product_type_form &&
                        <>
                          {p.product_types.map((type, i) => {
                            return (
                              <>
                                <div>{type.name}</div>
                                <div>有効在庫数: {type.inventory}</div>
                                <div>在庫引当数: {type.inventory_allocation}</div>
                                <Button
                                  onClick={() => {
                                    dispatch(showInventoryReplenishmentModalChanged(true))
                                    dispatch(publicIdChanged(type.public_id))
                                    dispatch(inventoryChanged(type.inventory))
                                    dispatch(inventoryReplenishmentModalTargetChanged('ProductType'))
                                  }}
                                  className='mr10'
                                  size='sm'>在庫数を変更する</Button>
                                <br />
                                <a href='/admin/order_item'>在庫引当は注文管理画面から発注済みに更新できます</a>
                                <hr />
                              </>
                            )
                          })}  
                        </>}
                      </td>
                      <td>
                        <PublishStatusBadge publishStatus={p.publish_status} />
                      </td>
                      <td>
                        {allowUpdateProduct === 'Allow' &&
                          <a className='btn btn-sm btn-primary' href={`/admin/product/${p.public_id}/edit`}>
                            編集
                          </a>}
                      </td>
                      <td>
                        <a className='btn btn-sm btn-primary ml10'
                          href={`/product/${p.public_id}/purchase`}
                          target='_blank' rel='noreferrer'>購入ページプレビュー</a>
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
          </>
        }
        {products.length === 0 &&
          <div className='text-center font-size-20'>
            商品が登録されていません
          </div>}
        {allowReadProduct === 'Forbid' && <Unauthorized />}
        </Container>
        <InventoryDescriptionModal></InventoryDescriptionModal>
        <InventoryReplenishmentModal></InventoryReplenishmentModal>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
