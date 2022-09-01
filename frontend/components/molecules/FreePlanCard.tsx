import { Card, Row, Col } from 'react-bootstrap';
import TextWithCheckIcon from './TextWithCheckIcon';

const FreePlanCard = (): JSX.Element => {
  return (
    <Card>
      <Card.Header>フリー</Card.Header>
      <Card.Body>
        <h4>月額 0円</h4>
        <Row>
          <Col></Col>
          <Col xs={11}>
            <Card.Text className='text-start'>
              <TextWithCheckIcon text='物販商品販売' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='オンライン予約受付 月間50件' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='予約受付の営業時間設定' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='予約受付の特例営業/休業日時設定' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='予約の回数券支払い' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='クレジットカード月額課金プラン作成' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='予約の月額課金プラン支払い' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='顧客管理' fill={'darkblue'}></TextWithCheckIcon><br/>
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
