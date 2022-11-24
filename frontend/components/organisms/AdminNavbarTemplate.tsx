import React from 'react'
import { Nav, Navbar, NavDropdown, Container, Alert, Row, Col } from 'react-bootstrap'
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
  const stripeAccountEnable = useSelector((state: RootState) => state.currentMerchantUser.stripeAccountEnable)
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
                <NavDropdown.Item href='/admin/reserve_frame'>予約メニュー</NavDropdown.Item>
                <NavDropdown.Item href='/admin/reservation'>予約管理</NavDropdown.Item>
                <NavDropdown.Item href='/admin/monthly_payment/'>月額課金プラン一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/monthly_payment/new'>月額課金プラン作成</NavDropdown.Item>
                <NavDropdown.Item href='/admin/ticket'>回数券一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/ticket/new'>回数券作成</NavDropdown.Item>
                <NavDropdown.Item href='/admin/resource'>リソース一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/resource/new'>リソース作成</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='商品' id='webpage-nav-dropdown'>
                <NavDropdown.Item href='/admin/product/'>商品一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/product/new'>商品作成</NavDropdown.Item>
                <NavDropdown.Item href='/admin/delivery_datetime'>配送日時設定</NavDropdown.Item>
                <NavDropdown.Item href='/admin/order_item'>注文管理</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='顧客管理' id='webpage-nav-dropdown'>
                <NavDropdown.Item href='/admin/customer'>顧客</NavDropdown.Item>
                <NavDropdown.Item href='/admin/customer_group'>顧客グループ一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/customer_group/new'>顧客グループ作成</NavDropdown.Item>
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
              <NavDropdown title='決済' id='webpage-nav-dropdown'>
                <NavDropdown.Item href='/admin/charges'>売上一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/payment_request'>決済リクエスト一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/payment_request/new'>決済リクエスト作成</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='アカウント設定' id='webpage-nav-dropdown'>
                <NavDropdown.Item href='/admin/account/create_pages'>ページ一覧</NavDropdown.Item>
                <NavDropdown.Item href='/admin/shared_component/edit'>ページ全体編集</NavDropdown.Item>
                <NavDropdown.Item href='/admin/account/'>アカウント情報</NavDropdown.Item>
                <NavDropdown.Item href='/admin/payment_method'>お支払いクレジットカード登録・変更</NavDropdown.Item>
                <NavDropdown.Item href='/admin/sales_transfer'>事業情報・売上振込先口座</NavDropdown.Item>
                <NavDropdown.Item href='/admin/plan/choice'>プラン変更</NavDropdown.Item>
                <NavDropdown.Item href='/admin/system_plan_subscription_payments'>お支払い履歴</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title='その他' id='webpage-nav-dropdown'>
                <NavDropdown.Item href='/admin/inquiry'>お問い合わせ</NavDropdown.Item>
                <NavDropdown.Item href='/admin/login_user_info'>ログインユーザ情報</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>ログアウト</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className='mr-auto font-size-15'>
              <Row>
                <Col sm={3}>
                  <PlanLabel></PlanLabel>
                </Col>
              </Row>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {alertState.show && <Alert variant={alertState.type} onClose={() => dispatch(alertChanged({message: '', show: false}))} dismissible>
        {alertState.message}
      </Alert>}
      {stripeAccountEnable === 'Disable' && <Alert variant='warning'>
        <div className='text-center'>ビジネスアカウントへのご登録ありがとうございます。<br />事業情報の登録が完了していないため顧客へのオンライン決済の提供が有効になっておりません。<a href='/admin/sales_transfer'>登録はこちら</a></div>
      </Alert>}
    </>
  )
}

export default AdminNavbarTemplate
