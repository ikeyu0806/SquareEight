import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap'
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
          <Col md={2}></Col>
          <Col md={8}>
            <Button onClick={() => dispatch(showPermissionGuideModalChanged(true))}>
              ユーザ権限について
            </Button>
          </Col>
        </Row>
      </Container>
      <MerchantUserPermissionGuideModal></MerchantUserPermissionGuideModal>
    </MerchantUserAdminLayout>
  )
}

export default Invitation
