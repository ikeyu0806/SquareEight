import { NextPage } from 'next'
import React from 'react'
import RegularFooter from 'components/organisms/RegularFooter'
import WellnessLandingPageNavbar from 'components/organisms/WellnessLandingPageNavbar'
import { Container, Row, Col } from 'react-bootstrap'
import LandingPageFunctionDescription from 'components/organisms/LandingPageFunctionDescription'
import LandingPagePlanPrice from 'components/organisms/LandingPagePlanPrice'
import { wellnessLpJsonLdData, wellnessLpBreadcrumbListJsonLdData } from 'constants/jsonLdData'
import homeStyles from 'styles/Home.module.css'
import WellnessLandingPageBenefit from 'components/organisms/WellnessLandingPageBenefit'
import WellnessLandingPageOverview from 'components/organisms/WellnessLandingPageOverview'

const Beauty: NextPage = () => {
  return (
    <>
      <WellnessLandingPageNavbar />
      <Container>
        <div className='mt20'></div>
        <WellnessLandingPageOverview />
      <hr />
      <div className='text-center font-size-30 font-weight-bold' id='industry'>
        <p className={homeStyles.section_headline_parent}>
          <span className={homeStyles.section_headline}>対応業種</span>
        </p>
      </div>
      <Row>
        <Col lg={4} md={4}>
          <div className='text-center font-size-25 font-weight-bold text-center mb10'>美容室</div>
          <div className='text-center font-size-20'>
            美容室 / 美容院 / ヘアサロン
          </div>
        </Col>
        <Col lg={4} md={4}>
          <div className='text-center font-size-25 font-weight-bold text-center mb10'>リラクサロン運営</div>
          <div className='text-center font-size-20'>
            リラクゼーションサロン / エステサロン / ホテルスパ
          </div>
        </Col>
        <Col lg={4} md={4}>
        <div className='text-center font-size-25 font-weight-bold text-center mb10'>美容クリニック</div>
          <div className='text-center font-size-20'>
            美容医療 / 美容クリニック
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

export default Beauty
