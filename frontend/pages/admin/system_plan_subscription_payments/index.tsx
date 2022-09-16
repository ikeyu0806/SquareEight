import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container } from 'react-bootstrap'

const Index: NextPage = () => {
  return (
    <>
      <MerchantUserAdminLayout>
        <Container>
          <h3>お支払い履歴</h3>
        </Container>
      </MerchantUserAdminLayout>
    </>
  )
}

export default Index
