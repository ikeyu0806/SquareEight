import { NextPage } from 'next'
import React from 'react'
import RegularFooter from 'components/organisms/RegularFooter'
import EventLandingPageNavbar from 'components/organisms/EventLandingPageNavbar'
import { Container, Row, Col } from 'react-bootstrap'
import LandingPageFunctionDescription from 'components/organisms/LandingPageFunctionDescription'
import LandingPagePlanPrice from 'components/organisms/LandingPagePlanPrice'
import { wellnessLpJsonLdData, wellnessLpBreadcrumbListJsonLdData } from 'constants/jsonLdData'
import homeStyles from 'styles/Home.module.css'
import WellnessLandingPageBenefit from 'components/organisms/WellnessLandingPageBenefit'
import EventLandingPageOverview from 'components/organisms/EventLandingPageOverview'

const Event: NextPage = () => {
  return (
    <>
      <EventLandingPageNavbar />
      <Container>
        <div className='mt20'></div>
        <EventLandingPageOverview />
      <hr />
      <div className='text-center font-size-30 font-weight-bold' id='industry'>
        <p className={homeStyles.section_headline_parent}>
          <span className={homeStyles.section_headline}>対応業種</span>
        </p>
      </div>
      <Row>
        <Col lg={4} md={4}>
          <div className='text-center font-size-25 font-weight-bold text-center mb10'>フィットネスクラブ</div>
          <div className='text-center font-size-20'>
            パーソナルトレーニング / ジム / ヨガスタジオ / ピラティス / フィットネスクラブ
          </div>
        </Col>
        <Col lg={4} md={4}>
          <div className='text-center font-size-25 font-weight-bold text-center mb10'>スポーツスクール</div>
          <div className='text-center font-size-20'>
            テニススクール / スイミングスクール / ダンススクール / ゴルフスクール / 格闘技 / その他スポーツスクール
          </div>
        </Col>
        <Col lg={4} md={4}>
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
      <div className={homeStyles.position_under_fixed}>
        <a href='/merchant/signup'>
          <button className={homeStyles.position_under_fixed_trial_button}>無料でお試し</button>
        </a>
      </div>
      <>
        <script
          key='structured-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(wellnessLpJsonLdData) }}
        />
        <script
          key='structured-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(wellnessLpBreadcrumbListJsonLdData) }}
        />
      </>
    </>
  )
}

export default Event
