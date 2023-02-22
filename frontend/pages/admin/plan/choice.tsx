import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Button } from 'react-bootstrap'
import FreePlanCard from 'components/molecules/FreePlanCard'
import LightPlanCard from 'components/molecules/LightPlanCard'
import StandardPlanCard from 'components/molecules/StarndardPlanCard'
import PremiumPlanCard from 'components/molecules/PremiumPlanCard'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import { showshowSystemPlanDescribeModalChanged } from 'redux/accountSlice'
import { useDispatch } from 'react-redux'
import SystemPlanDescribeModal from 'components/molecules/SystemPlanDescribeModal'

const Choice: NextPage = () => {
  const dispatch = useDispatch()
  const allowUpdateSharedComponent = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateSharedComponent)

  return (
    <MerchantUserAdminLayout>
      <br />
      {allowUpdateSharedComponent === 'Allow' && <Container>
        <div className='mb30'>
          <h3>プラン一覧</h3>
          <a
            className='mt20 text-white btn btn-info'
            onClick={() => dispatch(showshowSystemPlanDescribeModalChanged(true))}>プランの請求と解約について</a>
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
        <SystemPlanDescribeModal />
      </Container>}
      {allowUpdateSharedComponent === 'Forbid' && <Unauthorized />}
    </MerchantUserAdminLayout>
  )
}

export default Choice
