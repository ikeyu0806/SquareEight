import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Button } from 'react-bootstrap'
import FreePlanCard from 'components/molecules/FreePlanCard'
import LightPlanCard from 'components/molecules/LightPlanCard'
import StandardPlanCard from 'components/molecules/StarndardPlanCard'
import PremiumPlanCard from 'components/molecules/PremiumPlanCard'

const Choice: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <div className='text-center'>
          <h3 className='mb30'>プラン一覧</h3>
        </div>
        <Row>
          <Col>
            <FreePlanCard></FreePlanCard>
          </Col>
          <Col>
            <LightPlanCard showJoinButton={true}></LightPlanCard>
          </Col>
          <Col>
            <StandardPlanCard showJoinButton={true}></StandardPlanCard>
          </Col>
          <Col>
            <PremiumPlanCard showJoinButton={true}></PremiumPlanCard>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Choice
