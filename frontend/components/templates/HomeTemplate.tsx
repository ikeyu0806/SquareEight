import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

const HomeTemplate = (): JSX.Element => {
  return (
    <>
      <Navbar>
        <Nav className="mr-auto">
          <Nav.Link href="#home">機能</Nav.Link>
          <Nav.Link href="#features">料金</Nav.Link>
          <Nav.Link href="#pricing">お問い合わせ</Nav.Link>
          <Nav.Link href="#pricing">ログイン</Nav.Link>
          <Nav.Link href="#pricing">無料で試してみる</Nav.Link>
        </Nav>
      </Navbar >
    </>
  )
}  
export default HomeTemplate
