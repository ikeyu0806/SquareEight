import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { RootState } from 'redux/store'
import { CustomerParam } from 'interfaces/CustomerParam'
import { Modal, Button, Form, FormControl, Row, Col, ListGroup, Pagination } from 'react-bootstrap'
import { showSendMessageTemplateModalChanged,
         customerPaginationStateChanged,
         targetTypeChanged,
         targetCustomersChanged,
         targetEmailsChanged } from 'redux/messageTemplateSlice'
import { alertChanged } from 'redux/alertSlice'
import axios from 'axios'

const SendMessageTemplateModal = (): JSX.Element => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])

  const showSendMessageTemplateModal = useSelector((state: RootState) => state.messageTemplate.showSendMessageTemplateModal)
  const id = useSelector((state: RootState) => state.messageTemplate.id)
  const name = useSelector((state: RootState) => state.messageTemplate.name)
  const targetEmails = useSelector((state: RootState) => state.messageTemplate.targetEmails)
  const content = useSelector((state: RootState) => state.messageTemplate.content)
  const customers = useSelector((state: RootState) => state.messageTemplate.customers)
  const customerPaginationState = useSelector((state: RootState) => state.messageTemplate.customerPaginationState)
  const targetType = useSelector((state: RootState) => state.messageTemplate.targetType)
  const targetCustomers = useSelector((state: RootState) => state.messageTemplate.targetCustomers)

  const sendMessage = () => {
    axios.post(`${process.env.BACKEND_URL}/api/internal/message_templates/${id}`,
    {
      message_template: {
        name: name,
        content: content,
      }
    },
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      }
    }).then(response => {
      dispatch(alertChanged({message: '更新しました', show: true}))
      location.reload()
    }).catch(error => {
    })
  }

  const displayPrevPage = () => {
    if (customerPaginationState.currentPage <= 1) return
    dispatch(customerPaginationStateChanged({currentPage: customerPaginationState.currentPage - 1, totalPage: customerPaginationState.totalPage, maxPerPage: customerPaginationState.maxPerPage}))
  }

  const displayNextPage = () => {
    if (customerPaginationState.currentPage >= customerPaginationState.totalPage) return
    dispatch(customerPaginationStateChanged({currentPage: customerPaginationState.currentPage + 1, totalPage: customerPaginationState.totalPage, maxPerPage: customerPaginationState.maxPerPage}))
  }

  const displaySelectedPage = (i: number) => {
    dispatch(customerPaginationStateChanged({currentPage: i + 1, totalPage: customerPaginationState.totalPage, maxPerPage: customerPaginationState.maxPerPage}))
  }

  const displayFirstPage = () => {
    dispatch(customerPaginationStateChanged({currentPage: 1, totalPage: customerPaginationState.totalPage, maxPerPage: customerPaginationState.maxPerPage}))
  }

  const displayLastPage = () => {
    dispatch(customerPaginationStateChanged({currentPage: customerPaginationState.totalPage, totalPage: customerPaginationState.totalPage, maxPerPage: customerPaginationState.maxPerPage}))
  }

  const isDisplayPage = (i: number) => {
    // 最初のページの制御
    if ([0, 1, 2, 3].includes(customerPaginationState.currentPage)) {
      if ([0, 1, 2, 3, 4].includes(i)) {
        return true
      } else {
        return false
      }
    } else {
      if (i + 4 > customerPaginationState.currentPage  && customerPaginationState.currentPage > i - 2) {
        return true
      } else {
        return false
      }
    }
  }

  const insertEmail = (selectedEmail: string) => {
    let updateTargetEmails = targetEmails
    updateTargetEmails = updateTargetEmails === '' ? selectedEmail : updateTargetEmails + ',' + selectedEmail
    dispatch(targetEmailsChanged(updateTargetEmails))
  }

  const insertCusomer = (last_name: string, first_name: string, email: string) => {
    let updateTargetCustomers: CustomerParam[]
    updateTargetCustomers = [...targetCustomers, {last_name: last_name, first_name: first_name, email: email } as CustomerParam]
    dispatch(targetCustomersChanged(updateTargetCustomers))
    console.log("!!targetCustomers", targetCustomers)
  }

  return (
    <Modal show={showSendMessageTemplateModal} fullscreen={true}>
      <Modal.Header>メッセージ送信</Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={5}>
            <Form.Label>宛先</Form.Label>
            <Form.Check
              type='radio'
              checked={targetType === 'Customer'}
              onChange={() => dispatch(targetTypeChanged('Customer'))}
              id='customerSetRadio'
              name='targetType'
              label='顧客指定'></Form.Check>
            <Form.Check
              type='radio'
              checked={targetType === 'Email'}
              onChange={() => dispatch(targetTypeChanged('Email'))}
              id='mailSetRadio'
              name='targetType'
              label='メールアドレス指定'></Form.Check>

            {targetType === 'Email' &&
            <><Form.Label>宛先メールアドレス</Form.Label>
            <div>複数の送信先に送る場合カンマ区切りで入力してください</div>
            <Form.Control
              placeholder='例) demo1@example.com, demo2@example.com'
              onChange={(e) => dispatch(targetEmailsChanged(e.target.value))}
              value={targetEmails}></Form.Control></>}

            {targetType === 'Customer' &&
            <>
              <div>送信先</div>
              {targetCustomers.map((c, i) => {
                return (
                  <span key={i}>
                    <div>{c.last_name}{c.first_name} {c.email}</div>
                  </span>
                )
              })
            }</>}

            <Form.Label className='mt10'>送信内容</Form.Label>
            <FormControl
              value={content}
              disabled={true}
              as='textarea'
              rows={40} />
          </Col>
          <Col md={3}>
          <div>変数</div>
          <div>
            <ListGroup>
              <ListGroup.Item>
                <div>%customer_name</div>
                <div className='mt10'>顧客名に変換されます</div>
                <div>宛先が顧客指定の場合のみ反映されます</div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div>%customer_postalcode</div>
                <div className='mt10'>顧客の郵便番号に変換されます</div>
                <div>宛先が顧客指定の場合のみ反映されます</div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div>%customer_address</div>
                <div className='mt10'>顧客の住所に変換されます</div>
                <div>宛先が顧客指定の場合のみ反映されます</div>
              </ListGroup.Item>
            </ListGroup>
          </div>
          </Col>
          <Col md={4}>
            <div className='mt10'>顧客一覧</div>
            <div>
              <ListGroup>
                {customers.map((customer, i) => {
                  const dataRangeMin =+ customerPaginationState.maxPerPage * (customerPaginationState.currentPage - 1)
                  const dataRangeMax =+ customerPaginationState.maxPerPage * customerPaginationState.currentPage
                  return dataRangeMin <= i && dataRangeMax > i && (
                    <ListGroup.Item key={i}>
                      <span className='badge bg-info'>{customer.last_name}{customer.first_name}</span><br/>
                      メールアドレス: {customer.email}<br/>
                      {targetType === 'Email'
                        &&
                        customer.email && <><Button size='sm' className='mt5' onClick={() => insertEmail(customer.email)}>
                        送信先メールアドレスに追加</Button></>}
                      {targetType === 'Customer'
                        &&
                        customer.email && <><Button size='sm' className='mt5' onClick={() => insertCusomer(customer.last_name, customer.first_name, customer.email)}>
                        送信先顧客に追加</Button></>}
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
              <Pagination className='mt10'>
                <Pagination.First onClick={displayFirstPage} />
                <Pagination.Prev onClick={displayPrevPage}></Pagination.Prev>
                {[...Array(customerPaginationState.totalPage)].map((_, i) => {
                  return isDisplayPage(i) && (
                    <Pagination.Item key={i}
                                      active={i + 1 === customerPaginationState.currentPage}
                                      onClick={() => displaySelectedPage(i)}>
                      {i + 1}
                    </Pagination.Item>
                  )
                })}

                <Pagination.Next onClick={displayNextPage}></Pagination.Next>
                <Pagination.Last onClick={displayLastPage} />
              </Pagination>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button>
          送信する
        </Button>
        <Button variant='secondary' onClick={() => dispatch(showSendMessageTemplateModalChanged(false))}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SendMessageTemplateModal
