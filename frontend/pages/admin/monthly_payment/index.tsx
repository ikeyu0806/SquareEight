import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table, Pagination } from 'react-bootstrap'
import axios from 'axios'
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import Unauthorized from 'components/templates/Unauthorized'
import SubscriptionDescribeModal from 'components/molecules/SubscriptionDescribeModal'
import { showSubscriptionDescribeModalChanged } from 'redux/accountSlice'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const router = useRouter()
  const [monthlyPaymentPlans, setMonthlyPaymentPlans] = useState<MonthlyPaymentPlanParam[]>([])
  const allowReadMonthlyPaymentPlan = useSelector((state: RootState) => state.merchantUserPermission.allowReadMonthlyPaymentPlan)
  const allowUpdateMonthlyPaymentPlan = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateMonthlyPaymentPlan)
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
    const fetchMonthlyPaymentPlans = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/monthly_payment_plans`, {
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
        const montylyPaymentPlanResponse: MonthlyPaymentPlanParam[] = response.data.monthly_payment_plans
        setMonthlyPaymentPlans(montylyPaymentPlanResponse)
        setLastPage(response.data.last_page)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchMonthlyPaymentPlans()
  }, [router.query.public_id, cookies._square_eight_merchant_session, currentPage, lastPage])

  return (
    <>
      <MerchantUserAdminLayout>
        <br />
        {allowReadMonthlyPaymentPlan === 'Allow' && <Container>
          <div className='mb20'>
            <a className='btn btn-primary'
              href='/admin/monthly_payment/new'>月額サブスクリプション登録</a>
            <a
              className='ml20 text-white btn btn-info'
              onClick={() => dispatch(showSubscriptionDescribeModalChanged(true))}>サブスクリプションの請求と解約について</a>
          </div>
          <h4>月額サブスクリプション一覧</h4>
          <Table bordered>
            <thead>
              <tr>
                <th>プラン名</th>
                <th>料金</th>
                <th>予約受付設定</th>
                {allowUpdateMonthlyPaymentPlan === 'Allow' && <th>編集</th>}
                <th>購入ページ</th>
                <th>加入者一覧</th>
                <th>公開設定</th>
              </tr>
            </thead>
            <tbody>
              {monthlyPaymentPlans.map((plan, i) => {
                return (
                  <tr key={i}>
                    <td>{plan.name}</td>
                    <td>{plan.price}</td>
                    <td>
                      {plan.reserve_is_unlimited ? '無制限' : String(plan.reserve_interval_number) + (plan.reserve_interval_unit === 'Day' ? '日に' : '週に') + String(plan.enable_reserve_count) + '回予約可能' }
                    </td>
                    {allowUpdateMonthlyPaymentPlan === 'Allow' && <td><a className='btn btn-primary btn-sm' href={`/admin/monthly_payment/${plan.public_id}/edit`}>編集</a></td>}
                    <td>
                    <a className='btn btn-primary btn-sm'
                           target='_blank' rel='noreferrer'
                           href={`/monthly_payment/${plan.public_id}/purchase`}>プレビュー</a>
                    </td>
                    <td>
                    <a className='btn btn-primary btn-sm'
                       href={`/admin/monthly_payment/${plan.public_id}/subscriber`}>
                      加入者一覧
                    </a>
                    </td>
                    <td>
                      <PublishStatusBadge publishStatus={plan.publish_status} />
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
          <SubscriptionDescribeModal/>
        </Container>}
        {allowReadMonthlyPaymentPlan === 'Forbid' && <Unauthorized />}
        
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
