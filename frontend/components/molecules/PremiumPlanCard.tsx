import { Card, Row, Col, Button } from 'react-bootstrap';
import TextWithCheckIcon from './TextWithCheckIcon';

interface Props {
  showJoinButton?: boolean
}

const PremiumPlanCard = ({showJoinButton}: Props): JSX.Element => {
  return (
    <Card>
      <Card.Header className='d-flex justify-content-between align-items-center card-header'>
        プレミアム{showJoinButton && <Button size='sm'>加入する</Button>}
      </Card.Header>
      <Card.Body>
        <h4>月額 4980円</h4>
        <Row>
          <Col></Col>
          <Col xs={11}>
            <Card.Text className='text-start'>
              <TextWithCheckIcon text='スタンダードプランの全機能' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='月間予約件数10000件' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='メール送信可能数 10000件' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='決済手数料5%' fill={'darkblue'}></TextWithCheckIcon><br/>
            </Card.Text>
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default PremiumPlanCard
