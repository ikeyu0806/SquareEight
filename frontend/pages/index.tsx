import type { NextPage } from 'next'
import React from 'react'
import FeaturesTemplates from 'components/templates/FeaturesTemplates'
import RegularFooter from 'components/organisms/RegularFooter'
import CheckIcon from 'components/atoms/CheckIcon'
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
        <div className='text-center mt50 mb50' id='features'>
          <h2>料金プラン</h2>
            <div className='mt30 mb30'>
              <div>初期費用無料</div>
              {/* <div>作成したホームページに独自ドメインを設定する場合は別途料金がかかります</div> */}
            </div>
            <Row>
              <Col>
                <Card>
                  <Card.Header>フリー</Card.Header>
                  <Card.Body>
                    <h4>月額 0円</h4>
                    <CheckIcon width={20} height={20} fill={'darkblue'} /><span className='ml10'>月間予約件数50件</span>
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
                          <CheckIcon width={20} height={20} fill={'darkblue'} /><span className='ml10'>フリープランの全機能</span><br />
                          <CheckIcon width={20} height={20} fill={'darkblue'} /><span className='ml10'>月間予約件数500件</span><br />
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
                    <h4>2980円</h4>
                    <Row>
                      <Col></Col>
                      <Col xs={11}>
                        <Card.Text className="text-start">
                          <CheckIcon width={20} height={20} fill={'darkblue'} /><span className='ml10'>スタートプランの全機能</span><br />
                          <CheckIcon width={20} height={20} fill={'darkblue'} /><span className='ml10'>月間予約件数1000件</span><br />
                          <CheckIcon width={20} height={20} fill={'darkblue'} /><span className='ml10'>広告非表示</span><br />
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
                          <CheckIcon width={20} height={20} fill={'darkblue'} /><span className='ml10'>スタンダードプランの全機能</span><br />
                          <CheckIcon width={20} height={20} fill={'darkblue'} /><span className='ml10'>月間予約件数1000件</span><br />
                          <CheckIcon width={20} height={20} fill={'darkblue'} /><span className='ml10'>広告非表示</span><br />
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
