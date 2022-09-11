import React from 'react'
import { Nav, Navbar, NavDropdown, Container, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { alertChanged } from '../../redux/alertSlice'
import { RootState } from '../../redux/store'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import PlanLabel from 'components/atoms/PlanLabel'

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
          <Navbar.Brand href='/'>
            <span className='font-weight-bold'>
            SquareEight
            </span></Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto font-size-15'>
              <Nav.Link href='/admin/dashboard'>ダッシュボード</Nav.Link>
              <NavDropdown title='予約' id='webpage-nav-dropdown'>
                <NavDropdown.Item href='/admin/reserve_frame'>予約メニュー一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/reservation'>予約一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/business_hour'>営業時間設定</NavDropdown.Item>
                <NavDropdown.Item href='/admin/special_business_hour'>特例営業日時</NavDropdown.Item>
                <NavDropdown.Item href='/admin/special_holiday'>特例休業日時</NavDropdown.Item>
                <NavDropdown.Item href='/admin/resource'>リソース一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/resource/new'>リソース登録</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='商品' id='webpage-nav-dropdown'>
                <NavDropdown.Item href='/admin/product/'>物販商品</NavDropdown.Item>
                <NavDropdown.Item href='/admin/monthly_payment/'>月額課金プラン</NavDropdown.Item>
                <NavDropdown.Item href='/admin/ticket'>回数券</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='顧客管理' id='webpage-nav-dropdown'>
                <NavDropdown.Item href='/admin/customer'>顧客</NavDropdown.Item>
                <NavDropdown.Item href='/admin/message_template'>メッセージテンプレート</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='Webページ' id='webpage-nav-dropdown'>
                <NavDropdown.Item href='/admin/webpage'>Webページ一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/webpage/new'>Webページ新規作成</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='アンケート' id='webpage-nav-dropdown'>
                <NavDropdown.Item href='/admin/questionnaire/master/new'>アンケート作成</NavDropdown.Item>
                <NavDropdown.Item href='/admin/questionnaire/master/'>アンケート一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/questionnaire/answer/'>アンケート回答一覧</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href='/admin/charges'>売上</Nav.Link>
              <NavDropdown title='アカウント設定' id='webpage-nav-dropdown'>
                <NavDropdown.Item href='/admin/account/create_pages'>ページ一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/shared_component/edit'>ページ全体編集</NavDropdown.Item>
                <NavDropdown.Item href='/admin/payment_method'>お支払いクレジットカード登録・変更</NavDropdown.Item>
                <NavDropdown.Item href='/admin/sales_transfer'>事業情報・売上振込先口座</NavDropdown.Item>
                <NavDropdown.Item href='/admin/plan/choice'>プラン変更・退会</NavDropdown.Item>
                <NavDropdown.Item href=''>お支払い履歴</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='その他' id='webpage-nav-dropdown'>
                <NavDropdown.Item href='/admin/inquiry'>お問い合わせ</NavDropdown.Item>
                <NavDropdown.Item href='/admin/login_user_info'>ログインユーザ情報</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>ログアウト</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className='mr-auto font-size-15'>
              <PlanLabel></PlanLabel>
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
