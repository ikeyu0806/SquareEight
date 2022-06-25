import React from 'react'
import { Card, Row, Col, Navbar, Container, Form } from 'react-bootstrap'
import { webpageTagChanged, isTopPageChanged } from '../../redux/homepageSlice'
import CreateBlockModal from '../organisms/CreateBlockModal'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { ExternalLinkBlockStateType } from '../../types/ExternalLinkBlockStateType'
import { TextImageBlockStateType } from '../../types/TextImageBlockStateType'
import { ImageSlideState } from '../../types/ImageSlideState'
import { BLOCK_TYPE } from '../../constants/blockType'
import { HeadingBlockState } from '../../interfaces/HeadingBlockState'
import { showBlockModalChanged } from '../../redux/homepageSlice'
import PlusCircleIcon from '../atoms/PlusCircleIcon'
import UpdateBlockStateIcons from '../organisms/UpdateBlockStateIcons'
import HeadingBlock from '../organisms/HeadingBlock'
import TextImageBlock from '../organisms/TextImageBlock'
import ImageSlideBlock from '../organisms/ImageSlideBlock'

const CreateWebpageTemplate = (): JSX.Element => {
  const dispatch = useDispatch()

  const webpageTag = useSelector((state: RootState) => state.homepage.webpageTag)
  const isTopPage = useSelector((state: RootState) => state.homepage.isTopPage)
  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)

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
          <Form.Check
            type='switch'
            label='トップページに設定する'
            checked={isTopPage}
            onChange={() => dispatch(isTopPageChanged(!isTopPage))}
          />
          <Card>
            <Card.Body>
              <Navbar>
              </Navbar>
              {pageContent.map((page, i) =>
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
                    case BLOCK_TYPE.TEXT_IMAGE:
                      return (
                        <div key={i}>
                          <TextImageBlock blockState={(page.blockState) as TextImageBlockStateType}></TextImageBlock>
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
              )}
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
