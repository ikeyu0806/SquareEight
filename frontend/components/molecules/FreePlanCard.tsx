import { Card, Row, Col } from 'react-bootstrap'
import TextWithCheckIcon from './TextWithCheckIcon'
import cardStyles from 'styles/Card.module.css'
import {  RESERVATION_LIMIT,
          CUSTOMER_DISPLAY_LIMIT,
          SEND_MAIL_LIMIT,
          STRIPE_APPLICATION_FEE_PERCENT,
          RESOURCE_REGISTER_LIMIT } from 'constants/systemPlanLimit'
const FreePlanCard = (): JSX.Element => {
  return (
    <Card className={cardStyles.planCard}>
      <Card.Header>
        <span className={cardStyles.free_plan_name}>フリー</span>
      </Card.Header>
      <Card.Body>
        <div className={cardStyles.plan_price}>月額 0円</div>
        <Row>
          <Col></Col>
          <Col xs={11}>
            <Card.Text className={cardStyles.plan_description}>
              <TextWithCheckIcon text={`オンライン予約受付 月間${RESERVATION_LIMIT.Free}件`} fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text={`登録顧客を${CUSTOMER_DISPLAY_LIMIT.Free}件まで表示`} fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='オンラインアンケート 無制限で作成可能' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text={`リソース登録${RESOURCE_REGISTER_LIMIT.Free}件まで登録可能`} fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text={`メール配信可能数 月間${SEND_MAIL_LIMIT.Free}件`} fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text={`決済手数料${STRIPE_APPLICATION_FEE_PERCENT.Free}%`} fill={'darkblue'}></TextWithCheckIcon><br/>
            </Card.Text>
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default FreePlanCard
