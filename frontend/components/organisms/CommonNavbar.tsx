import { Container, Navbar, Alert } from 'react-bootstrap'
import { alertChanged } from '../../redux/alertSlice'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import navbarStyles from 'styles/Navbar.module.css'

const CommonNavbar = () => {
  const dispatch = useDispatch()
  const alert =  useSelector((state: RootState) => state.alert.alert)

  return (
    <>
      <Navbar collapseOnSelect expand='lg'>
        <Container>
          <Navbar.Brand href='/' className='font-weight-bold'>
          <img
            alt='square-eight-logo'
            className={navbarStyles.square_eight_logo_with_side_text}
            src='/logos/square-eight-logo-with-side-text.png' />
          </Navbar.Brand>
        </Container>
      </Navbar>
      {alert.show && <Alert variant={alert.type} onClose={() => dispatch(alertChanged({message: '', show: false}))} dismissible>
        {alert.message}
      </Alert>}
    </>
  )
}
export default CommonNavbar
