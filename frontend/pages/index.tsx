import type { NextPage } from 'next'
import React from 'react'
import FeaturesTemplates from '../components/templates/FeaturesTemplates'
import { Container,
         Navbar,
         Nav,
         Button,
         Row,
         Col } from 'react-bootstrap'

const Home: NextPage = () => {
  return (
    <Container>
      <Navbar collapseOnSelect expand='lg'>
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
      </Container>
      <div className='text-center mt50 mb50' id='features'>
        <h2>充実の機能であなたのビジネスをサポート</h2>
      </div>
      <FeaturesTemplates />

      <footer className='content text-center'>
        <hr />
        {/* <p className='footer-margin'>Copyright <a href='https://goodcycle.net/' target='_blank' rel='noreferrer'></a> {new Date().getFullYear()}</p> */}
      </footer>
    </Container>
  )
}

export default Home
