import React from 'react'
import { Nav, Navbar, NavDropdown, Container, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { alertChanged } from '../../redux/alertSlice'
import { RootState } from '../../redux/store'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const CustomerPageNavbar = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_gybuilder_merchant_session'])
  const router = useRouter()
  const alertState =  useSelector((state: RootState) => state.alert.alert)

  const logout = () => {
    axios.delete(`${process.env.BACKEND_URL}/api/internal/end_user/sessions`, {
      headers: { 
        'Session-Id': cookies._gybuilder_merchant_session
      }
    })
    dispatch(alertChanged({message: 'ログアウトしました', show: true}))
    router.push('/login')
  }

  return (
    <>
      <Navbar bg='dark'  variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>GYBuilder</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/customer_page/ticket'>回数券</Nav.Link>
              <Nav.Link href='/customer_page/monthly_payment_plan'>月額課金</Nav.Link>
              <Nav.Link href='/customer_page/reserve'>予約確認</Nav.Link>
              <Nav.Link href='/customer_page/book_mark'>ブックマーク</Nav.Link>
              <NavDropdown title='アカウント設定' id='homepage-nav-dropdown'>
                <NavDropdown.Item href='/customer_page/payment_method'>お支払いクレジットカード登録・変更</NavDropdown.Item>
                <NavDropdown.Item href=''>プラン変更・退会</NavDropdown.Item>
                <NavDropdown.Item href=''>お支払い履歴</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>ログアウト</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='その他' id='homepage-nav-dropdown'>
                <NavDropdown.Item href='/inquiry'>お問い合わせ</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {alertState.show && <Alert variant={alertState.type} onClose={() => dispatch(alertChanged({message: '', show: false}))} dismissible>
        {alertState.message}
      </Alert>}
    </>
  )
}

export default CustomerPageNavbar
