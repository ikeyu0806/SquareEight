import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'
import { Button, Container, Card, Row, Col, Form, Navbar } from 'react-bootstrap'
import { useRouter } from 'next/router'
import PencilAquareIcon from '../../components/atoms/PencilAquareIcon'

const CreateHomepage: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <IntroductionNavbar />
      <div className='text-center mt50 mb50'>
        <h2>ホームページを作成します</h2>
      </div>
      <Container>
        <Row>
          <Col>
          </Col>
          <Col sm={9}>
          <Card>
            <Card.Body>
            <Navbar>
              サイトタイトル
              <PencilAquareIcon width={20} height={20} fill={'#0000FF'} />
            </Navbar>
            </Card.Body>
          </Card>

        </Col>
        <Col>
        </Col>
        </Row>
      </Container>
      <br />
      <Row>
        <Col></Col>
        <Col>
          <Button variant='outline-primary' size='lg' onClick={() => router.back()}>戻る</Button>
        </Col>
        <Col></Col>
        <Col sm={2}>
          <Button variant='primary' size='lg' href='/introduction/set_reserve_calendar'>保存して次へ</Button>
        </Col>
        <Col></Col>
        <Col>
          <Button variant='outline-primary' size='lg' href='/introduction/set_reserve_calendar'>スキップ</Button>
        </Col>
        <Col></Col>
      </Row>
    </>
  )
}

export default CreateHomepage
