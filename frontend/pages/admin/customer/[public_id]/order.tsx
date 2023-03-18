import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import { CustomerParam } from 'interfaces/CustomerParam'
import { OrderItemParam } from 'interfaces/OrderItemParam'
import OrderItemTypeBadge from 'components/atoms/OrderItemTypeBadge'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [orderItems, setOrderItems] = useState<OrderItemParam[]>([])
  const [customer, setCustomer] = useState<CustomerParam>()
  const allowReadCustomer = useSelector((state: RootState) => state.merchantUserPermission.allowReadCustomer)

  useEffect(() => {
    const fetchOrders = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/account/customers/${router.query.public_id}/orders`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        setOrderItems(response.data.order_items)
        setCustomer(response.data.customer)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchOrders()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  const updateToShipped = (itemPublicId: string) => {
    swalWithBootstrapButtons.fire({
      title: '発送済みに更新します',
      html: `更新すると在庫引当数が0になり在庫数から差し引かれます。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: '更新する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${process.env.BACKEND_URL}/api/internal/order_items/${itemPublicId}/update_shipped`,
        {},
        {
          headers: {
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '更新しました',
            icon: 'info'
          })
          location.reload()
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '更新失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowReadCustomer === 'Allow' &&
      <Container>
        <h4>{customer?.last_name}{customer?.first_name} 注文一覧</h4>
        <Table bordered>
        <thead>
          <tr>
            <th style={{width: '40%'}}>商品名</th>
            <th>購入数</th>
            <th>料金</th>
            <th>配送日時指定</th>
            <th>配送先</th>
            <th>発送ステータス</th>
          </tr>
        </thead>
        <tbody>
          {orderItems && orderItems.map((item, i) => {
            return (
              <tr key={i}>
                <td>
                  {item.product_name} <OrderItemTypeBadge itemType={item.item_type}/>
                  {item.item_type === 'Product' && !item.is_product_type_exists &&
                    <div>
                      在庫数: {item.product_inventory}
                    </div>
                  }
                  {item.item_type === 'Product' && !item.is_product_type_exists &&
                    <div>
                      在庫引当数: {item.product_inventory_allocation}
                    </div>
                  }
                  {item.item_type === 'Product' && item.is_product_type_exists &&
                    <div>
                      在庫数: {item.product_type_inventory}
                    </div>
                  }
                  {item.item_type === 'Product' && item.is_product_type_exists &&
                    <div>
                      在庫引当数: {item.product_type_inventory_allocation}
                    </div>
                  }
                </td>
                <td>
                  {item.quantity}
                </td>
                <td>
                  ¥{item.price}
                </td>
                <td>
                  {item.delivery_date_text}
                </td>
                <td>
                  <div>
                    {item.item_type === 'Product' && <>〒{item.postal_code}</>}
                  </div>
                  <div>{item.address}</div>
                </td>
                <td>
                {item.item_type === 'Product' && !item.shipped &&
                  <>
                    <div className='badge bg-danger'>
                      未発送
                    </div>
                    <div>
                      <a className='btn btn-primary btn-sm mt10'
                        onClick={() => updateToShipped(item.public_id)}>
                        発送済みに更新する
                      </a>
                    </div>
                  </>}
                  {item.shipped &&
                  <span className='badge bg-info'>
                    発送済み
                  </span>}
                </td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </Container>}
      {allowReadCustomer === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Index
