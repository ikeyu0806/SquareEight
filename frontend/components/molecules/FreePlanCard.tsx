import { Card, Row, Col } from 'react-bootstrap'
import TextWithCheckIcon from './TextWithCheckIcon'
import cardStyles from 'styles/Card.module.css'

const FreePlanCard = (): JSX.Element => {
  return (
    <Card className={cardStyles.planCard}>
      <Card.Header>
        <span className={cardStyles.plan_name}>フリー</span>
      </Card.Header>
      <Card.Body>
        <div className={cardStyles.plan_price}>月額 0円</div>
        <Row>
          <Col></Col>
          <Col xs={11}>
            <Card.Text className={cardStyles.plan_description}>
              <TextWithCheckIcon text='オンライン予約受付 月間10件' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='登録顧客を10件まで表示' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='オンラインアンケート 月間10件まで受付' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='リソース登録3件まで登録可能' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='メール配信可能数 月間10件' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='決済手数料8%' fill={'darkblue'}></TextWithCheckIcon><br/>
            </Card.Text>
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default FreePlanCard
