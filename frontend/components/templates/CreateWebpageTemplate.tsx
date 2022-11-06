import React from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import CreateBlockModal from 'components/organisms/CreateBlockModal'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { showBlockModalChanged, publishStatusChanged, webpageTagChanged } from 'redux/webpageSlice'
import PlusCircleIcon from 'components/atoms/PlusCircleIcon'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { swalWithBootstrapButtons } from 'constants/swalWithBootstrapButtons'
import RenderWebpage from 'components/organisms/RenderWebpage'

interface Props {
  showDeleteButton?: boolean
}

const CreateWebpageTemplate = ({showDeleteButton}: Props): JSX.Element => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const webpageTag = useSelector((state: RootState) => state.webpage.webpageTag)
  const publishStatus = useSelector((state: RootState) => state.webpage.publishStatus)

  const deletePage = () => {
    swalWithBootstrapButtons.fire({
      title: '削除します',
      html: `${webpageTag}を削除します。<br />よろしいですか？`,
      icon: 'question',
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BACKEND_URL}/api/internal/webpages/${router.query.public_id}`, {
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
            <Form.Control onChange={(e) => dispatch(webpageTagChanged(e.target.value))}
                          value={webpageTag} />
          </Form.Group>
        </div>
        <div>
          <Row>
            <Col>
              <Form.Group className='mb-3'>
                <Form.Label>公開設定</Form.Label>
                <Form.Select
                  onChange={(e) => dispatch(publishStatusChanged(e.target.value))}
                  value={publishStatus || 'Unpublish'}>
                  <option value='Unpublish'>非公開</option>
                  <option value='Publish'>公開</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
            </Col>
            <Col>
            </Col>
          </Row>
        </div>
        <hr />
        <RenderWebpage editPage={true}></RenderWebpage>
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
