import type { NextPage } from 'next'
import React from 'react'
import FeaturesTemplates from '../components/templates/FeaturesTemplates'
import CheckIcon from '../components/atoms/CheckIcon'
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
          <Navbar.Brand href='#home'>SmartLesson</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#about'>概要</Nav.Link>
              <Nav.Link href='#features'>機能</Nav.Link>
              <Nav.Link href='#pricing'>料金</Nav.Link>
              <Nav.Link href='#inquiry'>お問い合わせ</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href='/login'>
                <Button>ログイン</Button>
              </Nav.Link>
              <Nav.Link href='/signup'>
                <Button>無料でお試し</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='mt20' id='about'>
        <Row>
          <Col>
            <h2>習い事・教室・レッスン運営支援サービス</h2>
            <br />
            <h4>ホームページ作成、予約管理、決済、顧客とのコミュニケーションをサポートします</h4>
          </Col>
          <Col>
            <img src='/images/use_pc_woman.jpg' alt='use_pc_woman'></img>
          </Col>
        </Row>
        &thinsp;
      </Container>

      <div className='bg-lightgreen'>
      &thinsp;
        <div className='text-center' id='features'>
          <h2 className='mt50 mb50'>充実の機能であなたのビジネスをサポート</h2>
        </div>
        <FeaturesTemplates />
        &thinsp;
      </div>

      <Container>
        <div className='text-center mt50 mb50' id='features'>
          <h2>選べる料金プラン</h2>
            <div className='mt30 mb30'>
              <li>初期費用無料</li>
              <li>作成したホームページに独自ドメインを設定する場合は別途料金がかかります</li>
            </div>
            <Row>
            <Col>
              <Card>
                <Card.Header>フリー</Card.Header>
                <Card.Body>
                  <h4>月額 0円</h4>
                  <CheckIcon width={20} height={20} fill={'#39FA05'} /><span className='ml10'>月間予約件数50件</span>
                </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header>スタート</Card.Header>
                  <Card.Body>
                    <h4>月額 980円</h4>
                    <CheckIcon width={20} height={20} fill={'#39FA05'} /><span className='ml10'>フリープランの全機能</span><br />
                    <CheckIcon width={20} height={20} fill={'#39FA05'} /><span className='ml10'>月間予約件数500件</span><br />
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header>スタンダード</Card.Header>
                  <Card.Body>
                    <h4>2980円</h4>
                    <CheckIcon width={20} height={20} fill={'#39FA05'} /><span className='ml10'>スタンダードプランの全機能</span><br />
                    <CheckIcon width={20} height={20} fill={'#39FA05'} /><span className='ml10'>月間予約件数1000件</span><br />
                    <CheckIcon width={20} height={20} fill={'#39FA05'} /><span className='ml10'>広告非表示</span><br />
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header>プレミアム</Card.Header>
                  <Card.Body>
                    <h4>4980円~</h4>
                    <CheckIcon width={20} height={20} fill={'#39FA05'} /><span className='ml10'>月間予約件数が1000件を超えた場合 10件につき+100円</span><br />
                    <CheckIcon width={20} height={20} fill={'#39FA05'} /><span className='ml10'>お問い合わせ優先対応・電話対応</span><br />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            &thinsp;
        </div>
      </Container>
      <footer className='content text-center'>
        <hr />
        {/* <p className='footer-margin'>Copyright <a href='https://goodcycle.net/' target='_blank' rel='noreferrer'></a> {new Date().getFullYear()}</p> */}
      </footer>  
    </>

  )
}

export default Home
