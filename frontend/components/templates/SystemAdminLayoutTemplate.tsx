import { ReactNode } from 'react'
import SystemAdminNavbar from 'components/organisms/SystemAdminNavbar'
import RegularFooter from 'components/organisms/RegularFooter'
interface Props {
  children: ReactNode
}

const SystemAdminLayoutTemplate = ({children}: Props): JSX.Element => {
  return (
    <>
      <SystemAdminNavbar></SystemAdminNavbar>
        {children}
      <RegularFooter></RegularFooter>
    </>
  )
}

export default SystemAdminLayoutTemplate
