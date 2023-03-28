import { NextPage } from 'next'
import React from 'react'
import RegularFooter from 'components/organisms/RegularFooter'
import LandingPageNavbar from 'components/organisms/LandingPageNavbar'
import { Container, Row, Col } from 'react-bootstrap'
import LandingPageFunctionDescription from 'components/organisms/LandingPageFunctionDescription'
import LandingPagePlanPrice from 'components/organisms/LandingPagePlanPrice'
import LpSightUpLinkButton from 'components/atoms/LpSightUpLinkButton'
import { defaultJsonLdData, topPageBreadcrumbListJsonLdData } from 'constants/jsonLdData'
import homeStyles from 'styles/Home.module.css'

const Wellness: NextPage = () => {
  return (
    <>
      <LandingPageNavbar />
      <Container>
        <div className='mt20'></div>
        <Row>
          <Col>
            <div className='font-size-20'>ウェルネスビジネスのサービス事業者様必見</div>
            <div className='font-size-30 mt20'>
              パーソナルトレーニング・ヨガ・ジム・スポーツスクール・整体ビジネスを最適化する格安予約システム「SquareEight」
            </div>
          </Col>
          <Col>
          <img
            className={homeStyles.fitness_image}
            src='/images/lp/fitness_image.webp'
            alt='Top Cover' />
          </Col>
        </Row>
      </Container>
      <hr />
      <LandingPageFunctionDescription />
      <hr />
      <Container>
        <LandingPagePlanPrice />
      </Container>
      <hr />
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
