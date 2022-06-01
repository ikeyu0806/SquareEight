import type { NextPage } from 'next'
import AdminNavbar from '../../components/templates/AdminNavbarTemplate'
import DashboardTemplate from '../../components/templates/DashboardTemplate'

const Dashboard: NextPage = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <br />
      <DashboardTemplate></DashboardTemplate>
    </>
  )
}

export default Dashboard
