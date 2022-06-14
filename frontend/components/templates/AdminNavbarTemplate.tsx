import React from 'react'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'

const AdminNavbarTemplate = (): JSX.Element => {
  return (
    <Navbar bg='dark'  variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='#home'>SmartLesson Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='/admin/dashboard'>ダッシュボード</Nav.Link>
          <NavDropdown title='ホームページ' id='homepage-nav-dropdown'>
            <NavDropdown.Item href='/admin/homepage'>一覧</NavDropdown.Item>
            <NavDropdown.Item href='/admin/homepage/new'>新規作成</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='予約' id='homepage-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>カレンダー</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.1'>一覧</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.1'>営業時間設定</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.1'>リソース登録</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='顧客' id='homepage-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>一覧</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.1'>新規登録</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='お支払い・決済' id='homepage-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>決済履歴</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.1'>月額課金プランマスタ一覧</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.1'>月額課金プラン作成</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.1'>回数券マスタ一覧</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.1'>回数券作成</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='アカウント設定' id='homepage-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>クレジットカード登録・変更</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.1'>プラン変更・退会</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='その他' id='homepage-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>お問い合わせ</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default AdminNavbarTemplate
