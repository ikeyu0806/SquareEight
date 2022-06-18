import React from 'react'
import { Card, Row, Col, Navbar, Carousel } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { ExternalLinkBlockStateType } from '../../interfaces/ExternalLinkBlockStateType'
import { TextImageBlockStateType } from '../../interfaces/TextImageBlockStateType'
import { ImageSlideState } from '../../interfaces/ImageSlideState'
import { BLOCK_TYPE } from '../../constants/blockType'
import { HeadingBlockState } from '../../interfaces/HeadingBlockState'
import { showBlockModalChanged } from '../../redux/homepageSlice'
import PlusCircleIcon from '../atoms/PlusCircleIcon'
import UpdateBlockStateIcons from '../organisms/UpdateBlockStateIcons'

const MerchantWebpage = (): JSX.Element => {
  const dispatch = useDispatch()

  const pageContent = useSelector((state: RootState) => state.homepage.pageContent)

  return (
    <>
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
                      <div className={((page.blockState) as HeadingBlockState).placement === 'left' ? 'text-left' : ((page.blockState) as HeadingBlockState).placement === 'center' ? 'text-center' : 'text-right'}>
                        {((page.blockState) as HeadingBlockState).size === 1 && <h1>{((page.blockState) as HeadingBlockState).text}</h1>}
                        {((page.blockState) as HeadingBlockState).size === 2 && <h2>{((page.blockState) as HeadingBlockState).text}</h2>}
                        {((page.blockState) as HeadingBlockState).size === 3 && <h3>{((page.blockState) as HeadingBlockState).text}</h3>}
                        {((page.blockState) as HeadingBlockState).size === 4 && <h4>{((page.blockState) as HeadingBlockState).text}</h4>}
                        {((page.blockState) as HeadingBlockState).size === 5 && <h5>{((page.blockState) as HeadingBlockState).text}</h5>}
                        {((page.blockState) as HeadingBlockState).size === 6 && <h6>{((page.blockState) as HeadingBlockState).text}</h6>}
                      </div>
                      <UpdateBlockStateIcons blockID={page.blockID} sortOrder={page.sortOrder}></UpdateBlockStateIcons>
                    </span>
                  )
                case BLOCK_TYPE.IMAGE_SLIDE:
                  return (
                    <div key={i}>
                      <Carousel>
                        {(page.blockState as ImageSlideState).imageSlide != undefined && (page.blockState as ImageSlideState).imageSlide.map((slide, i) => {
                          return (
                            <Carousel.Item key={i}>
                              <img
                                className='d-block w-100'
                                src={slide.image}
                                alt={slide + String(i)}
                              />
                              <Carousel.Caption>
                                <h3>{slide.title}</h3>
                                <p>{slide.text}</p>
                              </Carousel.Caption>
                            </Carousel.Item>
                          )
                        })}
                      </Carousel>
                      <UpdateBlockStateIcons blockID={page.blockID} sortOrder={page.sortOrder}></UpdateBlockStateIcons>
                    </div>
                )
                case BLOCK_TYPE.TEXT_IMAGE:
                  return (
                    <div key={i}>
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
        <Card.Footer className='text-muted text-center'>Copyright SmartLesson Inc. 2022</Card.Footer>
      </Card>
    </>
  )
}

export default MerchantWebpage
