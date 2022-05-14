import React, { useState } from 'react'
import type { NextPage } from 'next'
import IntroductionNavbar from '../../components/atoms/IntroductionNavbar'
import { Button, Container, Card, Row, Col, Carousel, Navbar, Modal } from 'react-bootstrap'
import { useRouter } from 'next/router'
import PencilAquareIcon from '../../components/atoms/PencilAquareIcon'
import PlusCircleIcon from '../../components/atoms/PlusCircleIcon'

const CreateHomepage: NextPage = () => {
  const router = useRouter()
  const [showBlockModal, setShowBlockModal] = useState(false)
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
                  src='/images/wait_training.jpg'
                  alt='First slide'
                />
                <Carousel.Caption>
                  <h3>編集してください</h3>
                  <p>編集してください</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src='/images/meeting.jpg'
                  alt='Second slide'
                />

                <Carousel.Caption>
                  <h3>編集してください</h3>
                  <p>編集してください</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className='d-block w-100'
                  src='/images/classroom.jpg'
                  alt='Third slide'
                />

                <Carousel.Caption>
                  <h3>編集してください</h3>
                  <p>編集してください</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            </Card.Body>
            <div className='text-center mt30 mb30'>
              <span className='mr10'>ブロックを追加</span>
              <a onClick={() => setShowBlockModal(true)}><PlusCircleIcon width={40} height={40} fill={'#0000FF'} /></a>
            </div>
            <Card.Footer className="text-muted text-center">Copyright SmartLesson Inc. 2022</Card.Footer>
          </Card>
          <div className='text-center mt30 mb30'>
            <span className='mr10'>ページを追加</span>
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
      <Modal show={showBlockModal} size='lg'>
        <Modal.Header> 
          <Modal.Title>追加したいブロックを選択してください</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <input className='form-check-input mr10' type='checkbox' />
                  <span>テキスト+画像</span>
                </Card.Body>
              </Card>
              <br />
              <Card>
                <Card.Body>
                  <input className='form-check-input mr10' type='checkbox' />
                  <span>画像スライド</span>
                </Card.Body>
              </Card>
              <br />
              <Card>
                <Card.Body>
                  <input className='form-check-input mr10' type='checkbox' />
                  <span>お知らせ・ ニュース</span>
                </Card.Body>
              </Card>
              <br />
              <Card>
                <Card.Body>
                  <input className='form-check-input mr10' type='checkbox' />
                  <span>お問い合わせフォーム</span>
                </Card.Body>
              </Card>
              <br />
              <Card>
                <Card.Body>
                  <input className='form-check-input mr10' type='checkbox' />
                  <span>ページリンク一覧</span>
                </Card.Body>
              </Card>
              <br />
              <Card>
                <Card.Body>
                  <input className='form-check-input mr10' type='checkbox' />
                  <span>アクセス案内</span>
                </Card.Body>
              </Card>
              <br />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowBlockModal(false)}>閉じる</Button>
          <Button variant='primary'>登録する</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateHomepage
