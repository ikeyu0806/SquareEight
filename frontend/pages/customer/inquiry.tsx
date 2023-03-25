import type { NextPage } from 'next'
import CustomerInquiryTemplate from 'components/templates/CustomerInquiryTemplate'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'

const Index: NextPage = () => {
  return (
    <>
      <WithoutSessionLayout>
        <CustomerInquiryTemplate></CustomerInquiryTemplate>
      </WithoutSessionLayout>
    </>
  )
}

export default Index
