import { Card, Row, Col } from 'react-bootstrap';
import TextWithCheckIcon from './TextWithCheckIcon';
import cardStyles from 'styles/Home.module.css'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import CancelSystemPlanButton from 'components/atoms/CanelSystemPlanButton'

interface Props {
  showJoinButton?: boolean
}

const LightPlanCard = ({showJoinButton}: Props): JSX.Element => {
  const currentServicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  return (
    <Card className={cardStyles.planCard}>
      <Card.Header className='d-flex justify-content-between align-items-center card-header'>
        ライト{showJoinButton
          &&
          <>
            {currentServicePlan === 'Light'
            ?
              <CancelSystemPlanButton></CancelSystemPlanButton>
            :
              <a className='btn btn-primary' href='/admin/plan/join?plan=Light'>加入する</a>}
          </>}
      </Card.Header>
      <Card.Body>
        <h4 className={cardStyles.plan_price}>月額 980円</h4>
        <Row>
          <Col></Col>
          <Col xs={11}>
            <Card.Text className={cardStyles.plan_description}>
              <TextWithCheckIcon text='フリープランの全機能' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='月間予約件数500件' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='広告非表示' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='登録顧客を200件まで表示' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='決済手数料5%' fill={'darkblue'}></TextWithCheckIcon><br/>
            </Card.Text>
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default LightPlanCard
