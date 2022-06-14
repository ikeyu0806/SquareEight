import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { websiteTagChanged } from '../../redux/homepageSlice'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'

const CreateHomepageTemplate = (): JSX.Element => {
  const dispatch = useDispatch()
  const websiteTag = useSelector((state: RootState) => state.homepage.websiteTag)

  return (
    <>
      <Container>
        <Row>
          <Col>
          </Col>
          <Col sm={9}>
            <h2 className='mt30'>ホームページを作成します</h2>
            <div className='mt20 mb20'>
              <Form.Group className='mb-3'>
                <Form.Label>管理用の識別タグを入力してください。</Form.Label>
                <Form.Control placeholder=''
                              onChange={(e) => dispatch(websiteTagChanged(e.target.value))}
                              value={websiteTag} />
              </Form.Group>
            </div>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CreateHomepageTemplate
