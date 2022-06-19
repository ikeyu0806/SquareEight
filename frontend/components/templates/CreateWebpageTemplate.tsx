import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { webpageTagChanged, isTopPageChanged } from '../../redux/homepageSlice'
import CreateBlockModal from '../organisms/CreateBlockModal'
import MerchantWebpage from '../organisms/MerchantWebpage'

const CreateWebpageTemplate = (): JSX.Element => {
  const dispatch = useDispatch()

  const webpageTag = useSelector((state: RootState) => state.homepage.webpageTag)
  const isTopPage = useSelector((state: RootState) => state.homepage.isTopPage)

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
          <MerchantWebpage></MerchantWebpage>
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
