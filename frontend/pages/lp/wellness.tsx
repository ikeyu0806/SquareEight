import { NextPage } from 'next'
import React from 'react'
import RegularFooter from 'components/organisms/RegularFooter'
import LandingPageNavbar from 'components/organisms/LandingPageNavbar'
import { Container, Row, Col } from 'react-bootstrap'
import LandingPageFunctionDescription from 'components/organisms/LandingPageFunctionDescription'
import LandingPagePlanPrice from 'components/organisms/LandingPagePlanPrice'
import BrandColorButton from 'components/atoms/BrandColorButton'
import { defaultJsonLdData } from 'constants/jsonLdData'
import homeStyles from 'styles/Home.module.css'
import { lightPlanPrice, standardPlanPrice, premiumPlanPrice } from 'constants/systemPlanPrices'

const Wellness: NextPage = () => {
  return (
    <>
      <LandingPageNavbar />
      <Container>
        <div className='mt20'></div>
        <Row>
          <Col>
            <p>
              <span className={homeStyles.wellness_lp_linear_gradient_blue}>ウェルネスビジネスのサービス事業者様必見</span>
            </p>
            <div>
              <span className={homeStyles.description_brand_badge}>予約システム</span>
              <span className={homeStyles.description_brand_badge}>会員管理</span>
              <span className={homeStyles.description_brand_badge}>月謝</span>
              <span className={homeStyles.description_brand_badge}>回数券</span>
              <span className={homeStyles.description_brand_badge}>物販</span>
              <span className={homeStyles.description_brand_badge}>オンラインアンケート</span>
              <span className={homeStyles.description_brand_badge}>メール/LINE送信</span>
            </div>
            <div className='font-size-30 mt20 mb20'>
              パーソナルトレーニング・ヨガ・ジム・スポーツスクール・リラク・整体ビジネスを最適化。<br />格安予約システム「SquareEight」
            </div>
            <a href='/merchant/signup'><button
              className={homeStyles.description_trial_button}>
              無料でお試し。有料プランも{lightPlanPrice}円〜
            </button></a>
          </Col>
          <Col>
          <img
            className={homeStyles.fitness_image}
            src='/images/lp/fitness_image.webp'
            alt='Top Cover' />
          </Col>
        </Row>
      <hr />
      <div className='text-center font-size-30 font-weight-bold'>
        <p className={homeStyles.section_headline_parent}>
          <span className={homeStyles.section_headline}>対応業種</span>
        </p>
      </div>
      <Row>
        <Col>
          <div className='text-center font-size-25 font-weight-bold text-center mb10'>フィットネスクラブ</div>
          <div className='text-center font-size-20'>
            パーソナルトレーニング / ジム / ヨガスタジオ / ピラティス / フィットネスクラブ
          </div>
        </Col>
        <Col>
          <div className='text-center font-size-25 font-weight-bold text-center mb10'>スポーツスクール</div>
          <div className='text-center font-size-20'>
            テニススクール / スイミングスクール / ダンススクール / ゴルフスクール / 格闘技 / サッカースクール / 野球スクール / バスケットスクール / その他スポーツスクール
          </div>
        </Col>
        <Col>
        <div className='text-center font-size-25 font-weight-bold text-center mb10'>リラク</div>
          <div className='text-center font-size-20'>
            整体 / マッサージ / サウナ / 整骨院 / 温浴施設 / その他リラクゼーション施設
          </div>
        </Col>
      </Row>
      <hr />
      <div className='text-center font-size-30 font-weight-bold'>
        <p className={homeStyles.section_headline_parent}>
          <span className={homeStyles.section_headline}>導入効果</span>
        </p>
      </div>
      <Row>
        <Col lg={3}>
          <div className={homeStyles.border_circle}>
            運営コスト削減
          </div>
        </Col>
        <Col lg={9}>
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
      </Row>
      <br />
      <Row>
        <Col lg={3}></Col>
        <Col lg={9}>
          <div className={homeStyles.benefit_box}>
            <div className='font-size-25'>
              <div className={homeStyles.wellness_benefit_headline}>
                決済手数料の削減
              </div>
            </div>
            <div className={homeStyles.benefit_text}>
              <br />月額{premiumPlanPrice}円のプレミアムプランでは決済手数料4%でご利用可能。
              <br />
              <br />例えば売り上げが100万円の場合、決済手数料8%のシステムに比べて7万円以上のコストが削減できます。
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col lg={3}></Col>
        <Col lg={9}>
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
      </Row>
      <hr />
      <LandingPageFunctionDescription />
      <hr />
      <LandingPagePlanPrice />
      <hr />
      </Container>
      <RegularFooter></RegularFooter>
      <>
        <script
          key='structured-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultJsonLdData) }}
        />
      </>
    </>
  )
}

export default Wellness
