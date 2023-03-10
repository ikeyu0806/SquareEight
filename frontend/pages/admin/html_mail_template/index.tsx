import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { Container, Table, Button, Pagination } from 'react-bootstrap'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { HtmlMailTemplateParam } from 'interfaces/HtmlMailTemplateParam'
import SendHtmlMessageModal from 'components/templates/SendHtmlMessageModal'
import SendMailLimitAlert from 'components/atoms/SendMailLimitAlert'
import { showSendHtmlMessageModalChanged,
         customersChanged,
         customerGroupsChanged,
         messageTemplateTypeChanged,
         selectedHtmlMailTemplateChanged,
         selectedHtmlMailTemplatePublicIdChanged } from 'redux/sendMailSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Unauthorized from 'components/templates/Unauthorized'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [htmlTemplates, setHtmlTemplates] = useState<HtmlMailTemplateParam[]>([])
  const allowReadHtmlMailTemplate = useSelector((state: RootState) => state.merchantUserPermission.allowReadHtmlMailTemplate)
  const allowUpdateHtmlMailTemplate = useSelector((state: RootState) => state.merchantUserPermission.allowUpdateHtmlMailTemplate)
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
    axios.get(`${process.env.BACKEND_URL}/api/internal/html_mail_templates`,
    {
      headers: {
        'Session-Id': cookies._square_eight_merchant_session
      },
      params: {
        current_page: currentPage,
        display_count: displayCount
      }
    }).then((response) => {
      console.log(response.data)
      setHtmlTemplates(response.data.html_mail_templates)
      setLastPage(response.data.last_page)
      dispatch(messageTemplateTypeChanged('htmlMailTemplate'))
      dispatch(customersChanged(response.data.customers))
      dispatch(customerGroupsChanged(response.data.customer_groups))
    }).catch((error) => {
      console.log(error)
    })
  }, [cookies._square_eight_merchant_session, dispatch, currentPage, lastPage])

  return (
    <MerchantUserAdminLayout>
      <SendMailLimitAlert />
      <br />
      {allowReadHtmlMailTemplate === 'Allow' && <Container>
        <a href='/admin/html_mail_template/select_template_type' className='btn btn-primary'>新規作成</a>
        <h3 className='mt10'>HTMLメールテンプレート一覧</h3>
        <Table bordered>
          <thead>
            <tr>
              <th>テンプレート名</th>
              <th>メールのタイトル</th>
              {allowUpdateHtmlMailTemplate === 'Allow' && <th>編集</th>}
              <th>メール送信</th>
            </tr>
          </thead>
          <tbody>
            {htmlTemplates.map((template, i) => {
              return (
                <tr key={i}>
                  <td>{template.name}</td>
                  <td>{template.mail_title}</td>
                  {allowUpdateHtmlMailTemplate === 'Allow' && <td className='text-center'>
                    <a className='btn btn-primary' href={`/admin/html_mail_template/${template.public_id}/edit?template_type=${template.template_type}`}>編集</a>
                  </td>}
                  <td className='text-center'>
                    <Button onClick={() => {
                      dispatch(showSendHtmlMessageModalChanged(true))
                      dispatch(selectedHtmlMailTemplateChanged(template))
                      dispatch(selectedHtmlMailTemplatePublicIdChanged(template.public_id))
                    }}>送信</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
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
      </Container>}
      {allowReadHtmlMailTemplate === 'Forbid' && <Unauthorized></Unauthorized>}
      <SendHtmlMessageModal></SendHtmlMessageModal>
    </MerchantUserAdminLayout>
  )
}

export default Index
