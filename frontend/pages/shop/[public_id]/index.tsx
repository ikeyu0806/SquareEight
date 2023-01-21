import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import ShopPageTemplate from 'components/templates/ShopPageTemplate'

const Index: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <ShopPageTemplate></ShopPageTemplate>
    </MerchantUserAdminLayout>
  )
}

export default Index
