import { NextPage } from 'next'
import React from 'react'
import RegularFooter from 'components/organisms/RegularFooter'
import LandingPageNavbar from 'components/organisms/LandingPageNavbar'
import { Container, Row, Col } from 'react-bootstrap'
import LandingPageFunctionDescription from 'components/organisms/LandingPageFunctionDescription'
import LandingPagePlanPrice from 'components/organisms/LandingPagePlanPrice'
import BrandColorButton from 'components/atoms/BrandColorButton'
import { defaultJsonLdData } from 'constants/jsonLdData'
import homeStyles from 'styles/Home.module.css'

const Wellness: NextPage = () => {
  return (
    <>
      <LandingPageNavbar />
      <Container>
        <div className='mt20'></div>
        <Row>
          <Col>
            <p>
              <span className={homeStyles.wellness_lp_linear_gradient_blue}>ウェルネスビジネスのサービス事業者様必見</span>
            </p>
            <div className='font-size-30 mt20 mb20'>
              パーソナルトレーニング・ヨガ・ジム・スポーツスクール・リラク・整体ビジネスを最適化。<br />格安予約システム「SquareEight」
            </div>
            <BrandColorButton
              buttonText='無料でお試し'></BrandColorButton>
          </Col>
          <Col>
          <img
            className={homeStyles.fitness_image}
            src='/images/lp/fitness_image.webp'
            alt='Top Cover' />
          </Col>
        </Row>
      <hr />
      <div className='text-center font-size-30 font-weight-bold'>
        <p className={homeStyles.section_headline_parent}>
          <span className={homeStyles.section_headline}>対応業種</span>
        </p>
      </div>
      <Row>
        <Col>
          <div className='text-center font-size-25 font-weight-bold text-center mb10'>フィットネスクラブ</div>
          <div className='text-center font-size-20'>
            パーソナルトレーニング / ジム / ヨガスタジオ / ピラティス / フィットネスクラブ
          </div>
        </Col>
        <Col>
          <div className='text-center font-size-25 font-weight-bold text-center mb10'>スポーツスクール</div>
          <div className='text-center font-size-20'>
            テニススクール / スイミングスクール / ダンススクール / ゴルフスクール / 格闘技 / サッカースクール / 野球スクール / バスケットスクール / その他スポーツスクール
          </div>
        </Col>
        <Col>
        <div className='text-center font-size-25 font-weight-bold text-center mb10'>リラク</div>
          <div className='text-center font-size-20'>
            整体 / マッサージ / サウナ / 整骨院 / 温浴施設 / その他リラクゼーション施設
          </div>
        </Col>
      </Row>
      <hr />
      <LandingPageFunctionDescription />
      <hr />
      <LandingPagePlanPrice />
      <hr />
      </Container>
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
