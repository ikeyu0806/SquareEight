import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import Unauthorized from 'components/templates/Unauthorized'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [monthlyPaymentPlans, setMonthlyPaymentPlans] = useState<MonthlyPaymentPlanParam[]>([])
  const allowReadMonthlyPaymentPlan = useSelector((state: RootState) => state.merchantUserPermission.allowReadMonthlyPaymentPlan)
  const allowUpdateMonthlyPaymentPlan = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateMonthlyPaymentPlan)

  useEffect(() => {
    const fetchMonthlyPaymentPlans = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/monthly_payment_plans`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        const montylyPaymentPlanResponse: MonthlyPaymentPlanParam[] = response.data.monthly_payment_plans
        setMonthlyPaymentPlans(montylyPaymentPlanResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchMonthlyPaymentPlans()
  }, [router.query.public_id, cookies._square_eight_merchant_session])
  return (
    <>
      <MerchantUserAdminLayout>
        <br />
        {allowReadMonthlyPaymentPlan === 'Allow' && <Container>
          <a className='btn btn-primary mt10 mb20'
             href='/admin/monthly_payment/new'>月額サブスクリプション登録</a>
          <h4>月額サブスクリプション一覧</h4>
          <Table bordered>
            <thead>
              <tr>
                <th>プラン名</th>
                <th>料金</th>
                <th>予約受付設定</th>
                {allowUpdateMonthlyPaymentPlan === 'Allow' && <th>編集</th>}
                <th>購入ページ</th>
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
                      <PublishStatusBadge publishStatus={plan.publish_status} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>}
        {allowReadMonthlyPaymentPlan === 'Forbid' && <Unauthorized />}
        
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
