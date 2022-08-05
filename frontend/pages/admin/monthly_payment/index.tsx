import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'
import GuideStripeAccountRegister from 'components/templates/GuideStripeAccountRegister'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()
  const [monthlyPaymentPlans, setMonthlyPaymentPlans] = useState<MonthlyPaymentPlanParam[]>([])
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)

  useEffect(() => {
    const fetchMonthlyPaymentPlans = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/monthly_payment_plans`, {
          headers: { 
            'Session-Id': cookies._gybuilder_merchant_session
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
  }, [router.query.id, cookies._gybuilder_merchant_session])
  return (
    <>
      <MerchantUserAdminLayout>
        <br />
        <Container>
        {stripeAccountEnable === 'Enable' && 
          <Table bordered>
            <thead>
              <tr>
                <th className='text-center'>プラン名</th>
                <th className='text-center'>月額料金</th>
                <th className='text-center'>予約受付設定</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {monthlyPaymentPlans.map((plan, i) => {
              return (
                <tr key={i}>
                  <td className='text-center'>{plan.name}</td>
                  <td className='text-center'>{plan.price}</td>
                  <td className='text-center'>{plan.reserve_is_unlimited ? '無制限' : String(plan.reserve_interval_number) + (plan.reserve_interval_unit === 'Day' ? '日に' : '週に') + String(plan.enable_reserve_count) + '回予約可能' }</td>
                  <td>
                    <div className='text-center'>
                      <a className='btn btn-primary' href={`/admin/monthly_payment/${plan.id}/edit`}>編集</a>
                    </div>
                  </td>
                  <td>
                    <div className='text-center'>
                      <a className='btn btn-primary' href={`/monthly_payment/${plan.id}/purchase`}>購入ページプレビュー</a>
                    </div>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </Table>}
          {stripeAccountEnable === 'Disable' && <GuideStripeAccountRegister></GuideStripeAccountRegister>}
        </Container>
        
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
