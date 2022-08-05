import type { NextPage } from 'next'
import SystemAdminLayoutTemplate from 'components/templates/SystemAdminLayoutTemplate'
import { Container } from 'react-bootstrap'

const Index: NextPage = () => {
  return (
    <SystemAdminLayoutTemplate>
      <Container>
        <h3>カスタマーユーザ向けお知らせ一覧</h3>
      </Container>
    </SystemAdminLayoutTemplate>
  )
}

export default Index
