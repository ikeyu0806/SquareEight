import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/templates/IntroductionNavbar'
import RegularFooter from '../../components/organisms/RegularFooter'
import { Container, Button, Row, Col } from 'react-bootstrap'
import CreateResource from 'components/templates/CreateResource'

const Resource: NextPage = () => {
  return (
    <>
      <IntroductionNavbar />
      <Container>
        <CreateResource></CreateResource>
        <Row>
        <Col></Col>
        <Col>
          <Button variant='outline-primary' size='lg'>戻る</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button variant='primary' size='lg'>次へ</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button variant='outline-primary' size='lg'>スキップ</Button>
        </Col>
        <Col></Col>
      </Row>
      </Container>
      <RegularFooter></RegularFooter>
    </>
  )
}

export default Resource
