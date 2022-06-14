import type { NextPage } from 'next'
import AdminNavbar from '../../../../../components/templates/AdminNavbarTemplate'
import RegularFooter from '../../../../../components/organisms/RegularFooter'
import { useCookies } from 'react-cookie'

const New: NextPage = () => {
  const [cookies] = useCookies(['_smartlesson_session'])

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default New
