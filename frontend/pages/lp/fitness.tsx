import { NextPage } from 'next'
import React from 'react'
import RegularFooter from 'components/organisms/RegularFooter'
import LandingPageNavbar from 'components/organisms/LandingPageNavbar'
import { Container, Row, Col } from 'react-bootstrap'
import LandingPagePlanPrice from 'components/organisms/LandingPagePlanPrice'
import { defaultJsonLdData, topPageBreadcrumbListJsonLdData } from 'constants/jsonLdData'

const Fitness: NextPage = () => {
  return (
    <>
      <LandingPageNavbar />
      <Container>
        <Row>
          <Col>
            <div className='mt20 font-size-20'>ウェルネスビジネスのサービス事業者様必見</div>
            <div className='font-size-30 mt20'>パーソナルトレーニング・ヨガ・ジム・スポーツスクール・整体の格安予約システム</div>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
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

export default Fitness
