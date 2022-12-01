import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { showPermissionGuideModalChanged } from 'redux/merchantUserPermissionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import MerchantUserPermissionGuideModal from 'components/templates/MerchantUserPermissionGuideModal'

const Invitation: NextPage = () => {
  const dispatch = useDispatch()
  const showPermissionGuideModal = useSelector((state: RootState) => state.merchantUserPermission.showPermissionGuideModal)

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <div className='mb20'>
              <Button onClick={() => dispatch(showPermissionGuideModalChanged(true))}>
                ユーザ権限について
              </Button>
            </div>
            <Form.Label>名前(姓)</Form.Label>
            <Form.Control></Form.Control>
            <Form.Label>名前(名)</Form.Label>
            <Form.Control></Form.Control>
            <Form.Label>メールアドレス</Form.Label>
            <Form.Control></Form.Control>
            <Form.Label>管理者権限</Form.Label>
            <Form.Select>
              <option>管理者</option>
              <option>一般ユーザ</option>
            </Form.Select>
            <Button className='mt30'>登録する</Button>
          </Col>
        </Row>
      </Container>
      <MerchantUserPermissionGuideModal></MerchantUserPermissionGuideModal>
    </MerchantUserAdminLayout>
  )
}

export default Invitation
