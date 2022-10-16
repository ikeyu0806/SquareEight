import { Card, Row, Col, Button } from 'react-bootstrap';
import TextWithCheckIcon from './TextWithCheckIcon';
import cardStyles from 'styles/Home.module.css'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import CancelSystemPlanButton from 'components/atoms/CanelSystemPlanButton'

interface Props {
  showJoinButton?: boolean
}

const PremiumPlanCard = ({showJoinButton}: Props): JSX.Element => {
  const currentServicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  return (
    <Card className={cardStyles.planCard}>
      <Card.Header className='d-flex justify-content-between align-items-center card-header'>
        プレミアム
        {showJoinButton
          &&
          <>
            {
              currentServicePlan === 'Premium'
              ?
                <CancelSystemPlanButton></CancelSystemPlanButton>
              :
                <a className='btn btn-primary' href='/admin/plan/join?plan=Premium'>加入する</a>
            }
          </>}
      </Card.Header>
      <Card.Body>
        <h4 className={cardStyles.plan_price}>月額 4980円</h4>
        <Row>
          <Col></Col>
          <Col xs={11}>
            <Card.Text className={cardStyles.plan_description}>
              <TextWithCheckIcon text='スタンダードプランの全機能' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='月間予約件数10000件' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='テンプレートからのメール送信可能数 10000件' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='決済手数料4%' fill={'darkblue'}></TextWithCheckIcon><br/>
            </Card.Text>
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default PremiumPlanCard
