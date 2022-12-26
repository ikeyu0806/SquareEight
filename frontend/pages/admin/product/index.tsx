import React, { useEffect, useState } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { ProductParam } from 'interfaces/ProductParam'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Unauthorized from 'components/templates/Unauthorized'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [products, setProducts] = useState<ProductParam[]>([])
  const allowReadProduct = useSelector((state: RootState) => state.merchantUserPermission.allowReadProduct)
  const allowCreateProduct = useSelector((state: RootState) => state.merchantUserPermission.allowCreateProduct)
  const allowUpdateProduct = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateProduct)

  useEffect(() => {
    const fetchProducts = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/products`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        const productResponse: ProductParam[] = response.data.products
        setProducts(productResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchProducts()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  const decrementInventoryAllocation = (publicId: string, targetType: string) => {
    swalWithBootstrapButtons.fire({
      title: '在庫引当から減らす数を入力して下さい',
      text: '入力した数が在庫引当と有効在庫数から引かれます',
      icon: 'question',
      confirmButtonText: '登録する',
      cancelButtonText: 'キャンセル',
      input: 'number',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      console.log(result, "!")
      axios.post(`${process.env.BACKEND_URL}/api/internal/products/${publicId}/decrement_inventory_allocation`,
      {
        product: {
          target_type: targetType,
          shipped_count: Number(result.value)
        }
      },
      {
        headers: {
          'Session-Id': cookies._square_eight_merchant_session
        }
      }).then(response => {
        swalWithBootstrapButtons.fire({
          title: '登録しました',
          icon: 'info'
        })
        location.reload()
      }).catch(error => {
        swalWithBootstrapButtons.fire({
          title: '登録失敗しました',
          icon: 'error'
        })
      })
    })
  }

  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
        {allowCreateProduct === 'Allow' &&
          <a
            href='/admin/product/new'
            className='btn btn-primary mb10'>新規作成</a>}
        {allowReadProduct === 'Allow' &&
          <Table bordered>
            <thead>
              <tr>
                <th>商品名</th>
                <th>値段</th>
                <th>税率</th>
                <th>種別と在庫</th>
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
                          disabled={p.inventory_allocation < 1}
                          onClick={() => decrementInventoryAllocation(p.public_id, 'Product')}
                          size='sm'>在庫引当を発注済みにする</Button>
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
                                disabled={type.inventory_allocation < 1}
                                onClick={() => decrementInventoryAllocation(type.public_id, 'ProductType')}
                                size='sm'>在庫引当を発注済みにする</Button>
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
        }
        {allowReadProduct === 'Forbid' && <Unauthorized />}
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
