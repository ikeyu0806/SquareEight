import type { NextPage } from 'next'
import React from 'react'
import RegularFooter from 'components/organisms/RegularFooter'
import homeStyles from 'styles/Home.module.css'
import FreePlanCard from 'components/molecules/FreePlanCard'
import LightPlanCard from 'components/molecules/LightPlanCard'
import StandardPlanCard from 'components/molecules/StarndardPlanCard'
import PremiumPlanCard from 'components/molecules/PremiumPlanCard'
import CampaignAlert from 'components/atoms/CampaignAlert'
import TextWithCheckIcon from 'components/molecules/TextWithCheckIcon'
// import SquareEightLogo from 'components/atoms/SquareEightLogo'
import { brandGrayRgb, brandRedRgb, brandGreenRgb } from 'constants/brandColors'
import { Container,
         Navbar,
         Nav,
         Button,
         Card,
         Row,
         Col,
         Table } from 'react-bootstrap'

const Home: NextPage = () => {
  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='light'>
        <Container>
          <Navbar.Brand href='/' className='font-weight-bold'>
            {/* <SquareEightLogo width={96} height={35} />
             */}
            SquareEight
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#about'>概要</Nav.Link>
              <Nav.Link href='#features'>機能</Nav.Link>
              <Nav.Link href='#pricing'>料金</Nav.Link>
              <Nav.Link href='/inquiry'>お問い合わせ</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href='/customer/login'>
                <Button
                  style={{backgroundColor: brandGrayRgb, borderColor: brandGrayRgb}}>SquareEightIDログイン</Button>
              </Nav.Link>
              <Nav.Link href='/merchant/login'>
                <Button
                  style={{backgroundColor: brandGrayRgb, borderColor: brandGrayRgb}}>ビジネスアカウントログイン</Button>
              </Nav.Link>
              <Nav.Link href='/merchant/signup'>
                <Button
                  style={{backgroundColor: brandRedRgb, borderColor: brandRedRgb}}>
                  無料でお試し
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <CampaignAlert></CampaignAlert> */}
      <div className={homeStyles.cover_img_parent}>
        <img
          className={homeStyles.cover_img}
          src='/images/top_cover.png'
          alt='Top Cover' />
        <p className={homeStyles.headline}>SquareEight</p>
        <p className={homeStyles.serviceDescription}>
          無料から使えるオンラインビジネス運営サービス
        </p>
      </div>
      <Container className='mt20 mb30' id='about'>
        <Row>
          <Col>
          </Col>
        </Row>
        &thinsp;
      </Container>

      <div>
      &thinsp;
        <div className='text-center' id='features'>
        <p><span className={homeStyles.section_headline}>機能一覧</span></p>
          <Container>
            <Row>
              <Col lg={4}>
                <div className={homeStyles.function_content}>店舗ホームページ作成</div>
              </Col>
              <Col lg={4}>
                <div className={homeStyles.function_content}>予約メニュー作成</div>
              </Col>
              <Col lg={4}>
                <div className={homeStyles.function_content}>EC機能</div>
              </Col>
            </Row>
            &thinsp;
            <Row>
              <Col lg={4}>
                <div className={homeStyles.function_content}>回数券</div>
              </Col>
              <Col lg={4}>
                <div className={homeStyles.function_content}>月額サブスクリプション</div>
              </Col>
              <Col lg={4}>
                <div className={homeStyles.function_content}>ノーコードでWebページ作成</div>
              </Col>
            </Row>
            &thinsp;
            <Row>
              <Col lg={4}>
                <div className={homeStyles.function_content}>オンラインアンケート</div>
              </Col>
              <Col lg={4}>
                <div className={homeStyles.function_content}>顧客管理</div>
              </Col>
              <Col lg={4}>
                <div className={homeStyles.function_content}>メルマガ配信</div>
              </Col>
            </Row>
            &thinsp;
            <Row>
              <Col lg={4}>
                <div className={homeStyles.function_content}>複数管理ユーザ登録</div>
              </Col>
              <Col lg={4}>
                <div className={homeStyles.function_content}>ユーザの権限設定</div>
              </Col>
              <Col lg={4}>
                <div className={homeStyles.function_content}>LINE公式アカウント連携</div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <hr />

      <Container>
        <div className='text-center mt50 mb50' id='pricing'>
          <p><span className={homeStyles.section_headline}>料金プラン</span></p>
            <div className='mt30 mb30'>
            <p><span className={homeStyles.section_description}>基本プラン</span></p>
            <p><span className={homeStyles.section_description}>初期費用無料</span></p>
            </div>

            <Table bordered className={homeStyles.plan_table_parent}>
              <thead style={{backgroundColor: '#5BA5BD'}}>
                <tr className='text-white'>
                  <th></th>
                  <th>フリープラン</th>
                  <th>ライトプラン</th>
                  <th>スタンダードプラン</th>
                  <th>プレミアムプラン</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={homeStyles.plan_table_text}>月額料金</td>
                  <td className={homeStyles.price_text}>￥0</td>
                  <td className={homeStyles.price_text}>￥1,480</td>
                  <td className={homeStyles.price_text}>￥2,980</td>
                  <td className={homeStyles.price_text}>￥6,980</td>
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
                  <td>10件</td>
                  <td>500件</td>
                  <td>2000件</td>
                  <td>無制限</td>
                </tr>
                <tr className={homeStyles.plan_table_text}>
                  <td>オンラインアンケート作成</td>
                  <td>10件</td>
                  <td>無制限</td>
                  <td>無制限</td>
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
                  <td>1000件</td>
                  <td>3000件</td>
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
            &thinsp;
            <div>
              <hr />
              <Row>
                <div className='text-center mb20'>
                <p><span className={homeStyles.section_description}>エンタープライズプラン</span></p>
                  <span className={homeStyles.enterprise_description}>SquareEightの機能をベースにオーダーメイドでエンタープライズ向けシステムを開発します！</span>
                  <span>初期費用・月額料金は無料でお見積もりします！</span>
                  <span className={homeStyles.enterprise_description}>ご相談・お問い合わせは<a href='/enterprise_inquiry'>こちら</a></span>
                </div>
                <Col sm={3}></Col>
                <Col>
                  <Card>
                    <Card.Header style={{backgroundColor: brandGreenRgb}} className='text-white'>
                      例えばこのようなご要望にお応えします!
                    </Card.Header>
                    <Card.Body>
                    <Col></Col>
                      <Col xs={11}>
                        <Card.Text>
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
      </Container>
      <RegularFooter></RegularFooter>
    </>

  )
}

export default Home
