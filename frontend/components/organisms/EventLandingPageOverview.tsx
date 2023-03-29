import homeStyles from 'styles/Home.module.css'
import { Row, Col} from 'react-bootstrap'
import { lightPlanPrice, standardPlanPrice, premiumPlanPrice } from 'constants/systemPlanPrices'

const EventLandingPageOverview = (): JSX.Element => {
  return (
      <>
        <Row>
          <Col md={6}>
            <p>
              <span className={homeStyles.wellness_lp_linear_gradient_blue}>イベント・セミナー・体験会ビジネスのサービス事業者様必見</span>
            </p>
              <div>
                <span className={homeStyles.description_brand_badge}>予約システム</span>
                <span className={homeStyles.description_brand_badge}>会員管理</span>
                <span className={homeStyles.description_brand_badge}>月謝</span>
                <span className={homeStyles.description_brand_badge}>回数券</span>
              </div>
              <div className='mt20'>
                <span className={homeStyles.description_brand_badge}>物販</span>
                <span className={homeStyles.description_brand_badge}>オンラインアンケート</span>
                <span className={homeStyles.description_brand_badge}>メール/LINE送信</span>
              </div>
            <div className={homeStyles.wellness_lp_service_overview_text}>
              <div>イベント・セミナー・体験会ビジネスを最適化。</div>
              <div className='mt20'>格安予約システム「SquareEight」</div>
            </div>
            <div className={homeStyles.text_center_with_sp}>
              <a href='/merchant/signup'><button
                className={homeStyles.description_trial_button}>
                無料でお試し。有料プランも{lightPlanPrice}円〜
              </button></a>
            </div>
          </Col>
          <Col md={6}>
            <img
              className={homeStyles.fitness_image}
              src='/images/lp/fitness_image.webp'
              alt='Fitness Image' />
          </Col>
        </Row>
      </>
    )
  }
  
  export default EventLandingPageOverview
  