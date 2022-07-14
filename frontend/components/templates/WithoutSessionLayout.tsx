import { ReactNode } from 'react'
import CommonNavbar from 'components/organisms/CommonNavbar'
import RegularFooter from '../../components/organisms/RegularFooter'

interface Props {
  children: ReactNode
}

const WithoutSessionLayout = ({children}: Props): JSX.Element => {
  return (
    <>
      <CommonNavbar></CommonNavbar>
      {children}
      <RegularFooter></RegularFooter>
    </>
  )
}

export default WithoutSessionLayout
