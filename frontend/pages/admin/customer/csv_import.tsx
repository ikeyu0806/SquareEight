import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Table } from 'react-bootstrap'

const CsvImport: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <br />
      <Container>
        <h4>顧客CSVインポート</h4>
        <Table>

        </Table>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default CsvImport
