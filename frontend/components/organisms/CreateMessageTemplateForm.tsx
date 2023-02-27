import React from 'react'
import RequireBadge from 'components/atoms/RequireBadge'
import { Form, FormControl, Row, Col, ListGroup, Button, Pagination } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { nameChanged, titleChanged, contentChanged } from 'redux/messageTemplateSlice'
import MessageTemplateVariables from 'components/molecules/MessageTemplateVariables'

const CreateMessageTemplateForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.messageTemplate.name)
  const title = useSelector((state: RootState) => state.messageTemplate.title)
  const content = useSelector((state: RootState) => state.messageTemplate.content)
  const pageLinks = useSelector((state: RootState) => state.messageTemplate.pageLinks)

  const insertPageLink = (pageLink: string) => {
   let updateContent: string
   updateContent = content + pageLink
   dispatch(contentChanged(updateContent)) 
  }

  return (
    <>
      <Form.Label>テンプレート名<RequireBadge /></Form.Label>
      <FormControl
        onChange={(e) => dispatch(nameChanged(e.target.value))}
        value={name} />
      <Form.Label>メールタイトル<RequireBadge /></Form.Label>
      <FormControl
        onChange={(e) => dispatch(titleChanged(e.target.value))}
        value={title} />
      <Form.Label className='mt20'>テンプレート<RequireBadge /></Form.Label>
      <Row>
        <Col md={5}>
          <FormControl
            placeholder='%customer_name様&#10;〇〇についてご案内いたします。'
            value={content}
            onChange={(e) => dispatch(contentChanged(e.target.value))}
            as='textarea'
            rows={40} />
        </Col>
        <Col md={3}>
          <MessageTemplateVariables></MessageTemplateVariables>
        </Col>
        <Col md={4}>
          <div>ページリンク一覧</div>
          <div>
            <ListGroup>
              {pageLinks.map((link, i) => {
                return (
                  <ListGroup.Item key={i}>
                    <span className='badge bg-info'>{link.label}</span><br/>
                    {link.text}<br/>
                    {process.env.FRONTEND_URL + link.value}<br/>
                    <Button size='sm' className='mt5' onClick={() => insertPageLink(process.env.FRONTEND_URL + link.value)}>リンクを挿入</Button>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default CreateMessageTemplateForm
