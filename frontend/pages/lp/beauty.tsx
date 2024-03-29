import { NextPage } from 'next'
import React from 'react'
import RegularFooter from 'components/organisms/RegularFooter'
import BeautyLandingPageNavbar from 'components/organisms/BeautyLandingPageNavbar'
import { Container } from 'react-bootstrap'
import LandingPageFunctionDescription from 'components/organisms/LandingPageFunctionDescription'
import LandingPageReservationFunction from 'components/organisms/LandingPageReservationFunction'
import LandingPagePlanPrice from 'components/organisms/LandingPagePlanPrice'
import { beautyLpJsonLdData, beautyLpBreadcrumbListJsonLdData } from 'constants/jsonLdData'
import homeStyles from 'styles/Home.module.css'
import BeautyLandingPageBenefit from 'components/organisms/BeautyLandingPageBenefit'
import BeautyLandingPageOverview from 'components/organisms/BeautyLandingPageOverview'

const Beauty: NextPage = () => {
  return (
    <>
      <BeautyLandingPageNavbar />
      <Container>
        <div className='mt20'></div>
        <BeautyLandingPageOverview />
        <hr />
        <BeautyLandingPageBenefit />
        <hr />
        <LandingPageReservationFunction />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(beautyLpJsonLdData) }}
        />
        <script
          key='structured-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(beautyLpBreadcrumbListJsonLdData) }}
        />
      </>
    </>
  )
}

export default Beauty
