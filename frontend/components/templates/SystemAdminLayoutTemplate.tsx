import { ReactNode } from 'react'
import SystemAdminnNavbar from 'components/organisms/SystemAdminNavbar'
import RegularFooter from 'components/organisms/RegularFooter'
interface Props {
  children: ReactNode
}

const SystemAdminLayoutTemplate = ({children}: Props): JSX.Element => {
  return (
    <>
      <SystemAdminnNavbar></SystemAdminnNavbar>
        {children}
      <RegularFooter></RegularFooter>
    </>
  )
}

export default SystemAdminLayoutTemplate
