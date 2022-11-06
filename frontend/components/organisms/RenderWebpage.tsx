import React from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'
import UpdateBlockStateIcons from 'components/organisms/UpdateBlockStateIcons'
import HeadingBlock from 'components/organisms/HeadingBlock'
import TextBlock from 'components/organisms/TextBlock'
import { HeadingAtom, ImageSlide, TextAtom, IframeAtom, HTMLAtom, ImageAtom } from 'interfaces/PageContentState'
import { ExternalLinkBlockStateType } from 'interfaces/PageContentState'
import { ATOM_TYPE } from 'constants/atomType'
import ImageSlideBlock from 'components/organisms/ImageSlideBlock'
import ImageBlock from 'components/organisms/ImageBlock'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import parse from 'html-react-parser'

interface Props {
  editPage?: boolean
}

const RenderWebpage = ({editPage}: Props): JSX.Element => {
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)

  return (
    <>
      {pageContent.blockContent && pageContent.blockContent.map((block, i) => {
        return [
          <Row key={i}>
            {(block.atoms as HeadingAtom[] | ExternalLinkBlockStateType[] | IframeAtom[] | HTMLAtom[] | ImageAtom[] | ImageSlide[]).map((atom, i2) => {
              {switch(atom.atomType) {
                case ATOM_TYPE.HEADING:
                  return (
                    <Col key={i2 + 10}>
                      <HeadingBlock atomState={(atom as HeadingAtom)}></HeadingBlock>
                    </Col>)
                case ATOM_TYPE.TEXT:
                  return (
                    <Col key={i2 + 11}>
                      <TextBlock atomState={(atom as TextAtom)}></TextBlock>
                    </Col>)
                case ATOM_TYPE.EXTERNAL_LINKS:
                  return (
                    <Col key={i2 + 12}>
                      <ListGroup>
                        {(atom as ExternalLinkBlockStateType).content.map((c, i3) => {
                          return (
                            <a href={c.url}
                              className='list-group-item list-group-item-action'
                              target='_blank'
                              rel='noreferrer'
                              key={i3 + 100}>{c.text}</a>
                          )
                        })}
                      </ListGroup>
                    </Col>)
                case ATOM_TYPE.IFRAME:
                  return (
                    <Col key={i2 + 13}>
                      <iframe src={(atom as IframeAtom).src} height={(atom as IframeAtom).height} width={(atom as IframeAtom).width} />
                    </Col>
                  )
                case ATOM_TYPE.HTML:
                  return (
                    parse((atom as HTMLAtom).html)
                  )
                case ATOM_TYPE.IMAGE:
                  return (
                    <Col key={i2 + 14}>
                      <ImageBlock atomState={(atom as ImageAtom)}></ImageBlock>
                    </Col>
                  )
                case ATOM_TYPE.IMAGE_SLIDE:
                  return (
                    <Col key={i2 + 15}>
                      <ImageSlideBlock atomState={(atom as ImageSlide).imageSlide}></ImageSlideBlock>
                    </Col>
                  )
                default:
              }}
            })}
        </Row>,
        <>
        {editPage &&
        <UpdateBlockStateIcons
          key={i + 20}
          blockID={block.blockID}
          sortOrder={block.sortOrder}></UpdateBlockStateIcons>}</>
        ]
        })
      }
    </>
  )
}

export default RenderWebpage
