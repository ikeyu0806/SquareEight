import type { NextPage } from 'next'
import AdminNavbar from '../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../components/organisms/RegularFooter'
import CreateHomepageTemplate from '../../../components/templates/CreateHomepageTemplate'
const New: NextPage = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <CreateHomepageTemplate></CreateHomepageTemplate>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default New
