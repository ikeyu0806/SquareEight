import { ReactNode } from 'react'
import CommonNavbar from 'components/organisms/CommonNavbar'
import RegularFooter from 'components/organisms/RegularFooter'
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
        {children}
      <RegularFooter></RegularFooter>
    </>
  )
}

export default WithoutSessionLayout
