import type { NextPage } from 'next'
import { Container, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'

const Index: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <a href='/admin/html_mail_template/new' className='btn btn-primary'>新規作成</a>
        <h3>HTMLメールテンプレート一覧</h3>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
