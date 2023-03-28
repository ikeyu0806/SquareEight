import type { NextPage } from 'next'
import React from 'react'
import RegularFooter from 'components/organisms/RegularFooter'
import LandingPageCover from 'components/organisms/LandingPageCover'
import homeStyles from 'styles/Home.module.css'
import BrandColorButton from 'components/atoms/BrandColorButton'
import { brandGrayRgb, brandGreenRgb } from 'constants/brandColors'
import DownArrawIcon from 'components/atoms/DownArrawIcon'
import { useRouter } from 'next/router'
import { lightPlanPrice, standardPlanPrice, premiumPlanPrice } from 'constants/systemPlanPrices'
import { defaultJsonLdData, topPageBreadcrumbListJsonLdData } from 'constants/jsonLdData'
import LandingPageNavbar from 'components/organisms/LandingPageNavbar'
import LandingPageBenefit from 'components/organisms/LandingPageBenefit'
import LandingPageServiceOverview from 'components/organisms/LandingPageServiceOverview'
import LandingPageFunctionDescription from 'components/organisms/LandingPageFunctionDescription'
import LandingPagePlanPrice from 'components/organisms/LandingPagePlanPrice'
import { Container,
         Navbar,
         Nav,
         Alert,
         Card,
         Row,
         Col,
         Table } from 'react-bootstrap'

const Home: NextPage = () => {
  const router = useRouter()

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
        <div>
          <div className='text-center' id='usecase'>
          <p className={homeStyles.section_headline_parent}>
            <span className={homeStyles.section_headline}>こんな場面でお使いになれます!</span>
          </p>
          <div className='text-center mt10'>
            <p><span className={homeStyles.section_description}>全業種対応。特にウェルネスビジネスにおすすめ</span></p>
          </div>
          <Container>
            <Row>
              <Col lg={4} md={4}>
                <div className={homeStyles.business_type_content}>フィットネスジム運営</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.business_type_content}>パーソナルトレーニング</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.business_type_content}>スポーツスクール運営</div>
              </Col>
            </Row>
            <Row>
              <Col lg={4} md={4}>
                <div className={homeStyles.business_type_content}>説明会・イベントページ作成</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.business_type_content}>ヨガ、ピラティススタジオ運営</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.business_type_content}>美容室運営</div>
              </Col>
            </Row>
            <Row>
              <Col lg={4} md={4}>
                <div className={homeStyles.business_type_content}>ネイルサロン運営</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.business_type_content}>アクティビティ・レジャービジネス</div>
              </Col>
              <Col lg={4} md={4}>
                <div className={homeStyles.business_type_content}>オンラインサロン運営</div>
              </Col>
            </Row>
          </Container>
          </div>
        </div>
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
