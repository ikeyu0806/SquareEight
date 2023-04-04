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
import { Container, Row, Col } from 'react-bootstrap'

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
            <div className={homeStyles.function_list}>
              <Row>
                <Col xs={2}></Col>
                <Col xs={8}>
                  <div>
                    高機能予約システム / オンラインショップ開設 / 店舗ミニページ / クレジットカード決済 / 顧客管理・会員管理 / 月謝・サブスクリプション支払い導入 / 回数券作成 / オンラインアンケート作成 / メールマガジン発行 / LINE公式アカウント連携
                  </div>
                </Col>
                <Col xs={2}></Col>
              </Row>
            </div>
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
