import type { NextPage } from 'next'
import WithoutSessionLayout from 'components/templates/WithoutSessionLayout'
import { Container, Card } from 'react-bootstrap'

const Terms: NextPage = () => {
  return (
    <WithoutSessionLayout>
      <Container>
        <Card>
          <Card.Body>
            <div>電子公告</div>
          </Card.Body>
        </Card>
      </Container>
    </WithoutSessionLayout>
  )
}

export default Terms
