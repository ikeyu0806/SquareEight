import { NextPage } from 'next'
import React, { useState } from 'react'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import MerchantPaymentMethodIndex from 'components/templates/MerchantPaymentMethodIndex'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import { alertChanged } from 'redux/alertSlice'
import { useDispatch } from 'react-redux'
import Unauthorized from 'components/templates/Unauthorized'
import { lightPlanPrice, standardPlanPrice, premiumPlanPrice } from 'constants/systemPlanPrices'

const Join: NextPage = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const paymentMethods = useSelector((state: RootState) => state.currentMerchantUser.paymentMethods)
  const allowUpdateSharedComponent = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateSharedComponent)

  const execJoinPlan = () => {
    setIsLoading(true)
    axios.post(`${process.env.BACKEND_URL}/api/internal/accounts/update_plan`,
    {
      account: {
        service_plan: router.query.plan,
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      setIsLoading(false)
      router.push(`/admin/plan/complete?plan=${router.query.plan}`)
    }).catch(error => {
      setIsLoading(false)
      dispatch(alertChanged({message: '登録に失敗しました。', type: 'danger', show: true}))
    })
  }

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowUpdateSharedComponent === 'Allow' && <Container>
        <Row>
          <Col md={7}>
            <MerchantPaymentMethodIndex></MerchantPaymentMethodIndex>
          </Col>
          <Col md={5}>
            <Card>
              <Card.Body>
                <h2>
                  {router.query.plan === 'Light' && <>ライトプラン</>}
                  {router.query.plan === 'Standard' && <>スタンダードプラン</>}
                  {router.query.plan === 'Premium' && <>プレミアムプラン</>}
                </h2>
                <h3>
                  ご請求額: １ヶ月 ￥
                  {router.query.plan === 'Light' && <>{lightPlanPrice}</>}
                  {router.query.plan === 'Standard' && <>{standardPlanPrice}</>}
                  {router.query.plan === 'Premium' && <>{premiumPlanPrice}</>}
                  </h3>
                <Button
                  disabled={!paymentMethods.length}
                  className='mt10'
                  onClick={() => execJoinPlan()}>
                  {isLoading && <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>}
                  注文を確定
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>}
      {allowUpdateSharedComponent === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Join
