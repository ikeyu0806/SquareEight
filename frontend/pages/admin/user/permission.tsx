import type { NextPage } from 'next'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Container, Row, Col, ListGroup, Form } from 'react-bootstrap'
import UserPermissionListGroupItem from 'components/molecules/UserPermissionListGroupItem'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { allowReadMerchantUserChanged } from 'redux/merchantUserPermissionSlice'

const Permission: NextPage = () => {
  const dispatch = useDispatch()
  const allowReadMerchantUser = useSelector((state: RootState) => state.merchantUserPermission.allowReadMerchantUser)

  return (
    <MerchantUserAdminLayout>
      <Container>
        <Row>
          <Col lg={4}>
          </Col>
          <Col lg={4}>
            <ListGroup>
              <UserPermissionListGroupItem
                onChange={() => dispatch(allowReadMerchantUserChanged(allowReadMerchantUser === 'Allow' ? 'Forbit' : 'Allow' ))}
                checked={allowReadMerchantUser === 'Allow'} />
              <ListGroup.Item>
                <Row>
                  <Col>
                    ユーザ登録
                  </Col>
                  <Col>
                    <Row>
                      <Col sm={2}></Col>
                      <Col>
                        <Form.Check type='switch'></Form.Check>
                      </Col>
                      <Col>
                        <span>有効</span>
                      </Col>
                      <Col sm={1}></Col>
                    </Row>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </MerchantUserAdminLayout>
  )
}

export default Permission
