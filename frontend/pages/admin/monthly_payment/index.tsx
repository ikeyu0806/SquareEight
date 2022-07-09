import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import AdminNavbarTemplate from 'components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_gybuilder_session'])
  const router = useRouter()
  const [monthlyPaymentPlans, setMonthlyPaymentPlans] = useState<MonthlyPaymentPlanParam[]>([])

  useEffect(() => {
    const fetchMonthlyPaymentPlans = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/monthly_payment_plans`, {
          headers: { 
            'Session-Id': cookies._gybuilder_session
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
  }, [router.query.id, cookies._gybuilder_session])
  return (
    <>
      <AdminNavbarTemplate></AdminNavbarTemplate>
        <br />
        <Container>
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
                </tr>
              )
            })}
            </tbody>
          </Table>
        </Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Index
