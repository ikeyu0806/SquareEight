import { Container, Navbar, Alert } from 'react-bootstrap'
import { alertChanged } from '../../redux/alertSlice'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'

const CommonNavbar = () => {
  const dispatch = useDispatch()
  const alert =  useSelector((state: RootState) => state.alert.alert)

  return (
    <>
      <Navbar collapseOnSelect expand='lg'>
        <Container>
          <Navbar.Brand href='/'>SmartLesson</Navbar.Brand>
        </Container>
      </Navbar>
      {alert.show && <Alert variant={alert.type} onClose={() => dispatch(alertChanged({message: '', show: false}))} dismissible>
        {alert.message}
      </Alert>}
    </>
  )
}
export default CommonNavbar
