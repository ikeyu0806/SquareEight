import homeStyles from 'styles/Home.module.css'
import { Row, Col} from 'react-bootstrap'
import { lightPlanPrice, standardPlanPrice, premiumPlanPrice } from 'constants/systemPlanPrices'

const BeautyLandingPageOverview = (): JSX.Element => {
  return (
      <>
        <Row>
          <Col md={6}>
            <p>
              <span className={homeStyles.wellness_lp_linear_gradient_blue}>美容院・美容サロン・医療クリニックのサービス事業者様必見</span>
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
              <div>美容室・ヘアサロン・ネイルサロン・まつげサロン・メイクサロン・医療クリニックの運営を最適化。</div>
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
              className={homeStyles.beauty_salon_image}
              src='/images/lp/beauty_salon.webp'
              alt='Beauty Salon Image' />
          </Col>
        </Row>
      </>
    )
  }
  
  export default BeautyLandingPageOverview
  