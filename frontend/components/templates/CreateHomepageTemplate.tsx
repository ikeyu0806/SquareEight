import React, { useState } from 'react'
import { Button, Container, Card, Row, Col, Carousel, Navbar, Modal, Form } from 'react-bootstrap'
import PencilAquareIcon from '../../components/atoms/PencilAquareIcon'
import PlusCircleIcon from '../../components/atoms/PlusCircleIcon'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { blockTypeChanged } from '../../redux/homepageSlice'

const CreateHomepageTemplate = (): JSX.Element => {
  const dispatch = useDispatch()
  const BLOCKTYPE = {
    Small: 'small'
  }

  const [showBlockModal, setShowBlockModal] = useState(false)
  const [selectedBlockedType, setSelectedBlockedType] = useState('')
  const [image, setImage] = useState('/images/noimage.jpeg')

  const blockType = useSelector((state: RootState) => state.homepage.blockType)

  const handleChangeFile = (e: any) => {
    const { files } = e.target
    setImage(window.URL.createObjectURL(files[0]))
  }

  return(
    <>
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
            <Card.Footer className='text-muted text-center'>Copyright SmartLesson Inc. 2022</Card.Footer>
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
      <Modal show={showBlockModal} size='lg'>
        <Modal.Header> 
          <Modal.Title>
          {blockType === '' &&
            <span>追加したいブロックを選択してください</span>}
          {blockType === 'textImage' &&
            <span>テキストと画像を編集してください</span>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {blockType === '' &&
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <input className='form-check-input mr10' type='checkbox' onChange={() => setSelectedBlockedType('textImage')} />
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
          </Row>}
          {blockType === 'textImage' &&
            <>
              <Row>
                <Col>
                  <h2>見出し<PencilAquareIcon width={20} height={20} fill={'#0000FF'} /></h2>
                  <div>
                    本文を入力<PencilAquareIcon width={20} height={20} fill={'#0000FF'} />
                  </div>
                </Col>
                <Col>
                <img
                  className='d-block w-100'
                  src={image}
                  alt='image'
                />
                  <Form.Group controlId='formFile' className='mb5 mt10'>
                    <Form.Label>画像をアップロード</Form.Label>
                    <Form.Control type='file' onChange={handleChangeFile} />
                  </Form.Group>
                </Col>
              </Row>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => { setShowBlockModal(false); dispatch(blockTypeChanged(''))}}>閉じる</Button>
          {blockType === '' &&
           <Button variant='primary' onClick={() => dispatch(blockTypeChanged(selectedBlockedType))}>次へ</Button>}
          {blockType === 'textImage' &&
          <Button variant='primary' onClick={() => dispatch(blockTypeChanged(selectedBlockedType))}>編集を終えてブロックを追加</Button>}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateHomepageTemplate
