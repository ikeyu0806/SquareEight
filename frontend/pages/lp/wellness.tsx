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
import WellnessLandingPageBenefit from 'components/organisms/WellnessLandingPageBenefit'
import WellnessLandingPageOverview from 'components/organisms/WellnessLandingPageOverview'

const Wellness: NextPage = () => {
  return (
    <>
      <LandingPageNavbar />
      <Container>
        <div className='mt20'></div>
        <WellnessLandingPageOverview />
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
      <WellnessLandingPageBenefit />
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
