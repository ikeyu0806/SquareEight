import React from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { webpageTagChanged } from 'redux/webpageSlice'
import CreateBlockModal from 'components/organisms/CreateBlockModal'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showBlockModalChanged } from 'redux/webpageSlice'
import PlusCircleIcon from 'components/atoms/PlusCircleIcon'
import UpdateBlockStateIcons from 'components/organisms/UpdateBlockStateIcons'
import HeadingBlock from 'components/organisms/HeadingBlock'
import TextBlock from 'components/organisms/TextBlock'
import { HeadingAtom, ImageSlide, TextAtom, ImageAtom } from 'interfaces/PageContentState'
import { ExternalLinkBlockStateType } from 'interfaces/PageContentState'
import { ATOM_TYPE } from 'constants/atomType'
import ImageSlideBlock from 'components/organisms/ImageSlideBlock'
import ImageBlock from 'components/organisms/ImageBlock'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'

interface Props {
  showDeleteButton?: boolean
}

const CreateWebpageTemplate = ({showDeleteButton}: Props): JSX.Element => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const webpageTag = useSelector((state: RootState) => state.webpage.webpageTag)
  const pageContent = useSelector((state: RootState) => state.webpage.pageContent)

  const deletePage = () => {
    swalWithBootstrapButtons.fire({
      title: '削除します',
      html: `${name}を削除します。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/webpages/${router.query.id}`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          }
        }).then(response => {
          swalWithBootstrapButtons.fire({
            title: '削除しました',
            icon: 'info'
          })
          router.push('/admin/webpage')
        }).catch(error => {
          swalWithBootstrapButtons.fire({
            title: '削除失敗しました',
            icon: 'error'
          })
        })
      }
    })
  }

  return(
    <>
      <Container>
        {showDeleteButton && <Row>
          <Col sm={10}></Col>
          <Col>
            <Button variant='danger' size='sm' onClick={() => deletePage()}>ページを削除</Button>
          </Col>
        </Row>}
        <div className='mb20'>
          <Form.Group className='mb-3'>
            <Form.Label>管理用のページ名称を入力してください。</Form.Label>
            <Form.Control placeholder='企業情報ページ、採用情報ページなど'
                          onChange={(e) => dispatch(webpageTagChanged(e.target.value))}
                          value={webpageTag} />
          </Form.Group>
        </div>
        <hr />
        {pageContent.blockContent && pageContent.blockContent.map((block, i) => {
          return [
            <Row key={i}>
              {(block.atoms as HeadingAtom[] | ExternalLinkBlockStateType[] | ImageAtom[] | ImageSlide[]).map((atom, i2) => {
                {switch(atom.atomType) {
                  case ATOM_TYPE.HEADING:
                    return (
                      <Col key={i2 + 10}>
                        <HeadingBlock atomState={(atom as HeadingAtom)}></HeadingBlock>
                      </Col>)
                  case ATOM_TYPE.TEXT:
                    return (
                      <Col key={i2 + 10}>
                        <TextBlock atomState={(atom as TextAtom)}></TextBlock>
                      </Col>)
                  case ATOM_TYPE.EXTERNAL_LINKS:
                    return (
                      <Col key={i2 + 10}>
                        {(atom as ExternalLinkBlockStateType).content.map((c, i3) => {
                          return (
                            <a href={c.url} className='list-group-item list-group-item-action' target='_blank' rel='noreferrer' key={i3 + 100}>{c.text}</a>
                          )
                        })}
                      </Col>)
                  case ATOM_TYPE.IMAGE:
                    return (
                      <Col key={i2 + 10}>
                        <ImageBlock atomState={(atom as ImageAtom)}></ImageBlock>
                      </Col>
                    )
                  case ATOM_TYPE.IMAGE_SLIDE:
                    return (
                      <Col key={i2 + 10}>
                        <ImageSlideBlock atomState={(atom as ImageSlide).imageSlide}></ImageSlideBlock>
                      </Col>
                    )
                  default:
                }}
              })}
          </Row>,
          <UpdateBlockStateIcons
            key={i + 20}
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
