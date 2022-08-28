import React from 'react'
import RequireBadge from 'components/atoms/RequireBadge'
import { Form, FormControl, Row, Col, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from 'redux/store'

const CreateMailTemplateForm = (): JSX.Element => {
  const dispatch = useDispatch()

  return (
    <>
      <Form.Label>テンプレート名<RequireBadge /></Form.Label>
      <FormControl />
      <Form.Label className='mt20'>テンプレート<RequireBadge /></Form.Label>
      <Row>
        <Col md={8}>
          <FormControl as='textarea' rows={30} />
        </Col>
        <Col md={4}>
          <div>変数</div>
          <div>
            <ListGroup>
              <ListGroup.Item>
                %customer_name<br/>顧客名に変換されます
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className='mt10'>ページリンク一覧</div>
          <div>
            <ListGroup>
              <ListGroup.Item>
                商品購入アンケート<br/>
                {"https://localhost:3111"}
              </ListGroup.Item>
              <ListGroup.Item>
                予約ページ<br/>
                {"https://localhost:3111"}
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default CreateMailTemplateForm
