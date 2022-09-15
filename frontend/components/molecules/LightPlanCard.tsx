import { Card, Row, Col } from 'react-bootstrap';
import TextWithCheckIcon from './TextWithCheckIcon';
import cardStyles from 'styles/PlanCard.module.css'

interface Props {
  showJoinButton?: boolean
}

const LightPlanCard = ({showJoinButton}: Props): JSX.Element => {
  return (
    <Card className={cardStyles.planCard}>
      <Card.Header className='d-flex justify-content-between align-items-center card-header'>
        ライト{showJoinButton
          && <a className='btn btn-primary' href='/admin/plan/join?plan=Light'>加入する</a>}
      </Card.Header>
      <Card.Body>
        <h4>月額 980円</h4>
        <Row>
          <Col></Col>
          <Col xs={11}>
            <Card.Text className='text-start'>
              <TextWithCheckIcon text='フリープランの全機能' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='月間予約件数500件' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='広告非表示' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='スタッフや設備備品などのリソースによる予約受付数制限' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='登録顧客の表示数制限解除' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='メール送信可能数 500件' fill={'darkblue'}></TextWithCheckIcon><br/>
            </Card.Text>
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default LightPlanCard
