import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import InquiryTemplate from 'components/templates/InquiryTemplate'

const Index: NextPage = () => {
  return (
    <>
      <MerchantUserAdminLayout>
        <InquiryTemplate></InquiryTemplate>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
