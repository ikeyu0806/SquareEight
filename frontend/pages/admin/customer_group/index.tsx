import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store'
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { CustomerGroupParam } from 'interfaces/CustomerGroupParam'
import Unauthorized from 'components/templates/Unauthorized'
import axios from 'axios'
import { showCustomerGroupMailSendModalChanged } from 'redux/customerGroupSlice'
import CustomerGroupMailSendModal from 'components/templates/CustomerGroupMailSendModal'
import { htmlMailTemplateChanged } from 'redux/accountSlice'
import { selectedHtmlMailTemplateChanged } from 'redux/sendMailSlice'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [customerGroups, setCustomerGroups] = useState<CustomerGroupParam[]>([])
  const allowReadCustomerGroup = useSelector((state: RootState) => state.merchantUserPermission.allowReadCustomerGroup)
  const allowCreateCustomerGroup = useSelector((state: RootState) => state.merchantUserPermission.allowCreateCustomerGroup)
  const allowUpdateCustomerGroup = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateCustomerGroup)

  useEffect(() => {
    const fetchCustomerGroups = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/account/customer_groups`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
        }
      )
      .then(function (response) {
        dispatch(htmlMailTemplateChanged(response.data.html_mail_templates))
        dispatch(selectedHtmlMailTemplateChanged(response.data.selected_html_mail_template))
        setCustomerGroups(response.data.customer_groups)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchCustomerGroups()
  }, [cookies._square_eight_merchant_session, dispatch])
  
  return (
    <MerchantUserAdminLayout>
      {allowReadCustomerGroup === 'Allow' && <Container>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            {allowCreateCustomerGroup === 'Allow' && <a className='btn btn-primary mb20' href='/admin/customer_group/new'>顧客グループ作成</a>}
            <h4>顧客グループ</h4>
            <ListGroup>
            {customerGroups.map((group, i) => {
              return (
                <ListGroup.Item key={i}>
                  <Row>
                    <Col>
                      {group.name}
                    </Col>
                    <Col>
                      <>
                        <Button
                          variant='primary'
                          onClick={() => {
                            dispatch(showCustomerGroupMailSendModalChanged(true))
                          }}>メール送信</Button>
                      </>
                    </Col>
                    <Col></Col>
                    {allowUpdateCustomerGroup === 'Allow' && <Col>
                      <a href={`/admin/customer_group/${group.public_id}/edit`} className='btn btn-primary'>編集</a>
                    </Col>}
                  </Row>
                </ListGroup.Item>
              )
            })}
            </ListGroup>
          </Col>
        </Row>
      </Container>}
      {allowReadCustomerGroup === 'Forbid' && <Unauthorized />}
      <CustomerGroupMailSendModal></CustomerGroupMailSendModal>
    </MerchantUserAdminLayout>
  )
}

export default Index
