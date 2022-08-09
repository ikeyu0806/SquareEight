import React from 'react'
import { Nav, Navbar, NavDropdown, Container, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { alertChanged } from '../../redux/alertSlice'
import { RootState } from '../../redux/store'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import CartIcon from 'components/atoms/CartIcon'

const CustomerPageNavbar = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies, setCookie, removeCookies] = useCookies(['_gybuilder_end_user_session'])
  const router = useRouter()
  const alertState =  useSelector((state: RootState) => state.alert.alert)

  const logout = () => {
    axios.delete(`${process.env.BACKEND_URL}/api/internal/end_user/sessions`, {
      headers: { 
        'Session-Id': cookies._gybuilder_end_user_session
      }
    }).then(response => {
      removeCookies('_gybuilder_end_user_session')
      dispatch(alertChanged({message: 'ログアウトしました', show: true}))
      router.push('/customer/login')
    })
  }

  return (
    <>
      <Navbar variant='dark' expand='lg' className='bg-darkblue'>
        <Container>
          <Navbar.Brand href='#home'>GYBuilder</Navbar.Brand>
          <Navbar.Toggle />
            <Navbar.Collapse>
            <Nav className='me-auto'>
              <Nav.Link href='/customer_page/'>お知らせ</Nav.Link>
              <Nav.Link href='/customer_page/reserve'>予約</Nav.Link>
              <Nav.Link href='/customer_page/purchased_ticket'>回数券</Nav.Link>
              <Nav.Link href='/customer_page/subscriptions'>月額課金</Nav.Link>
              <NavDropdown title='カート' id='homepage-nav-dropdown'>

              </NavDropdown>
              <NavDropdown title='お支払い' id='homepage-nav-dropdown'>
                <NavDropdown.Item href='/customer_page/payment_method'>お支払いクレジットカード登録・変更</NavDropdown.Item>
                <NavDropdown.Item href='/customer_page/charges/'>お支払い履歴</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='その他' id='homepage-nav-dropdown'>
                <NavDropdown.Item href='/customer_page/mypage'>ご登録情報</NavDropdown.Item>
                <NavDropdown.Item href='/inquiry'>お問い合わせ</NavDropdown.Item>
                <NavDropdown.Item onClick={() => logout()}>ログアウト</NavDropdown.Item>
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
