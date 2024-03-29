import type { NextPage } from 'next'
import InquiryTemplate from 'components/templates/InquiryTemplate'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'

const Index: NextPage = () => {
  return (
    <>
      <WithoutSessionLayout>
        <InquiryTemplate></InquiryTemplate>
      </WithoutSessionLayout>
    </>
  )
}

export default Index
