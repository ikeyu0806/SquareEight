import { Container, Navbar, Alert, Nav, NavDropdown } from 'react-bootstrap'
import { alertChanged } from '../../redux/alertSlice'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const SystemAdminNavbar = () => {
  const dispatch = useDispatch()
  const alert =  useSelector((state: RootState) => state.alert.alert)
  const [cookies] = useCookies(['_square_eight_system_admin_user_session'])
  const router = useRouter()
  const alertState =  useSelector((state: RootState) => state.alert.alert)

  const logout = () => {
    axios.delete(`${process.env.BACKEND_URL}/api/internal/system_admin_user/sessions`, {
      headers: { 
        'Session-Id': cookies._square_eight_system_admin_user_session
      }
    })
    dispatch(alertChanged({message: 'ログアウトしました', show: true}))
    router.push('/system/admin/login')
  }

  return (
    <>
      <Navbar bg='warning' expand='lg'>
        <Container>
          <Navbar.Brand href='/' className='font-weight-bold'>SquareEight</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='/system/admin/dashboard'>ダッシュボード</Nav.Link>
            <NavDropdown title='お知らせ' id='webpage-nav-dropdown'>
              <NavDropdown.Item href='/system/admin/notification/business'>ビジネスユーザ向けお知らせ一覧</NavDropdown.Item>
              <NavDropdown.Item href='/system/admin/notification/business/new'>ビジネスユーザ向けお知らせ一覧新規作成</NavDropdown.Item>
              <NavDropdown.Item href='/system/admin/notification/customer'>カスタマーユーザ向けお知らせ一覧</NavDropdown.Item>
              <NavDropdown.Item href='/system/admin/notification/customer/new'>カスタマーユーザ向けお知らせ一覧新規作成</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='その他' id='webpage-nav-dropdown'>
              <NavDropdown.Item onClick={() => logout()}>ログアウト</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      {alert.show && <Alert variant={alert.type} onClose={() => dispatch(alertChanged({message: '', show: false}))} dismissible>
        {alert.message}
      </Alert>}
    </>
  )
}
export default SystemAdminNavbar
