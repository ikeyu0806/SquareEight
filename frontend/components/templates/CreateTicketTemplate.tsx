import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { websiteTagChanged } from '../../redux/homepageSlice'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'

const CreateTicketTemplate = (): JSX.Element => {
  const dispatch = useDispatch()
  const websiteTag = useSelector((state: RootState) => state.homepage.websiteTag)

  return (
    <>
      <Container>
        <Row>
          <Col lg={3} md={3}></Col>
          <Col lg={6} md={6}>
            <h2 className='mt30'>回数券を作成します</h2>
            <div className='mt20 mb20'>
              <Form.Group className='mb-3'>
                <Form.Label>表示名</Form.Label>
                <Form.Control placeholder='表示名'
                              onChange={(e) => dispatch(websiteTagChanged(e.target.value))}
                              value={websiteTag} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>発行枚数</Form.Label>
                <Form.Control placeholder='発行枚数'
                              onChange={(e) => dispatch(websiteTagChanged(e.target.value))}
                              value={websiteTag} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>値段</Form.Label>
                <Form.Control placeholder='値段'
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

export default CreateTicketTemplate
