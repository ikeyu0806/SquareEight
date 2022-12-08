import type { NextPage } from 'next'
import React from 'react'
import RegularFooter from 'components/organisms/RegularFooter'
import homeStyles from 'styles/Home.module.css'
import FreePlanCard from 'components/molecules/FreePlanCard'
import LightPlanCard from 'components/molecules/LightPlanCard'
import StandardPlanCard from 'components/molecules/StarndardPlanCard'
import PremiumPlanCard from 'components/molecules/PremiumPlanCard'
import CampaignAlert from 'components/atoms/CampaignAlert'
import SquareEightLogo from 'components/atoms/SquareEightLogo'
import { Container,
         Navbar,
         Nav,
         Button,
         Card,
         Row,
         Col } from 'react-bootstrap'

const Home: NextPage = () => {
  return (
    <>
      
      <Navbar collapseOnSelect expand='lg' bg='light'>
        <Container>
          <Navbar.Brand href='/' className='font-weight-bold'><SquareEightLogo width={150} height={55} /></Navbar.Brand>
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
                <span className='link-text'>カスタマーアカウントログイン</span>
              </Nav.Link>
              <Nav.Link href='/merchant/login'>
                <span className='link-text'>ビジネスアカウントログイン</span>
              </Nav.Link>
              <Nav.Link href='/merchant/signup'>
                <Button>無料でお試し</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CampaignAlert></CampaignAlert>
      <Container className='mt20 mb30' id='about'>
        <Row>
          <Col>
            <div className='text-center'>
              <div className={homeStyles.headline}>SquareEight</div>
              <div className={homeStyles.serviceDescription}>
                無料から使えるオンラインビジネス運営サービス
              </div>
            </div>
          </Col>
        </Row>
        &thinsp;
      </Container>

      <div className='bg-silver'>
      &thinsp;
        <div className='text-center' id='features'>
          <h2 className='mt50 mb50'>機能一覧</h2>
          <Container>
            <Row>
              <Col lg={4} sm={12}>
                <Card className={homeStyles.featureCard}>
                  <Card.Img variant='top' src='/images/reserve_icatch.png' />
                  <Card.Body>
                    <div className={homeStyles.features_header_text}>オンライン予約ページ作成</div>
                    <div className={homeStyles.features_description_text}>日ごと、週ごと、月ごとに受付日時を繰り返す予約メニューを登録できます。
                    設備・備品やスタッフの数による予約受付の制限や特例営業日の設定にも対応しています。</div>
                    <a className='btn btn-primary mt20' href='https://square-eight-method.net/2022/11/18/squareeight%e3%81%a7%e3%81%ae%e3%82%aa%e3%83%b3%e3%83%a9%e3%82%a4%e3%83%b3%e4%ba%88%e7%b4%84%e3%83%9a%e3%83%bc%e3%82%b8%e3%81%ae%e4%bd%9c%e3%82%8a%e6%96%b9/'>
                      もっと見る
                    </a>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} sm={12}>
                <Card className={homeStyles.featureCard}>
                  <Card.Img variant='top' src='/images/product_icatch.png' />
                  <Card.Body>
                    <div className={homeStyles.features_header_text}>商品の物販販売ページ作成</div>
                    <div className={homeStyles.features_description_text}>クレジットカード支払いに対応した物販商品を登録できます。</div>
                    <a className='btn btn-primary mt20' href='https://square-eight-method.net/2022/11/20/squareeight%e3%81%a7%e3%81%ae%e7%89%a9%e8%b2%a9%e3%83%9a%e3%83%bc%e3%82%b8%e3%81%ae%e4%bd%9c%e3%82%8a%e6%96%b9/'>
                      もっと見る
                    </a>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} sm={12}>
                <Card className={homeStyles.featureCard}>
                  <Card.Img variant='top' src='/images/ticket_icatch.png' />
                  <Card.Body>
                    <div className={homeStyles.features_header_text}>回数券作成</div>
                    <div className={homeStyles.features_description_text}>クレジットカード支払いに対応した回数券を登録できます。
                    購入した回数券の使用状況を管理画面から把握できます。</div>
                    <a className='btn btn-primary mt20' href='https://square-eight-method.net/2022/11/20/squareeight%e3%81%a7%e3%81%ae%e5%9b%9e%e6%95%b0%e5%88%b8%e3%81%ae%e4%bd%9c%e3%82%8a%e6%96%b9/'>
                      もっと見る
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            &thinsp;
            <Row>
              <Col lg={4} sm={12}>
                <Card className={homeStyles.featureCard}>
                  <Card.Img variant='top' src='/images/mothly_payment_plan_icatch.png' />
                  <Card.Body>
                    <div className={homeStyles.features_header_text}>月額課金プランの作成</div>
                    <div className={homeStyles.features_description_text}>毎月自動でお客様から自動でお支払いを引き落とす月額課金プランを作成できます。</div>
                    <a className='btn btn-primary mt20' href='https://square-eight-method.net/2022/11/20/squareeight%e3%81%a7%e3%81%ae%e6%9c%88%e9%a1%8d%e8%aa%b2%e9%87%91%e3%83%97%e3%83%a9%e3%83%b3%e3%81%ae%e4%bd%9c%e3%82%8a%e6%96%b9/'>
                      もっと見る
                    </a>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} sm={12}>
                <Card className={homeStyles.featureCard}>
                  <Card.Img variant='top' src='/images/webpage_icatch.png' />
                  <Card.Body>
                    <div className={homeStyles.features_header_text}>Webページの作成</div>
                    <div className={homeStyles.features_description_text}>プログラミング知識不要でWebページを作成できます。</div>
                    <a className='btn btn-primary mt20' href='https://square-eight-method.net/2022/11/20/squareeight%e3%82%92%e4%bd%bf%e3%81%88%e3%81%b0%e8%aa%b0%e3%81%a7%e3%82%82%e7%b0%a1%e5%8d%98%e3%81%abweb%e3%83%9a%e3%83%bc%e3%82%b8%e3%82%92%e4%bd%9c%e6%88%90%e3%81%a7%e3%81%8d%e3%81%be%e3%81%99/'>
                      もっと見る
                    </a>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} sm={12}>
                <Card className={homeStyles.featureCard}>
                <Card.Img variant='top' src='/images/questionnaire_master_icatch.png' />
                  <Card.Body>
                    <div className={homeStyles.features_header_text}>オンラインアンケートの作成</div>
                    <div className={homeStyles.features_description_text}>Webアンケートを作成できます。テキスト入力、プルダウン、チェックボックス、ラジオボタン、日時入力フォームに対応しています。</div>
                    <a className='btn btn-primary mt20' href='https://square-eight-method.net/2022/11/19/squareeight%e3%81%a7%e3%81%ae%e3%82%aa%e3%83%b3%e3%83%a9%e3%82%a4%e3%83%b3%e3%82%a2%e3%83%b3%e3%82%b1%e3%83%bc%e3%83%88%e3%81%ae%e4%bd%9c%e3%82%8a%e6%96%b9/'>
                      もっと見る
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            &thinsp;
            <Row>
              <Col lg={4} sm={12}>
                <Card className={homeStyles.featureCard}>
                  <Card.Img variant='top' src='/images/customer_icatch.png' />
                  <Card.Body>
                    <div className={homeStyles.features_header_text}>顧客管理</div>
                    <div className={homeStyles.features_description_text}>予約を受け付けたお客様や商品を購入したお客様を自動で登録・管理できます。
                    お客様ごとにメモを登録できます。</div>
                    <a className='btn btn-primary mt20' href='https://square-eight-method.net/2022/11/20/squareeight%e3%81%a7%e3%81%ae%e5%9b%9e%e6%95%b0%e5%88%b8%e3%81%ae%e4%bd%9c%e3%82%8a%e6%96%b9/'>
                      もっと見る
                    </a>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} sm={12}>
                <Card className={homeStyles.featureCard}>
                  <Card.Img variant='top' src='/images/message_template_icatch.png' />
                  <Card.Body>
                    <div className={homeStyles.features_header_text}>メッセージテンプレート</div>
                    <div className={homeStyles.features_description_text}>メッセージテンプレートを作ってお客様にメール送信ができます。</div>
                    <a className='btn btn-primary mt20' href='https://square-eight-method.net/2022/11/21/squareeight%e3%81%ae%e3%83%a1%e3%83%83%e3%82%bb%e3%83%bc%e3%82%b8%e3%83%86%e3%83%b3%e3%83%97%e3%83%ac%e3%83%bc%e3%83%88%e6%a9%9f%e8%83%bd%e3%81%ae%e3%81%94%e7%b4%b9%e4%bb%8b/'>
                      もっと見る
                    </a>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} sm={12}>
                <Card className={homeStyles.featureCard}>
                  <Card.Img variant='top' src='/images/sales_icatch.png' />
                  <Card.Body>
                    <div className={homeStyles.features_header_text}>売上管理</div>
                    <div className={homeStyles.features_description_text}>オンライン決済の売り上げが記録されます。ダッシュボードでグラフ表示することができます。</div>
                    <a className='btn btn-primary mt20' href='https://square-eight-method.net/2022/11/21/squareeight%e3%81%a7%e3%81%ae%e3%82%aa%e3%83%b3%e3%83%a9%e3%82%a4%e3%83%b3%e5%a3%b2%e3%82%8a%e4%b8%8a%e3%81%92%e7%ae%a1%e7%90%86%e3%81%ae%e3%81%94%e7%b4%b9%e4%bb%8b/'>
                      もっと見る
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            &thinsp;
            <Row>
              <Col lg={4} sm={12}>
                <Card className={homeStyles.featureCard}>
                  <Card.Img variant='top' src='/images/multi_user_icatch.png' />
                  <Card.Body>
                    <div className={homeStyles.features_header_text}>複数管理ユーザ登録</div>
                    <div className={homeStyles.features_description_text}>管理画面のユーザを複数登録できます。
                    お客様ごとにメモを登録できます。</div>
                    <a className='btn btn-primary mt20' href='https://square-eight-method.net/2022/12/07/%e3%80%90squareeight%e3%80%91%e8%a4%87%e6%95%b0%e7%ae%a1%e7%90%86%e3%83%a6%e3%83%bc%e3%82%b6%e7%99%bb%e9%8c%b2%e6%a9%9f%e8%83%bd%e3%81%ae%e3%81%94%e7%b4%b9%e4%bb%8b/'>
                      もっと見る
                    </a>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} sm={12}>
                <Card className={homeStyles.featureCard}>
                  <Card.Img variant='top' src='/images/user_permission_icatch.png' />
                  <Card.Body>
                    <div className={homeStyles.features_header_text}>管理ユーザの権限設定</div>
                    <div className={homeStyles.features_description_text}>ユーザごとに管理画面の操作権限を設定できます。</div>
                    <a className='btn btn-primary mt20' href='https://square-eight-method.net/2022/12/07/%e3%80%90squareeight%e3%80%91%e3%83%a6%e3%83%bc%e3%82%b6%e6%a8%a9%e9%99%90%e8%a8%ad%e5%ae%9a%e6%a9%9f%e8%83%bd%e3%81%ae%e3%81%94%e7%b4%b9%e4%bb%8b/'>
                      もっと見る
                    </a>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} sm={12}>
                <Card className={homeStyles.featureCard}>
                  <Card.Img variant='top' src='/images/payment_request_icatch.png' />
                  <Card.Body>
                    <div className={homeStyles.features_header_text}>決済リクエスト機能</div>
                    <div className={homeStyles.features_description_text}>クレジットカード決済のリクエストページを作成できます。</div>
                    <a className='btn btn-primary mt20' href='https://square-eight-method.net/2022/12/07/%e3%80%90squareeight%e3%80%91%e6%b1%ba%e6%b8%88%e3%83%aa%e3%82%af%e3%82%a8%e3%82%b9%e3%83%88%e6%a9%9f%e8%83%bd%e3%81%ae%e3%81%94%e7%b4%b9%e4%bb%8b/'>
                      もっと見る
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            &thinsp;
          </Container>
        </div>
      </div>

      <Container>
        <div className='text-center mt50 mb50' id='pricing'>
          <h2>料金プラン</h2>
            <div className='mt30 mb30'>
              <h4>初期費用無料</h4>
            </div>
            <Row>
              <Col lg={3} sm={12}>
                <FreePlanCard></FreePlanCard>
              </Col>
              <Col lg={3} sm={12}>
                <LightPlanCard></LightPlanCard>
              </Col>
              <Col lg={3} sm={12}>
                <StandardPlanCard></StandardPlanCard>
              </Col>
              <Col lg={3} sm={12}>
                <PremiumPlanCard></PremiumPlanCard>
              </Col>
            </Row>
            &thinsp;
        </div>
      </Container>
      <RegularFooter></RegularFooter>
    </>

  )
}

export default Home
