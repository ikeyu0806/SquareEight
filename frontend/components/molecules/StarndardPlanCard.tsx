import { Card, Row, Col, Button } from 'react-bootstrap';
import TextWithCheckIcon from './TextWithCheckIcon';
import cardStyles from 'styles/Card.module.css'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import CancelSystemPlanButton from 'components/atoms/CanelSystemPlanButton'
import { standardPlanPrice } from 'constants/systemPlanPrices'
import {  RESERVATION_LIMIT,
          CUSTOMER_DISPLAY_LIMIT,
          SEND_MAIL_LIMIT,
          STRIPE_APPLICATION_FEE_PERCENT } from 'constants/systemPlanLimit'
interface Props {
  showJoinButton?: boolean
}

const StandardPlanCard = ({showJoinButton}: Props): JSX.Element => {
  const currentServicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  return (
    <Card className={cardStyles.planCard}>
      {showJoinButton
        ?
          <Card.Header className='d-flex justify-content-between align-items-center card-header'>
            <span className={cardStyles.plan_name}>スタンダード</span>{showJoinButton
              &&
              <>
                {currentServicePlan === 'Standard'
                ?
                  <CancelSystemPlanButton></CancelSystemPlanButton>
                :
                  <a className='btn btn-primary' href='/admin/plan/join?plan=Standard'>加入する</a>}
              </>}
          </Card.Header>
        :
          <Card.Header>
            <span className={cardStyles.plan_name}>スタンダード</span>
          </Card.Header>
        }
      <Card.Body>
        <h4 className={cardStyles.plan_price}>月額 {standardPlanPrice}円</h4>
        <Row>
          <Col></Col>
          <Col xs={11}>
            <Card.Text className={cardStyles.plan_description}>
              <TextWithCheckIcon text='ライトプランの全機能' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text={`月間予約件数${RESERVATION_LIMIT.Standard}件`} fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='複数管理ユーザ登録' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text={`登録顧客を${CUSTOMER_DISPLAY_LIMIT.Standard}件まで表示`} fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='リソース登録数制限解除' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text={`メール配信可能数 月間${SEND_MAIL_LIMIT.Standard}件`} fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text={`決済手数料${STRIPE_APPLICATION_FEE_PERCENT.Standard}%`} fill={'darkblue'}></TextWithCheckIcon><br/>
            </Card.Text>
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default StandardPlanCard
