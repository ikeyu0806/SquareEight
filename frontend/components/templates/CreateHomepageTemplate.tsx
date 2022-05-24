import React from 'react'
import { Container, Card, Row, Col, Navbar } from 'react-bootstrap'
import PencilAquareIcon from '../../components/atoms/PencilAquareIcon'
import PlusCircleIcon from '../../components/atoms/PlusCircleIcon'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { showBlockModalChanged } from '../../redux/homepageSlice'
import CreateBlockModal from '../organisms/CreateBlockModal'
import { ExternalLinkBlockStateType } from '../../interfaces/ExternalLinkBlockStateType'
import { TextImageBlockStateType } from '../../interfaces/TextImageBlockStateType'
import { BLOCK_TYPE } from '../../constants/blockType'
import { HeadingBlockState } from '../../interfaces/HeadingBlockState'

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
              {pageContent.map((page, i) =>
                {          
                  switch (page.blockType) {
                    case BLOCK_TYPE.HEADING:
                      return (
                        <>
                          <div className={((page.blockState) as HeadingBlockState).placement === 'left' ? 'text-left' : ((page.blockState) as HeadingBlockState).placement === 'center' ? 'text-center' : 'text-right'}>
                            {((page.blockState) as HeadingBlockState).size === 1 && <h1>{((page.blockState) as HeadingBlockState).text}</h1>}
                            {((page.blockState) as HeadingBlockState).size === 2 && <h2>{((page.blockState) as HeadingBlockState).text}</h2>}
                            {((page.blockState) as HeadingBlockState).size === 3 && <h3>{((page.blockState) as HeadingBlockState).text}</h3>}
                            {((page.blockState) as HeadingBlockState).size === 4 && <h4>{((page.blockState) as HeadingBlockState).text}</h4>}
                            {((page.blockState) as HeadingBlockState).size === 5 && <h5>{((page.blockState) as HeadingBlockState).text}</h5>}
                            {((page.blockState) as HeadingBlockState).size === 6 && <h6>{((page.blockState) as HeadingBlockState).text}</h6>}
                          </div>
                        </>
                      )
                    case BLOCK_TYPE.TEXT_IMAGE:
                      return (
                        <Row className='mt10 mb10'>
                        <Col>
                          <h2>{(page.blockState as TextImageBlockStateType).title}</h2>
                          <div>
                            {(page.blockState as TextImageBlockStateType).text}
                          </div>
                        </Col>
                        <Col>
                        <img
                          className='d-block w-100'
                          src={(page.blockState as TextImageBlockStateType).image}
                          alt='image'
                        />
                        </Col>
                      </Row>
                      )
                    case BLOCK_TYPE.EXTERNAL_LINKS:
                      return (
                        (page.blockState as ExternalLinkBlockStateType).content.map((block, i) => {
                          return (
                            <a href={block.url} className="list-group-item list-group-item-action" target="_blank" rel="noreferrer" key={i}>{block.text}</a>
                          )
                        }
                      ))
                    default:
                      console.log('invalid block')
                  }
                }
              )}
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
