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
        <div className='text-center mt50 mb50' id='pricing'>
          <p className={homeStyles.section_headline_parent}>
            <span className={homeStyles.section_headline}>料金プラン</span>
          </p>
            <div className='mt30 mb30'>
            <p><span className='font-size-25'>基本プラン</span></p>
            <p><span className={homeStyles.section_description}>初期費用無料。登録後1週間無料でプレミアムプラントライアル。</span></p>
            </div>
            <div className={homeStyles.table_scroll}>
              <Table bordered className={homeStyles.plan_table_parent}>
                <thead style={{backgroundColor: '#5BA5BD'}}>
                  <tr className='text-white'>
                    <th></th>
                    <th className={homeStyles.plan_table_th}>フリープラン</th>
                    <th className={homeStyles.plan_table_th}>ライトプラン</th>
                    <th className={homeStyles.plan_table_th}>スタンダードプラン</th>
                    <th className={homeStyles.plan_table_th}>プレミアムプラン</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={homeStyles.plan_table_text}>月額料金</td>
                    <td className={homeStyles.price_text}>￥0</td>
                    <td className={homeStyles.price_text}>￥{lightPlanPrice}</td>
                    <td className={homeStyles.price_text}>￥{standardPlanPrice}</td>
                    <td className={homeStyles.price_text}>￥{premiumPlanPrice}</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>店舗登録数</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>オンライン予約受付</td>
                    <td>月間10件</td>
                    <td>月間500件</td>
                    <td>月間2000件</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>EC商品登録数</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>回数券登録数</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>月額サブスクリプション登録数</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>顧客表示数</td>
                    <td>10人</td>
                    <td>500人</td>
                    <td>1000人</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>ノーコードWebページ作成機能</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>オンラインアンケート作成</td>
                    <td>3件</td>
                    <td>無制限</td>
                    <td>無制限</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>オンラインアンケート回答閲覧可能数</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>スタッフや設備備品などのリソース登録</td>
                    <td>3件</td>
                    <td>10件</td>
                    <td>無制限</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>メール配信可能数</td>
                    <td>10件</td>
                    <td>100件</td>
                    <td>500件</td>
                    <td>無制限</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>メッセージテンプレート登録</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>LINEメッセージ送信</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                  </tr>   
                  <tr className={homeStyles.plan_table_text}>
                    <td>メール、LINEの予約配信</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                    <td>○</td>
                  </tr>                <tr className={homeStyles.plan_table_text}>
                    <td>複数管理ユーザ登録</td>
                    <td>×</td>
                    <td>×</td>
                    <td>○</td>
                    <td>○</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>管理ユーザへの権限設定</td>
                    <td>×</td>
                    <td>×</td>
                    <td>×</td>
                    <td>○</td>
                  </tr>
                  <tr className={homeStyles.plan_table_text}>
                    <td>決済手数料</td>
                    <td>8%</td>
                    <td>5%</td>
                    <td>5%</td>
                    <td>4%</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            &thinsp;
            <div>
              <hr />
              <Row>
                <div className='text-center mb20'>
                <p><span className={homeStyles.section_description}>エンタープライズプラン</span></p><br />
                  <span className={homeStyles.enterprise_description}>SquareEightの機能をベースにオーダーメイドでエンタープライズ向けシステムを開発します！</span><br />
                  <span className={homeStyles.enterprise_description}>ご相談・お問い合わせは<a href='/enterprise_inquiry'>こちら</a></span>
                </div>
                <Col lg={3} md={1} sm={3}></Col>
                <Col lg={6} md={10}>
                  <Card>
                    <Card.Header style={{backgroundColor: brandGreenRgb}} className='text-white'>
                      例えばこのようなご要望にお応えします!
                    </Card.Header>
                    <Card.Body>
                    <Col></Col>
                      <Col xs={11}>
                        <Card.Text style={{textAlign: 'left'}}>
                          {/* ul/liにするとNextのHydration failed error */}
                          <span className={homeStyles.enter_prise_card_content}>・自社のブランディングに合わせたホームページや予約ページのデザイン</span><br/>
                          <span className={homeStyles.enter_prise_card_content}>・映画館の座席予約ページのようなビジネスに合わせた独自の予約機能</span><br/>
                          <span className={homeStyles.enter_prise_card_content}>・個別の業務フローに合わせた予約機能や販売管理機能</span><br/>
                          <span className={homeStyles.enter_prise_card_content}>・専用サーバ上での運用</span><br/>
                          <span className={homeStyles.enter_prise_card_content}>・他サービスとの連携機能</span><br/>
                          <span className={homeStyles.enter_prise_card_content}>・社内システムとの連携</span>
                        </Card.Text>
                      </Col>
                      <Col></Col>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={3}></Col>
              </Row>
            </div>
        </div>

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
