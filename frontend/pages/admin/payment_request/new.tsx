import { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import MessageTemplateVariables from 'components/molecules/MessageTemplateVariables'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { contentChanged } from "redux/messageTemplateSlice"

const New: NextPage = () => {
  const dispatch = useDispatch()
  const content = useSelector((state: RootState) => state.messageTemplate.content)

  return (
    <MerchantUserAdminLayout>
      <Container>
        <h3>決済リクエスト作成</h3>
        <Form.Label>対象顧客</Form.Label>
        <Form.Check
          type='radio'
          label='登録済みの顧客に送信'
          name='targetCustomerCheck'
          id='registeredCustomer'></Form.Check>
        <Form.Check
          type='radio'
          label='顧客グループに送信'
          name='targetCustomerCheck'
          id='targetCustomerCustomer'></Form.Check>
        <Form.Check
          type='radio'
          label='未登録の顧客に送信'
          name='targetCustomerCheck'
          id='newCustomer'></Form.Check>
        <hr />
        <Form.Label>請求金額</Form.Label>
        <Form.Control type='number'></Form.Control>
        <hr />
        <Form.Label>メール本文</Form.Label>
        <Form.Check
          type='radio'
          label='登録済みのメッセージテンプレートから選択'
          name='messageTemplate'
          id='selectRegisteredMessageTemplate'></Form.Check>
        <Form.Check
          type='radio'
          label='メッセージを入力する'
          name='messageTemplate'
          id='createMessageTemplate'></Form.Check>
        <Row>
          <Col md={8}>
            <Form.Control
              value={content}
              onChange={(e) => dispatch(contentChanged(e.target.value))}
              as='textarea'
              rows={20}></Form.Control>
          </Col>
          <Col md={4}>
            <MessageTemplateVariables />
          </Col>
        </Row>
        <div className='text-center mt20'>
          <Button>確定して送信する</Button>
        </div>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default New
