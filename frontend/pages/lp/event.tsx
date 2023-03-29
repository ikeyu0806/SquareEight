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
          <span className={homeStyles.section_headline}>活用例</span>
        </p>
      </div>
      <Row>
        <Col lg={6} md={6}>
          <div className='text-center font-size-25 font-weight-bold text-center mb10'>イベント</div>
          <div className='text-center font-size-20'>
            まちおこしイベント / 留学イベント / サークルイベント / 体験型ゲーム / ショーイベント
          </div>
        </Col>
        <Col lg={6} md={6}>
          <div className='text-center font-size-25 font-weight-bold text-center mb10'>セミナー・説明会</div>
          <div className='text-center font-size-20'>
          会社説明会 / 採用説明会 / 講習会 / 教育講座 / 勉強会 / 研修 / 見学会
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
