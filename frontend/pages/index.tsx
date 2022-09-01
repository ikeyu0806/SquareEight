import type { NextPage } from 'next'
import React from 'react'
import RegularFooter from 'components/organisms/RegularFooter'
import TextWithCheckIcon from 'components/molecules/TextWithCheckIcon'
import homeStyles from 'styles/Home.module.css'
import FreePlanCard from 'components/molecules/FreePlanCard'
import LightPlanCard from 'components/molecules/LightPlanCard'
import StandardPlanCard from 'components/molecules/StarndardPlanCard'
import PremiumPlanCard from 'components/molecules/PremiumPlanCard'
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
          <Navbar.Brand href='/' className='font-weight-bold'>SquareEight</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#about'>概要</Nav.Link>
              <Nav.Link href='#features'>機能</Nav.Link>
              <Nav.Link href='#pricing'>料金</Nav.Link>
              <Nav.Link href='#inquiry'>お問い合わせ</Nav.Link>
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
      <Container className='mt20 mb30' id='about'>
        <Row>
          <Col>
            <div className='text-center'>
              <div className={homeStyles.headline}>SquareEight</div>
              <div className={homeStyles.serviceDescription}>
                無料から使えるオンラインビジネス支援サービス
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
              <Col>
                <Card>
                  <Card.Img variant='top' src='/images/reserve_frame_modal.png' />
                  <Card.Body>
                    <div className={homeStyles.features_header_text}>オンライン予約受付</div>
                    <div className='mt20 text-start'>日ごと、週ごと、月ごとに受付日時を繰り返す予約メニューを登録できます。
                    設備・備品やスタッフの数による予約受付の制限や特例営業日の設定にも対応しています。</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Img variant='top' src='/images/create_product.png' />
                    <div className={homeStyles.features_header_text}>商品の物販販売</div>
                    <div className='mt20 text-start'>クレジットカード支払いに対応した物販商品を登録できます。</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Img variant='top' src='/images/create_ticket.png' />
                    <div className={homeStyles.features_header_text}>回数券作成</div>
                    <div className='mt20 text-start'>クレジットカード支払いに対応した回数券を登録できます。
                    購入した回数券の使用状況を管理画面から把握できます。</div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            &thinsp;
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Img variant='top' src='/images/create_monthly_payment_plan.png' />
                    <div className={homeStyles.features_header_text}>月額課金プランの作成</div>
                    <div className='mt20 text-start'>毎月自動でお客様から自動でお支払いを引き落とす月額課金プランを作成できます。習い事、レッスンの月謝引き落とし、オンラインサロンの運営、
                    有料メールマガジンの開設に対応できます。</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Img variant='top' src='/images/create_webpage.png' />
                    <div className={homeStyles.features_header_text}>Webページの作成</div>
                    <div className='mt20 text-start'>プログラミング知識不要でWebページを作成できます。</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Img variant='top' src='/images/questionnaire.png' />
                    <div className={homeStyles.features_header_text}>アンケートの作成</div>
                    <div className='mt20 text-start'>Webアンケートを作成できます。テキスト入力、プルダウン、チェックボックス、ラジオボタン、日時入力フォームに対応しています。</div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            &thinsp;
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Img variant='top' src='/images/customer_index.png' />
                    <div className={homeStyles.features_header_text}>顧客管理</div>
                    <div className='mt20 text-start'>予約を受け付けたお客様や商品を購入したお客様を自動で登録・管理できます。
                    お客様ごとにメモを登録できます。</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Img variant='top' src='/images/create_message_template.png' />
                    <div className={homeStyles.features_header_text}>メッセージテンプレートの作成</div>
                    <div className='mt20 text-start'>メッセージテンプレートを作ってお客様にメール送信ができます。</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Img variant='top' src='/images/sales_chart.png' />
                    <div className={homeStyles.features_header_text}>売上管理</div>
                    <div className='mt20 text-start'>オンライン決済の売り上げが記録されます。ダッシュボードでグラフ表示することができます。</div>
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
              <Col>
                <FreePlanCard></FreePlanCard>
              </Col>
              <Col>
                <LightPlanCard></LightPlanCard>
              </Col>
              <Col>
                <StandardPlanCard></StandardPlanCard>
              </Col>
              <Col>
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
