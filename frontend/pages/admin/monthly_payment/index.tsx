import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, ListGroup, Row, Col, Table } from 'react-bootstrap'
import axios from 'axios'
import { MonthlyPaymentPlanParam } from 'interfaces/MonthlyPaymentPlanParam'
import GuideStripeAccountRegister from 'components/templates/GuideStripeAccountRegister'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import PublishStatusBadge from 'components/atoms/PublishStatusBadge'

const Index: NextPage = () => {
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const [monthlyPaymentPlans, setMonthlyPaymentPlans] = useState<MonthlyPaymentPlanParam[]>([])
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)

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
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              {stripeAccountEnable === 'Enable' && 
              <>
              <a className='btn btn-primary mt10 mb20'
              href='/admin/monthly_payment/new'>月額課金プラン登録</a>
              <h3>月額課金プラン一覧</h3>
              <ListGroup>
              {monthlyPaymentPlans.map((plan, i) => {
                return (
                  <ListGroup.Item key={i}>
                    <Row>
                      <Col>
                        プラン名 {plan.name}
                        <PublishStatusBadge publishStatus={plan.publish_status} /><br/>
                        料金 {plan.price}<br/>
                        予約受付設定 {plan.reserve_is_unlimited ? '無制限' : String(plan.reserve_interval_number) + (plan.reserve_interval_unit === 'Day' ? '日に' : '週に') + String(plan.enable_reserve_count) + '回予約可能' }
                      </Col>
                      <Col>
                        <a className='btn btn-primary btn-sm' href={`/admin/monthly_payment/${plan.public_id}/edit`}>編集</a>
                        <br/>
                        <a className='btn btn-primary mt10 btn-sm'
                           target='_blank' rel='noreferrer'
                           href={`/monthly_payment/${plan.public_id}/purchase`}>購入ページプレビュー</a>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              })}
              </ListGroup>
              </>}
              {stripeAccountEnable === 'Disable' && <GuideStripeAccountRegister></GuideStripeAccountRegister>}
            </Col>
          </Row>
        </Container>
        
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
