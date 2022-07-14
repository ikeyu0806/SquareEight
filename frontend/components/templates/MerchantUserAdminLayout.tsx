import { ReactNode } from 'react'
import AdminNavbarTemplate from 'components/organisms/AdminNavbarTemplate'
import RegularFooter from '../../components/organisms/RegularFooter'

interface Props {
  children: ReactNode
}

const MerchantUserAdminLayout = ({children}: Props): JSX.Element => {
  return (
    <>
      <AdminNavbarTemplate></AdminNavbarTemplate>
      <br/>
      {children}
      <RegularFooter></RegularFooter>
    </>
  )
}

export default MerchantUserAdminLayout
