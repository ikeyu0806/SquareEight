import React from 'react'
import { Card, Row, Col, Navbar, Container, Form } from 'react-bootstrap'
import { webpageTagChanged } from 'redux/webpageSlice'
import CreateBlockModal from 'components/organisms/CreateBlockModal'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showBlockModalChanged } from 'redux/webpageSlice'
import PlusCircleIcon from 'components/atoms/PlusCircleIcon'
import UpdateBlockStateIcons from 'components/organisms/UpdateBlockStateIcons'
import HeadingBlock from 'components/organisms/HeadingBlock'
import { HeadingAtom, ImageSlide } from 'interfaces/PageContentState'
import { ExternalLinkBlockStateType } from 'interfaces/PageContentState'
import { ATOM_TYPE } from 'constants/atomType'
import ImageSlideBlock from 'components/organisms/ImageSlideBlock'

const CreateWebpageTemplate = (): JSX.Element => {
  const dispatch = useDispatch()

  const webpageTag = useSelector((state: RootState) => state.webpage.webpageTag)
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)

  return(
    <>
      <Container>
          <div className='mb20'>
            <Form.Group className='mb-3'>
              <Form.Label>管理用のページ名称を入力してください。</Form.Label>
              <Form.Control placeholder='企業情報ページ、採用情報ページなど'
                            onChange={(e) => dispatch(webpageTagChanged(e.target.value))}
                            value={webpageTag} />
            </Form.Group>
          </div>
          {pageContent.blockContent && pageContent.blockContent.map((block, i) => {
            return [
              <Row key={i}>
                {(block.atoms as HeadingAtom[] | ExternalLinkBlockStateType[] | ImageSlide[]).map((atom, i) => {
                  {switch(atom.atomType) {
                    case ATOM_TYPE.HEADING:
                      return (
                        <Col key={i}>
                          <HeadingBlock atomState={(atom as HeadingAtom)}></HeadingBlock>
                        </Col>)
                    case ATOM_TYPE.EXTERNAL_LINKS:
                      return (
                        <Col key={i}>
                          {(atom as ExternalLinkBlockStateType).content.map((c, i) => {
                            return (
                              <a href={c.url} className='list-group-item list-group-item-action' target='_blank' rel='noreferrer' key={i}>{c.text}</a>
                            )
                          })}
                        </Col>)
                    case ATOM_TYPE.IMAGE_SLIDE:
                      return (
                        <Col key={i}>
                          <ImageSlideBlock atomState={(atom as ImageSlide).imageSlide}></ImageSlideBlock>
                        </Col>
                      )
                    default:
                  }}
                })}
            </Row>,
            <UpdateBlockStateIcons
              key={i}
              blockID={block.blockID}
              sortOrder={block.sortOrder}></UpdateBlockStateIcons>]
          })}
        <div className='text-center mt30 mb30'>
          <span className='mr10'>ブロックを追加</span>
          <a onClick={() => dispatch(showBlockModalChanged(true))}><PlusCircleIcon width={40} height={40} fill={'#0000FF'} /></a>
        </div>
      </Container>
      <CreateBlockModal></CreateBlockModal>
    </>
  )
}

export default CreateWebpageTemplate
