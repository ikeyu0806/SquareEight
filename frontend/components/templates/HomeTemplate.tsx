import React from 'react'
import { Container, Navbar, Nav, NavDropdown, Button, Row, Col } from 'react-bootstrap'

const HomeTemplate = (): JSX.Element => {
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
              <Nav.Link href='#pricing'>お知らせ</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href='#deets'>
                <Button>ログイン</Button>
              </Nav.Link>
              <Nav.Link href='#memes'>
                <Button>無料でお試し</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='mt20' id='about'>
        <Row>
          <Col>
            <h2>習い事・教室・レッスン運営</h2>
            <br />
            <h2>開業支援と業務効率化</h2>
          </Col>
          <Col>
            <img src='/images/use_pc_woman.jpg' alt='use_pc_woman'></img>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}  
export default HomeTemplate
