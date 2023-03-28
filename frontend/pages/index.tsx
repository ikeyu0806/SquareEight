import type { NextPage } from 'next'
import React from 'react'
import RegularFooter from 'components/organisms/RegularFooter'
import LandingPageCover from 'components/organisms/LandingPageCover'
import homeStyles from 'styles/Home.module.css'
import { defaultJsonLdData, topPageBreadcrumbListJsonLdData } from 'constants/jsonLdData'
import LandingPageNavbar from 'components/organisms/LandingPageNavbar'
import LandingPageBenefit from 'components/organisms/LandingPageBenefit'
import LandingPageServiceOverview from 'components/organisms/LandingPageServiceOverview'
import LandingPageFunctionDescription from 'components/organisms/LandingPageFunctionDescription'
import LandingPagePlanPrice from 'components/organisms/LandingPagePlanPrice'
import LandingPageBusinessTypeSamples from 'components/organisms/LandingPageBusinessTypeSamples'
import { Container } from 'react-bootstrap'

const Home: NextPage = () => {
  return (
    <>
      <LandingPageNavbar />
      <LandingPageCover />
      <div className='mt10'>
        <Container>
          <div className='text-center'>
            <p className={homeStyles.section_headline_parent}>
              <span className={homeStyles.section_headline}>お店のシステム運用費用を最大90%削減</span>
            </p>
            <p>
              <span className={homeStyles.section_description}>
              無料から使えて有料プランも￥1480~¥6980
              </span>
            </p>
            <hr />
            <LandingPageBenefit />
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
