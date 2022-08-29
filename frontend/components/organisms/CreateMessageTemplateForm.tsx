import React from 'react'
import RequireBadge from 'components/atoms/RequireBadge'
import { Form, FormControl, Row, Col, ListGroup, Button, Pagination } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { nameChanged, titleChanged, contentChanged, pageLinkPaginationStateChanged } from 'redux/messageTemplateSlice'

const CreateMessageTemplateForm = (): JSX.Element => {
  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.messageTemplate.name)
  const title = useSelector((state: RootState) => state.messageTemplate.title)
  const content = useSelector((state: RootState) => state.messageTemplate.content)
  const pageLinks = useSelector((state: RootState) => state.messageTemplate.pageLinks)
  const pageLinkPaginationState = useSelector((state: RootState) => state.messageTemplate.pageLinkPaginationState)

  const displayPrevPage = () => {
    if (pageLinkPaginationState.currentPage <= 1) return
    dispatch(pageLinkPaginationStateChanged({currentPage: pageLinkPaginationState.currentPage - 1, totalPage: pageLinkPaginationState.totalPage, maxPerPage: pageLinkPaginationState.maxPerPage}))
  }

  const displayNextPage = () => {
    if (pageLinkPaginationState.currentPage >= pageLinkPaginationState.totalPage) return
    dispatch(pageLinkPaginationStateChanged({currentPage: pageLinkPaginationState.currentPage + 1, totalPage: pageLinkPaginationState.totalPage, maxPerPage: pageLinkPaginationState.maxPerPage}))
  }

  const displaySelectedPage = (i: number) => {
    dispatch(pageLinkPaginationStateChanged({currentPage: i + 1, totalPage: pageLinkPaginationState.totalPage, maxPerPage: pageLinkPaginationState.maxPerPage}))
  }

  const displayFirstPage = () => {
    dispatch(pageLinkPaginationStateChanged({currentPage: 1, totalPage: pageLinkPaginationState.totalPage, maxPerPage: pageLinkPaginationState.maxPerPage}))
  }

  const displayLastPage = () => {
    dispatch(pageLinkPaginationStateChanged({currentPage: pageLinkPaginationState.totalPage, totalPage: pageLinkPaginationState.totalPage, maxPerPage: pageLinkPaginationState.maxPerPage}))
  }

  const isDisplayPage = (i: number) => {
    // 最初のページの制御
    if ([0, 1, 2, 3].includes(pageLinkPaginationState.currentPage)) {
      if ([0, 1, 2, 3, 4].includes(i)) {
        return true
      } else {
        return false
      }
    } else {
      if (i + 4 > pageLinkPaginationState.currentPage  && pageLinkPaginationState.currentPage > i - 2) {
        return true
      } else {
        return false
      }
    }
  }

  const insertPageLink = (pageLink: string) => {
   let updateContent: string
   updateContent = content + pageLink
   dispatch(contentChanged(updateContent)) 
  }

  const insertVariable = (variable: string) => {
    let updateContent: string
   updateContent = content + variable
   dispatch(contentChanged(updateContent))
  }

  return (
    <>
      <Form.Label>テンプレート名<RequireBadge /></Form.Label>
      <FormControl
        onChange={(e) => dispatch(nameChanged(e.target.value))}
        value={name} />
      <Form.Label>タイトル<RequireBadge /></Form.Label>
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
          <div>変数</div>
          <div>
            <ListGroup>
              <ListGroup.Item>
                <div>%customer_name</div>
                <div className='mt10'>顧客名に変換されます</div>
                <div>顧客一覧からの送信時に反映されます</div>
                <Button size='sm' className='mt5' onClick={() => insertVariable('%customer_name')}>挿入</Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <div>%customer_postalcode</div>
                <div className='mt10'>顧客の郵便番号に変換されます</div>
                <div>顧客一覧からの送信時に反映されます</div>
                <Button size='sm' className='mt5' onClick={() => insertVariable('%customer_postalcode')}>挿入</Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <div>%customer_address</div>
                <div className='mt10'>顧客の住所に変換されます</div>
                <div>顧客一覧からの送信時に反映されます</div>
                <Button size='sm' className='mt5' onClick={() => insertVariable('%customer_address')}>挿入</Button>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
        <Col md={4}>
          <div className='mt10'>ページリンク一覧</div>
          <div>
            <ListGroup>
              {pageLinks.map((link, i) => {
                const dataRangeMin =+ pageLinkPaginationState.maxPerPage * (pageLinkPaginationState.currentPage - 1)
                const dataRangeMax =+ pageLinkPaginationState.maxPerPage * pageLinkPaginationState.currentPage
                return dataRangeMin <= i && dataRangeMax > i && (
                  <ListGroup.Item key={i}>
                    <span className='badge bg-info'>{link.label}</span><br/>
                    {link.text}<br/>
                    {process.env.FRONTEND_URL + link.value}<br/>
                    <Button size='sm' className='mt5' onClick={() => insertPageLink(process.env.FRONTEND_URL + link.value)}>リンクを挿入</Button>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
            <Pagination className='mt10'>
              <Pagination.First onClick={displayFirstPage} />
              <Pagination.Prev onClick={displayPrevPage}></Pagination.Prev>
              {[...Array(pageLinkPaginationState.totalPage)].map((_, i) => {
                return isDisplayPage(i) && (
                  <Pagination.Item key={i}
                                    active={i + 1 === pageLinkPaginationState.currentPage}
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
    </>
  )
}

export default CreateMessageTemplateForm
