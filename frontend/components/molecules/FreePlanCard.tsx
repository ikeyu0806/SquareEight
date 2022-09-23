import { Card, Row, Col } from 'react-bootstrap';
import TextWithCheckIcon from './TextWithCheckIcon';
import cardStyles from 'styles/Home.module.css'

const FreePlanCard = (): JSX.Element => {
  return (
    <Card className={cardStyles.planCard}>
      <Card.Header>フリー</Card.Header>
      <Card.Body>
        <div className={cardStyles.plan_price}>月額 0円</div>
        <Row>
          <Col></Col>
          <Col xs={11}>
            <Card.Text className={cardStyles.plan_description}>
              <TextWithCheckIcon text='物販商品販売' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='オンライン予約受付 月間50件' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='回数券作成' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='月額課金プラン作成' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='登録顧客を50件まで表示' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='メールテンプレート5件まで作成' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='メール送信可能数 50件' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='売上管理' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='決済手数料7%' fill={'darkblue'}></TextWithCheckIcon><br/>
            </Card.Text>
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default FreePlanCard
