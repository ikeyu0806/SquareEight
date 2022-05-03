import React from 'react'
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'

const HomeTemplate = (): JSX.Element => {
  return (
    <Container>
<Navbar collapseOnSelect expand='lg'>
  <Container>
  <Navbar.Brand href='#home'>SmartLesson</Navbar.Brand>
  <Navbar.Toggle aria-controls='responsive-navbar-nav' />
  <Navbar.Collapse id='responsive-navbar-nav'>
    <Nav className='me-auto'>
      <Nav.Link href='#features'>概要</Nav.Link>
      <Nav.Link href='#features'>機能</Nav.Link>
      <Nav.Link href='#pricing'>料金</Nav.Link>
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
    </Container>
  )
}  
export default HomeTemplate
