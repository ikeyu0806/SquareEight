import { ReactNode } from 'react'
import { Container, Navbar, Alert } from 'react-bootstrap'
import CommonNavbar from 'components/organisms/CommonNavbar'
import RegularFooter from 'components/organisms/RegularFooter'
import { alertChanged } from 'redux/alertSlice'
import { RootState } from 'redux/store'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
  children: ReactNode
}

const WithoutSessionLayout = ({children}: Props): JSX.Element => {
  const dispatch = useDispatch()
  const alert =  useSelector((state: RootState) => state.alert.alert)

  return (
    <>
      <CommonNavbar></CommonNavbar>
        {alert.show && <Alert variant={alert.type} onClose={() => dispatch(alertChanged({message: '', show: false}))} dismissible></Alert>}
        {children}
      <RegularFooter></RegularFooter>
    </>
  )
}

export default WithoutSessionLayout
