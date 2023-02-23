import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'
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
  const allowReadMonthlyPaymentPlan = useSelector((state: RootState) => state.merchantUserPermission.allowReadMonthlyPaymentPlan)

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
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchMonthlyPaymentPlans()
  }, [router.query.public_id, cookies._square_eight_merchant_session])

  return (
    <MerchantUserAdminLayout>
      {allowReadMonthlyPaymentPlan === 'Allow' && <Container>
        <h4>加入者一覧</h4>
        <Table>
          <thead>
            <tr>
              <th>顧客名</th>
              <th>加入日</th>
              <th>請求日</th>
              <th>退会日</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </Table>
      </Container>}
      {allowReadMonthlyPaymentPlan === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Subscriber
