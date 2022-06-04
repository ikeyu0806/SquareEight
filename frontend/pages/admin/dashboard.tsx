import type { NextPage } from 'next'
import AdminNavbar from '../../components/templates/AdminNavbarTemplate'
import DashboardTemplate from '../../components/templates/DashboardTemplate'
import RegularFooter from '../../components/organisms/RegularFooter'

const Dashboard: NextPage = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <br />
      <DashboardTemplate></DashboardTemplate>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Dashboard
