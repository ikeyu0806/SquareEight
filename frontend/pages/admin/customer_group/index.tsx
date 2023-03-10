import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store'
import { Container, Row, Col, ListGroup, Button, Pagination } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { CustomerGroupParam } from 'interfaces/CustomerGroupParam'
import Unauthorized from 'components/templates/Unauthorized'
import axios from 'axios'
import { publicIdChanged, showCustomerGroupMailSendModalChanged } from 'redux/customerGroupSlice'
import CustomerGroupMailSendModal from 'components/templates/CustomerGroupMailSendModal'
import { htmlMailTemplateChanged, messageTemplatesChanged } from 'redux/accountSlice'
import { selectedHtmlMailTemplateChanged, sendTargetTypeChanged } from 'redux/sendMailSlice'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [customerGroups, setCustomerGroups] = useState<CustomerGroupParam[]>([])
  const allowReadCustomerGroup = useSelector((state: RootState) => state.merchantUserPermission.allowReadCustomerGroup)
  const allowCreateCustomerGroup = useSelector((state: RootState) => state.merchantUserPermission.allowCreateCustomerGroup)
  const allowUpdateCustomerGroup = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateCustomerGroup)
  // Pagination用
  // 表示するレコード数
  const displayCount = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1000)
  let usePaginationNumberReturnVal = usePaginationNumber(currentPage, lastPage)
  let firstPaginationNum: number = usePaginationNumberReturnVal[0]
  let secondPaginationNum: number = usePaginationNumberReturnVal[1]
  let thirdPaginationNum: number = usePaginationNumberReturnVal[2]
  let forthPaginationNum: number = usePaginationNumberReturnVal[3]
  let fifthPaginationNum: number = usePaginationNumberReturnVal[4]

  useEffect(() => {
    const fetchCustomerGroups = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/account/customer_groups`, {
          headers: { 
            'Session-Id': cookies._square_eight_merchant_session
          },
          params: {
            current_page: currentPage,
            display_count: displayCount
          }
        }
      )
      .then(function (response) {
        dispatch(htmlMailTemplateChanged(response.data.html_mail_templates))
        dispatch(selectedHtmlMailTemplateChanged(response.data.selected_html_mail_template))
        dispatch(messageTemplatesChanged(response.data.message_templates))
        setCustomerGroups(response.data.customer_groups)
        dispatch(sendTargetTypeChanged('customerGroup'))
        setLastPage(response.data.last_page)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchCustomerGroups()
  }, [cookies._square_eight_merchant_session, dispatch, currentPage, lastPage])
  
  return (
    <MerchantUserAdminLayout>
      <br />
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
                            dispatch(publicIdChanged(group.public_id))
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
            {customerGroups.length === 0 &&
              <div className='text-center font-size-20'>
                顧客グループが登録されていません
              </div>}
            </ListGroup>
            <br />
            <Pagination>
              <Pagination.First onClick={() => setCurrentPage(1)} />
              {currentPage > 1 && <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)} />}
              <Pagination.Item
                active={currentPage == firstPaginationNum}
                onClick={() => setCurrentPage(firstPaginationNum)}>{firstPaginationNum}</Pagination.Item>
              {lastPage > 1 && <Pagination.Item
                active={currentPage == secondPaginationNum}
                onClick={() => setCurrentPage(secondPaginationNum)}>{secondPaginationNum}</Pagination.Item>}
              {lastPage > 2 && <Pagination.Item
                active={currentPage == thirdPaginationNum}
                onClick={() => setCurrentPage(thirdPaginationNum)}>{thirdPaginationNum}</Pagination.Item>}
              {lastPage > 3 && currentPage < lastPage &&  <Pagination.Item
                active={currentPage == forthPaginationNum}
                onClick={() => setCurrentPage(forthPaginationNum)}>{forthPaginationNum}</Pagination.Item>}
              {lastPage > 4 && currentPage < lastPage - 1 && <Pagination.Item
                active={currentPage == fifthPaginationNum}
                onClick={() => setCurrentPage(fifthPaginationNum)}>{fifthPaginationNum}</Pagination.Item>}
              {currentPage !== lastPage && <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)} />}
              <Pagination.Last onClick={() => setCurrentPage(lastPage)} />
            </Pagination>
          </Col>
        </Row>
      </Container>}
      {allowReadCustomerGroup === 'Forbid' && <Unauthorized />}
      <CustomerGroupMailSendModal></CustomerGroupMailSendModal>
    </MerchantUserAdminLayout>
  )
}

export default Index
