import React from 'react'
import { Nav, Navbar, NavDropdown, Container, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { alertChanged } from '../../redux/alertSlice'
import { RootState } from '../../redux/store'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import navbarStyles from 'styles/Navbar.module.css'

const CustomerPageNavbar = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies, setCookie, removeCookies] = useCookies(['_square_eight_end_user_session'])
  const router = useRouter()
  const alertState =  useSelector((state: RootState) => state.alert.alert)
  const todayReservationsCount = useSelector((state: RootState) => state.currentEndUser.todayReservationsCount)

  const logout = () => {
    axios.delete(`${process.env.BACKEND_URL}/api/internal/end_user/sessions`, {
      headers: { 
        'Session-Id': cookies._square_eight_end_user_session
      }
    }).then(response => {
      removeCookies('_square_eight_end_user_session')
      dispatch(alertChanged({message: 'ログアウトしました', show: true}))
      router.push('/customer/login')
    })
  }

  return (
    <>
      <Navbar expand='lg'>
        <Container>
          <Navbar.Brand href='/customer_page' className='font-weight-bold'>
          <img
            alt='square-eight-logo'
            className={navbarStyles.square_eight_logo_with_side_text}
            src='/logos/square-eight-logo-with-side-text.png' />
          </Navbar.Brand>
          <Navbar.Toggle />
            <Navbar.Collapse>
            <Nav className='me-auto'>
              <Nav.Link href='/customer_page/'>お知らせ</Nav.Link>
              <Nav.Link href='/customer_page/reservation'>
                {<>
                  <div>予約</div>
                  {todayReservationsCount > 0 &&
                   <div className='badge bg-info'>今日の予約{todayReservationsCount}件</div>}
                </>}
              </Nav.Link>
              <Nav.Link href='/customer_page/purchased_ticket'>回数券</Nav.Link>
              <Nav.Link href='/customer_page/subscriptions'>月額サブスクリプション</Nav.Link>
              <Nav.Link href='/cart'>カート</Nav.Link>
              <NavDropdown title='お支払い' id='webpage-nav-dropdown'>
                <NavDropdown.Item href='/customer_page/order/'>注文履歴</NavDropdown.Item>
                <NavDropdown.Item href='/customer_page/charges/'>お支払い履歴</NavDropdown.Item>
                <NavDropdown.Item href='/customer_page/payment_method'>お支払いクレジットカード登録・変更</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='その他' id='webpage-nav-dropdown'>
                <NavDropdown.Item href='/customer_page/mypage'>ご登録情報</NavDropdown.Item>
                <NavDropdown.Item href='/customer/inquiry'>お問い合わせ</NavDropdown.Item>
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
