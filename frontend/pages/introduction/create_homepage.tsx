import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'
import { Button, Container, Card, Row, Col, Carousel, Navbar } from 'react-bootstrap'
import { useRouter } from 'next/router'
import PencilAquareIcon from '../../components/atoms/PencilAquareIcon'
import PlusCircleIcon from '../../components/atoms/PlusCircleIcon'

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
          <div className='mb20'>
            トップページ サイト内パス: /
          </div>
          <Card>
            <Card.Body>
            <Navbar>
              サイトタイトル
              <PencilAquareIcon width={20} height={20} fill={'#0000FF'} />
            </Navbar>
            <Carousel>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src='/images/snow_mountains.jpg'
                  alt='First slide'
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src='/images/snow_mountains.jpg'
                  alt='Second slide'
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src='/images/snow_mountains.jpg'
                  alt='Third slide'
                />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            </Card.Body>
          </Card>
          <div className='text-center mt30 mb30'>
            <PlusCircleIcon width={40} height={40} fill={'#0000FF'} />
          </div>
        </Col>
        <Col>
        </Col>
        </Row>
      </Container>
      <br />
      <Row>
        <Col></Col>
        <Col></Col>
        <Col sm={2}>
          <Button variant='outline-primary' size='lg' onClick={() => router.back()}>戻る</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col sm={2}>
          <Button variant='primary' size='lg' href='/introduction/set_reserve_calendar'>保存して次へ</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col sm={2}>
          <Button variant='outline-primary' size='lg' href='/introduction/set_reserve_calendar'>スキップ</Button>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </>
  )
}

export default CreateHomepage
