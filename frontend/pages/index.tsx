import type { NextPage } from 'next'
import React from 'react'
import FeaturesTemplates from 'components/templates/FeaturesTemplates'
import RegularFooter from 'components/organisms/RegularFooter'
import TextWithCheckIcon from 'components/molecules/TextWithCheckIcon'
import homeStyles from 'styles/Home.module.css'
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
        </div>
        <FeaturesTemplates />
        &thinsp;
      </div>

      <Container>
        <div className='text-center mt50 mb50' id='pricing'>
          <h2>料金プラン</h2>
            <div className='mt30 mb30'>
              <h4>初期費用無料</h4>
              {/* <div>作成したホームページに独自ドメインを設定する場合は別途料金がかかります</div> */}
            </div>
            <Row>
              <Col>
                <Card>
                  <Card.Header>フリー</Card.Header>
                  <Card.Body>
                    <h4>月額 0円</h4>
                    <Row>
                      <Col></Col>
                      <Col xs={11}>
                        <Card.Text className="text-start">
                          <TextWithCheckIcon text='物販商品販売' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='オンライン予約受付 月間50件' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='予約受付の営業時間設定' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='予約の回数券支払い' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='クレジットカード月額課金プラン作成' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='予約の月額課金プラン支払い' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='Webページ3ページまで作成' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='アンケート3ページまで作成' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='顧客管理' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='登録顧客を50件まで表示' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='メールテンプレート5件まで作成' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='メール送信可能数 50件' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='売上管理' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='決済手数料7%' fill={'darkblue'}></TextWithCheckIcon><br/>
                        </Card.Text>
                      </Col>
                      <Col></Col>
                    </Row>
                  </Card.Body>
                  </Card>
                </Col>
              <Col>
                <Card>
                  <Card.Header>ライト</Card.Header>
                  <Card.Body>
                    <h4>月額 980円</h4>
                    <Row>
                      <Col></Col>
                      <Col xs={11}>
                        <Card.Text className="text-start">
                          <TextWithCheckIcon text='フリープランの全機能' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='月間予約件数500件' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='広告非表示' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='スタッフや設備備品などのリソースによる予約受付数制限' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='予約受付の特例営業日時設定' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='予約受付の特例休業日時設定' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='Webページ30ページまで作成' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='アンケート30ページまで作成' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='登録顧客数の表示制限解除' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='メール送信可能数 500件' fill={'darkblue'}></TextWithCheckIcon><br/>
                        </Card.Text>
                      </Col>
                      <Col></Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header>スタンダード</Card.Header>
                  <Card.Body>
                    <h4>1980円</h4>
                    <Row>
                      <Col></Col>
                      <Col xs={11}>
                        <Card.Text className="text-start">
                          <TextWithCheckIcon text='ライトプランの全機能' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='月間予約件数2000件' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='Webページ100ページまで作成' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='アンケート100ページまで作成' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='メール送信可能数 500件' fill={'darkblue'}></TextWithCheckIcon><br/>
                        </Card.Text>
                      </Col>
                      <Col></Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header>プレミアム</Card.Header>
                  <Card.Body>
                    <h4>4980円</h4>
                    <Row>
                      <Col></Col>
                      <Col xs={11}>
                        <Card.Text className="text-start">
                          <TextWithCheckIcon text='スタンダードプランの全機能' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='月間予約件数10000件' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='Webページ1000ページまで作成' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='アンケート1000ページまで作成' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='メール送信可能数 5000件' fill={'darkblue'}></TextWithCheckIcon><br/>
                          <TextWithCheckIcon text='決済手数料5%' fill={'darkblue'}></TextWithCheckIcon><br/>
                        </Card.Text>
                      </Col>
                      <Col></Col>
                    </Row>
                  </Card.Body>
                </Card>
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
