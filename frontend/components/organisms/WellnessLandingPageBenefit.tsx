import homeStyles from 'styles/Home.module.css'
import { Row, Col} from 'react-bootstrap'
import { lightPlanPrice, standardPlanPrice, premiumPlanPrice } from 'constants/systemPlanPrices'

const WellnessLandingPageBenefit = (): JSX.Element => {
  return (
    <>
      <div className='text-center font-size-30 font-weight-bold' id='benefit'>
        <p className={homeStyles.section_headline_parent}>
          <span className={homeStyles.section_headline}>導入効果</span>
        </p>
      </div>
      <Row>
        <Col lg={6}>
          <div className={homeStyles.benefit_box}>
            <div className='font-size-25'>
              <div className={homeStyles.wellness_benefit_headline}>
                格安で予約ページ作成
              </div>
            </div>
            <div className={homeStyles.benefit_text}>
              <br />他社予約サービスではスタンダードプランで月額料金数万以上と高額な運用費用がかかります。
              <br /><br />当サービスは有料プラン1480円〜ご利用可能！
            </div>
          </div>
        </Col>
        <Col lg={6}>
          <div className={homeStyles.benefit_box}>
            <div className='font-size-25'>
              <div className={homeStyles.wellness_benefit_headline}>
                決済手数料の削減
              </div>
            </div>
            <div className={homeStyles.benefit_text}>
              <br />月額{premiumPlanPrice}円のプレミアムプランでは決済手数料4%でご利用可能。
              <br />
              <br />例えば売り上げが100万円の状態で決済手数料8%のシステムから乗り換えた場合、7万円以上のコストが削減できます。
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col lg={6}>
          <div className={homeStyles.benefit_box}>
            <div className='font-size-25'>
              <div className={homeStyles.wellness_benefit_headline}>
                スタッフの工数削減
              </div>
            </div>
            <div className={homeStyles.benefit_text}>
              <br />予約を24時間自動で受け付けることができます。
              <br />
              <br />日毎、週ごと、曜日ごとの繰り返し設定や特例休業日、営業日の設定も可能。
            </div>
          </div>
        </Col>
        <Col lg={6}>
          <div className={homeStyles.benefit_box}>
            <div className='font-size-25'>
              <div className={homeStyles.wellness_benefit_headline}>
                月額サブスクリプション・回数券の導入
              </div>
            </div>
            <div className={homeStyles.benefit_text}>
              <br />予約のお支払いに月謝や回数券を導入することができます。
              <br /><br />パーソナルトレーニングやジム、ヨガレッスン、スポーツスクールの売り上げ安定化に効果的です。
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col lg={6} className='mb20'>
          <div className={homeStyles.benefit_box}>
            <div className='font-size-25'>
              <div className={homeStyles.wellness_benefit_headline}>
                アンケート・メッセージ機能による会員フォロー
              </div>
            </div>
            <div className={homeStyles.benefit_text}>
              <br />クラブ、スクールの会員にアンケートやメルマガ、LINEメッセージでアフターフォローできます。
              <br /><br /><br />
            </div>
          </div>
        </Col>
        <Col lg={6} className='mb20'>
          <div className={homeStyles.benefit_box}>
            <div className='font-size-25'>
              <div className={homeStyles.wellness_benefit_headline}>
                予約・ECシステムの一元化
              </div>
            </div>
            <div className={homeStyles.benefit_text}>
              <br />オンラインショップ開設サービス、予約システム、アンケートシステムと別々に契約されるケースが多いです。
              <br />当サービスはそれら全ての機能をオールインワンで提供しており顧客情報も一元管理できます。
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default WellnessLandingPageBenefit
