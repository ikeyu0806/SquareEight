import type { NextPage } from 'next'
import EnterpriseInquiryTemplate from 'components/templates/EnterpriseInquiryTemplate'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'

const Index: NextPage = () => {
  return (
    <>
      <WithoutSessionLayout>
        <EnterpriseInquiryTemplate></EnterpriseInquiryTemplate>
      </WithoutSessionLayout>
    </>
  )
}

export default Index
