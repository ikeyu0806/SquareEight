import type { NextPage } from 'next'
import SystemAdminLayoutTemplate from 'components/templates/SystemAdminLayoutTemplate'
import { Container } from 'react-bootstrap'

const New: NextPage = () => {
  return (
    <SystemAdminLayoutTemplate>
      <Container>
        <h3>ビジネスユーザ向けお知らせ作成</h3>
      </Container>
    </SystemAdminLayoutTemplate>
  )
}

export default New
