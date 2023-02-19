import { Card, Row, Col, Button } from 'react-bootstrap';
import TextWithCheckIcon from './TextWithCheckIcon';
import cardStyles from 'styles/Card.module.css'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import CancelSystemPlanButton from 'components/atoms/CanelSystemPlanButton'
import { premiumPlanPrice } from 'constants/systemPlanPrices'

interface Props {
  showJoinButton?: boolean
}

const PremiumPlanCard = ({showJoinButton}: Props): JSX.Element => {
  const currentServicePlan =  useSelector((state: RootState) => state.currentMerchantUser.servicePlan)

  return (
    <Card className={cardStyles.planCard}>
      {showJoinButton
        ?
          <Card.Header className='d-flex justify-content-between align-items-center card-header'>
          <span className={cardStyles.plan_name}>プレミアム</span>
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
        :
          <Card.Header>
            <span className={cardStyles.plan_name}>プレミアム</span>
          </Card.Header>}
      <Card.Body>
        <h4 className={cardStyles.plan_price}>月額 {premiumPlanPrice}円</h4>
        <Row>
          <Col></Col>
          <Col xs={11}>
            <Card.Text className={cardStyles.plan_description}>
              <TextWithCheckIcon text='スタンダードプランの全機能' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='管理ユーザへの権限設定' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='複数ビジネスアカウント登録機能' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='登録顧客の表示制限解除' fill={'darkblue'}></TextWithCheckIcon><br/>
              <TextWithCheckIcon text='月間予約件数制限解除' fill={'darkblue'}></TextWithCheckIcon><br/>
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
