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
              無料でお試し。有料プランも1480円〜
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
        <Col lg={6} className='mb20'>
          <div className={homeStyles.benefit_box}>
            <div className='font-size-25'>
              <div className={homeStyles.wellness_benefit_headline}>
                格安で予約ページ作成
              </div>
            </div>
            <div className={homeStyles.benefit_text}>
              <br />他社フィットネス向け予約サービスではスタンダードプランで月額料金数万以上と高額な運用費用がかかります。
              <br /><br />当サービスはスタンダードプラン月額2980円でご利用可能！
            </div>
          </div>
        </Col>
        <Col lg={6} className='mb20'>
          <div className={homeStyles.benefit_box}>
            <div className='font-size-25'>
              <div className={homeStyles.wellness_benefit_headline}>
              支払いの月額サブスクリプション・回数券対応
              </div>
            </div>
            <div className={homeStyles.benefit_text}>
              <br />お支払いにクレジットカード決済の他、月額サブスクリプション・回数券を導入でき売り上げを安定させることができます。
              <br /><br />新規ユーザの獲得にも効果的です。
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
