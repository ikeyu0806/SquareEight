import { NextPage } from 'next'
import { Container, Table, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'

const Index: NextPage = () => {
  return (
    <MerchantUserAdminLayout>
      <Container>
        <Table bordered>
          <thead>
            <tr>
              <th>店舗名</th>
              <th>住所</th>
              <th>編集</th>
              <th>店舗紹介ページ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td><a className='btn btn-primary'>編集</a></td>
              <td><a className='btn btn-primary'>店舗紹介ページ</a></td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Index
