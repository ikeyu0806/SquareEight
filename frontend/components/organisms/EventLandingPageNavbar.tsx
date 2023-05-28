import React from 'react'
import BrandColorButton from 'components/atoms/BrandColorButton'
import navbarStyles from 'styles/Navbar.module.css'
import { Container,
  Navbar,
  Nav } from 'react-bootstrap'

const EventLandingPageNavbar = (): JSX.Element => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='light'>
    <Container>
      <Navbar.Brand href='/' className='font-weight-bold'>
        <img
          alt='square-eight-logo'
          className={navbarStyles.square_eight_logo_with_side_text}
          src='/logos/square-eight-logo-with-side-text.png' />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='#industry'>対応業種</Nav.Link>
          <Nav.Link href='#benefit'>導入効果</Nav.Link>
          <Nav.Link href='#features'>機能一覧</Nav.Link>
          <Nav.Link href='#pricing'>料金</Nav.Link>
          <Nav.Link href='/inquiry'>お問い合わせ</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href='/customer/login'>
            <BrandColorButton
              buttonText='SquareEightIDログイン'></BrandColorButton>
          </Nav.Link>
          <Nav.Link href='/merchant/login'>
            <BrandColorButton
              buttonText='ビジネスアカウントログイン'></BrandColorButton>
          </Nav.Link>
          <Nav.Link href='/merchant/signup'>

          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default EventLandingPageNavbar
