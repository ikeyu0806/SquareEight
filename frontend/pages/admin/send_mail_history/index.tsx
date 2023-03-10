import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useCookies } from 'react-cookie'
import MerchantUserAdminLayout from 'components/templates/MerchantUserAdminLayout'
import { Table, Container, Button, Pagination } from 'react-bootstrap'
import axios from 'axios'
import { SendMailHistoryParam } from 'interfaces/SendMailHistoryParam'
import MessageBodyModal from 'components/templates/MessageBodyModal'
import { showMessageBodyModalChanged,
         selectedMessageBodyChanged,
         selectedMessageTypeChanged,
         selectedHtmlTemplateTypeChanged,
         selectedParsedMessageBodyChanged } from 'redux/sendMailHistorySlice'
import { useDispatch } from 'react-redux'
import { usePaginationNumber } from 'hooks/usePaginationNumber'

const Index: NextPage = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['_square_eight_merchant_session'])
  const [sendMailHistories, setSendMailHistories] = useState<SendMailHistoryParam[]>([])
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
    const fetchResources = () => {
      axios.get(
        `${process.env.BACKEND_URL}/api/internal/send_mail_histories`, {
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
        setSendMailHistories(response.data.send_mail_histories)
        setLastPage(response.data.last_page)
      })
      .catch(error => {
        console.log(error)
      })
    }
    fetchResources()
  }, [cookies._square_eight_merchant_session, currentPage, lastPage])

  return (
    <MerchantUserAdminLayout>
      <br />
      <Container>
        <h4>メール送信履歴</h4>
        <Table bordered>
          <thead>
            <tr>
              <th>顧客名</th>
              <th>メールタイトル</th>
              <th>送信メールアドレス</th>
              <th>送信メッセージ</th>
              <th>送信日時</th>
            </tr>
          </thead>
          <tbody>
          {sendMailHistories.map((history, i) => {
            return(
              <tr key={i}>
                <td>{history.customer_fullname}</td>
                <td>{history.mail_title}</td>
                <td>{history.email}</td>
                <td className='text-center'>
                  <Button onClick={() => {
                    dispatch(showMessageBodyModalChanged(true))
                    dispatch(selectedMessageBodyChanged(history.message_body))
                    dispatch(selectedMessageTypeChanged(history.message_type))
                    dispatch(selectedHtmlTemplateTypeChanged(history.html_template_type))
                    dispatch(selectedParsedMessageBodyChanged(history.parsed_message_body))
                  }}>表示する</Button>
                </td>
                <td>{history.send_at}</td>
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
      </Container>
      <MessageBodyModal></MessageBodyModal>
    </MerchantUserAdminLayout>
  )
}

export default Index
