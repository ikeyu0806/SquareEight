import React from 'react'
import { Container, Card, Row, Col, Navbar } from 'react-bootstrap'
import PencilAquareIcon from '../../components/atoms/PencilAquareIcon'
import PlusCircleIcon from '../../components/atoms/PlusCircleIcon'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { showBlockModalChanged } from '../../redux/homepageSlice'
import CreateBlockModal from '../organisms/CreateBlockModal'

const CreateHomepageTemplate = (): JSX.Element => {
  const dispatch = useDispatch()

  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)

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
              <>
                {console.log("!!!", pageContent)}
                {pageContent.map((content, i) => {
                  if ( content.blockType === 'externalLinks') {
                    return (content.blockState.content.map((block, i) => {
                      return (
                        <a href={block.url} className="list-group-item list-group-item-action" target="_blank" rel="noreferrer" key={i}>{block.text}</a>
                      )
                    })
                  )
                  }
                })}
              </>
            </Card.Body>
            <div className='text-center mt30 mb30'>
              <span className='mr10'>ブロックを追加</span>
              <a onClick={() => dispatch(showBlockModalChanged(true))}><PlusCircleIcon width={40} height={40} fill={'#0000FF'} /></a>
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
      <CreateBlockModal></CreateBlockModal>
    </>
  )
}

export default CreateHomepageTemplate
