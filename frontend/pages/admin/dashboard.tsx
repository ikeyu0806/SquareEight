import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import DashboardTemplate from 'components/templates/DashboardTemplate'

const Dashboard: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <DashboardTemplate></DashboardTemplate>
    </MerchantUserAdminLayout>
  )
}

export default Dashboard
