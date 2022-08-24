import React from 'react'
import { Nav, Navbar, NavDropdown, Container, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { alertChanged } from '../../redux/alertSlice'
import { RootState } from '../../redux/store'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const AdminNavbarTemplate = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const router = useRouter()
  const alertState =  useSelector((state: RootState) => state.alert.alert)

  const logout = () => {
    axios.delete(`${process.env.BACKEND_URL}/api/internal/merchant/sessions`, {
      headers: { 
        'Session-Id': cookies._square_eight_merchant_session
      }
    })
    dispatch(alertChanged({message: 'ログアウトしました', show: true}))
    router.push('/merchant/login')
  }

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand href='/' className='font-weight-bold'>SquareEight</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/admin/dashboard'>ダッシュボード</Nav.Link>
              <NavDropdown title='Webページ' id='homepage-nav-dropdown'>
                <NavDropdown.Item href='/admin/homepage'>ホームページ一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/homepage/new'>ホームページ新規作成</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='予約' id='homepage-nav-dropdown'>
                <NavDropdown.Item href='/admin/reserve_frame'>予約メニュー一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/reservation'>予約一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/business_hour'>営業時間設定</NavDropdown.Item>
                <NavDropdown.Item href='/admin/special_business_hour'>特例営業時間/休業時間設定</NavDropdown.Item>
                <NavDropdown.Item href='/admin/resource'>リソース一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/resource/new'>リソース登録</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='顧客' id='homepage-nav-dropdown'>
                <NavDropdown.Item href='/admin/customer'>顧客一覧</NavDropdown.Item>
                <NavDropdown.Item href=''>アンケート一覧</NavDropdown.Item>
                <NavDropdown.Item href=''>アンケート登録</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href='/admin/charges'>売上</Nav.Link>
              <NavDropdown title='商品' id='homepage-nav-dropdown'>
                <NavDropdown.Item href='/admin/product/'>物販商品一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/product/new'>物販商品登録</NavDropdown.Item>
                <NavDropdown.Item href='/admin/monthly_payment/'>月額課金プラン一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/monthly_payment/new'>月額課金プラン作成</NavDropdown.Item>
                <NavDropdown.Item href='/admin/ticket'>回数券一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/ticket/new'>回数券作成</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='アカウント設定' id='homepage-nav-dropdown'>
                <NavDropdown.Item href='/admin/payment_method'>お支払いクレジットカード登録・変更</NavDropdown.Item>
                <NavDropdown.Item href='/admin/sales_transfer'>事業情報・売上振込先口座</NavDropdown.Item>
                <NavDropdown.Item href=''>プラン変更・退会</NavDropdown.Item>
                <NavDropdown.Item href=''>お支払い履歴</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='その他' id='homepage-nav-dropdown'>
                <NavDropdown.Item href='/inquiry'>お問い合わせ</NavDropdown.Item>
                <NavDropdown.Item href='/admin/login_user_info'>ログインユーザ情報</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>ログアウト</NavDropdown.Item>
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

export default AdminNavbarTemplate
