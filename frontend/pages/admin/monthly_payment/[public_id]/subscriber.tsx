import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'
import { MerchantStripeSubscriptionParam } from 'interfaces/MerchantStripeSubscriptionParam'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'
import Unauthorized from 'components/templates/Unauthorized'
import SubscriptionDescribeModal from 'components/molecules/SubscriptionDescribeModal'
import { showSubscriptionDescribeModalChanged } from 'redux/accountSlice'

const Subscriber: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const dispatch = useDispatch()
  const router = useRouter()
  const [monthlyPaymentPlans, setMonthlyPaymentPlans] = useState<MonthlyPaymentPlanParam>()
  const [merchantStripeSubscriptions, setMerchantStripeSubscriptions] = useState<MerchantStripeSubscriptionParam[]>([])
  const allowReadMonthlyPaymentPlan = useSelector((state: RootState) => state.merchantUserPermission.allowReadMonthlyPaymentPlan)

  useEffect(() => {
    const fetchMonthlyPaymentPlans = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/monthly_payment_plans/${router.query.public_id}/subscribers`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        console.log(response.data)
        const montylyPaymentPlanResponse: MonthlyPaymentPlanParam = response.data.monthly_payment_plan
        setMonthlyPaymentPlans(montylyPaymentPlanResponse)
        const merchantStripeSubscriptionsResponse: MerchantStripeSubscriptionParam[] = response.data.merchant_stripe_subscriptions
        setMerchantStripeSubscriptions(merchantStripeSubscriptionsResponse)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchMonthlyPaymentPlans()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowReadMonthlyPaymentPlan === 'Allow' && <Container>
        <h4>加入者一覧</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>顧客名</th>
              <th>加入日</th>
              <th>請求日</th>
              <th>退会日</th>
            </tr>
          </thead>
          <tbody>
            {merchantStripeSubscriptions.map((s, i) => {
              return (
                <tr key={i}>
                  <td>
                    <a href={`/admin/customer/${s.customer_public_id}/order`}>{s.customer_full_name}</a>
                  </td>
                  <td>{s.joined_date_text}</td>
                  <td>{s.billing_cycle_anchor_day}</td>
                  <th>{s.canceled_at_text}</th>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>}
      {allowReadMonthlyPaymentPlan === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Subscriber
