import type { NextPage } from 'next'
import React from 'react'
import RegularFooter from 'components/organisms/RegularFooter'
import LandingPageCover from 'components/organisms/LandingPageCover'
import homeStyles from 'styles/Home.module.css'
import { defaultJsonLdData, topPageBreadcrumbListJsonLdData } from 'constants/jsonLdData'
import LandingPageNavbar from 'components/organisms/LandingPageNavbar'
import LandingPageBenefit from 'components/organisms/LandingPageBenefit'
import LandingPageReservationFunction from 'components/organisms/LandingPageReservationFunction'
import LandingPageServiceOverview from 'components/organisms/LandingPageServiceOverview'
import LandingPageFunctionDescription from 'components/organisms/LandingPageFunctionDescription'
import LandingPagePlanPrice from 'components/organisms/LandingPagePlanPrice'
import LandingPageBusinessTypeSamples from 'components/organisms/LandingPageBusinessTypeSamples'
import LandingPageFunctionList from 'components/organisms/LandingPageFunctionList'
import { Container } from 'react-bootstrap'

const Home: NextPage = () => {
  return (
    <>
      <LandingPageNavbar />
      <LandingPageCover />
      <div className='mt10'>
        <Container>
          <div className='text-center'>
            <div className={homeStyles.top_copy}>
              ネットでサービス・商品を売るなら「SquareEight」
            </div>
            <LandingPageFunctionList />
            <hr />
            <LandingPageBenefit />
            <hr />
            <LandingPageReservationFunction />
            <hr />
            <LandingPageServiceOverview />
          </div>
        </Container>
      </div>

      <hr />
      <LandingPageFunctionDescription />
      <hr />

      <Container>
        <hr />
        <LandingPagePlanPrice />
        <hr />
        <LandingPageBusinessTypeSamples />
      </Container>
      <hr />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultJsonLdData) }}
        />
        <script
          key='structured-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(topPageBreadcrumbListJsonLdData) }}
        />
      </>
    </>

  )
}

export default Home
