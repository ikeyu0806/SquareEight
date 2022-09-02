import { Card, Row, Col, Button } from 'react-bootstrap';
import TextWithCheckIcon from './TextWithCheckIcon';

interface Props {
  showJoinButton?: boolean
}

const StandardPlanCard = ({showJoinButton}: Props): JSX.Element => {
  return (
    <Card>
      <Card.Header className='d-flex justify-content-between align-items-center card-header'>
        スタンダード{showJoinButton
          && <a className='btn btn-primary' href='/admin/plan/join?plan=Standard'>加入する</a>}
      </Card.Header>
      <Card.Body>
        <h4>月額 1980円</h4>
        <Row>
          <Col></Col>
          <Col xs={11}>
            <Card.Text className='text-start'>
              <TextWithCheckIcon text='ライトプランの全機能' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='月間予約件数2000件' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='メール送信可能数 1000件' fill={'darkblue'}></TextWithCheckIcon><br/>
            </Card.Text>
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default StandardPlanCard
