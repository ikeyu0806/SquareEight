import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import DashboardTemplate from 'components/templates/DashboardTemplate'

const Dashboard: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <br />
      <DashboardTemplate></DashboardTemplate>
    </MerchantUserAdminLayout>
  )
}

export default Dashboard
