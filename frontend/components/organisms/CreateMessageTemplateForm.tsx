import React from 'react'
import RequireBadge from 'components/atoms/RequireBadge'
import { Form, FormControl, Row, Col, ListGroup, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { nameChanged, contentChanged } from 'redux/messageTemplateSlice'

const CreateMessageTemplateForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.messageTemplate.name)
  const content = useSelector((state: RootState) => state.messageTemplate.content)

  return (
    <>
      <Form.Label>テンプレート名<RequireBadge /></Form.Label>
      <FormControl
        onChange={(e) => dispatch(nameChanged(e.target.value))}
        value={name} />
      <Form.Label className='mt20'>テンプレート<RequireBadge /></Form.Label>
      <Row>
        <Col md={8}>
          <FormControl
            value={content}
            onChange={(e) => dispatch(contentChanged(e.target.value))}
            as='textarea'
            rows={30} />
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
                {"https://localhost:3111"}<br/>
                <Button size='sm' className='mt5'>リンクを挿入</Button>
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

export default CreateMessageTemplateForm
