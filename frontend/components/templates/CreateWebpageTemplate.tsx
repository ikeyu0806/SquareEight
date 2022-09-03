import React from 'react'
import { Card, Row, Col, Navbar, Container, Form } from 'react-bootstrap'
import { webpageTagChanged } from 'redux/webpageSlice'
import CreateBlockModal from 'components/organisms/CreateBlockModal'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showBlockModalChanged } from 'redux/webpageSlice'
import PlusCircleIcon from '../atoms/PlusCircleIcon'
import UpdateBlockStateIcons from 'components/organisms/UpdateBlockStateIcons'
import HeadingBlock from 'components/organisms/HeadingBlock'
import { HeadingAtom } from 'interfaces/PageContentState'
import { ExternalLinkBlockStateType } from 'interfaces/PageContentState'

const CreateWebpageTemplate = (): JSX.Element => {
  const dispatch = useDispatch()

  const webpageTag = useSelector((state: RootState) => state.webpage.webpageTag)
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)

  return(
    <>
      <Container>
        <Row>
          <Col>
          </Col>
          <Col sm={9}>
          <div className='mb20'>
            <Form.Group className='mb-3'>
              <Form.Label>管理用のページ名称を入力してください。</Form.Label>
              <Form.Control placeholder='企業情報ページ、採用情報ページなど'
                            onChange={(e) => dispatch(webpageTagChanged(e.target.value))}
                            value={webpageTag} />
            </Form.Group>
          </div>
          <Card>
            <Card.Body>
              <Navbar>
              </Navbar>
              {pageContent.blockContent && pageContent.blockContent.map((block, i) => {
                return [
                  <Row key={i}>
                      {(block.atoms as HeadingAtom[] | ExternalLinkBlockStateType[]).map((atom, i) => {
                        {switch(atom.atomType) {
                          case 'heading':
                            return (
                              <Col key={i}>
                                <HeadingBlock atomState={(atom as HeadingAtom)}></HeadingBlock>
                              </Col>)
                          default:
                        }}
                      })}
                  </Row>,
                  <UpdateBlockStateIcons
                    key={i}
                    blockID={block.blockID}
                    sortOrder={block.sortOrder}></UpdateBlockStateIcons>]
              })}
              {/* {pageContent.map((page, i) =>
                {
                  switch (page.blockType) {
                    case BLOCK_TYPE.HEADING:
                      return (
                        <span key={i}>
                          <HeadingBlock blockState={(page.blockState) as HeadingBlockState}></HeadingBlock>
                          <UpdateBlockStateIcons blockID={page.blockID} sortOrder={page.sortOrder}></UpdateBlockStateIcons>
                        </span>
                      )
                    case BLOCK_TYPE.IMAGE_SLIDE:
                      return (
                        <div key={i}>
                          <ImageSlideBlock blockState={(page.blockState) as ImageSlideState}></ImageSlideBlock>
                          <UpdateBlockStateIcons blockID={page.blockID} sortOrder={page.sortOrder}></UpdateBlockStateIcons>
                        </div>
                    )
                    case BLOCK_TYPE.EXTERNAL_LINKS:
                      return [
                        (page.blockState as ExternalLinkBlockStateType).content.map((block, i) => {
                          return (
                            <a href={block.url} className='list-group-item list-group-item-action' target='_blank' rel='noreferrer' key={i}>{block.text}</a>
                          )
                        }),
                        <UpdateBlockStateIcons blockID={page.blockID} sortOrder={page.sortOrder} key={i}></UpdateBlockStateIcons>
                      ]
                    default:
                      console.log('invalid block')
                  }
                }
              )} */}
            </Card.Body>
            <div className='text-center mt30 mb30'>
              <span className='mr10'>ブロックを追加</span>
              <a onClick={() => dispatch(showBlockModalChanged(true))}><PlusCircleIcon width={40} height={40} fill={'#0000FF'} /></a>
            </div>
          </Card>
        </Col>
        <Col>
        </Col>
        </Row>
      </Container>
      <CreateBlockModal></CreateBlockModal>
    </>
  )
}

export default CreateWebpageTemplate
